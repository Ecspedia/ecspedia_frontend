import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Singleton Apollo Client instance
let apolloClient: ApolloClient | null = null;

// Create Apollo Client
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:8080/graphql',
    }),
    cache: new InMemoryCache(),
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
