import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Singleton Apollo Client instance
let apolloClient: ApolloClient | null = null;

// Create Apollo Client
const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:8080/graphql',
  });

  // Auth link to add token to requests
  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from localStorage if it exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
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
