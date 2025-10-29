import { ApolloClient, InMemoryCache, HttpLink, from, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Error handling link
const errorLink = onError((errorResponse) => {
  const { graphQLErrors, networkError } = errorResponse;

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:8080/graphql',
  credentials: 'same-origin', // or 'include' for cross-origin requests with cookies
});

// Singleton Apollo Client instance
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Create Apollo Client
const createApolloClient = () => {
  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        // Add your type policies here for cache normalization
        // Example:
        // Query: {
        //   fields: {
        //     someField: {
        //       merge(existing, incoming) {
        //         return incoming;
        //       },
        //     },
        //   },
        // },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
};

// Get or create Apollo Client singleton
export const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
};

export default getApolloClient;
