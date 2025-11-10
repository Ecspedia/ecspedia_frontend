import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Singleton Apollo Client instance
let apolloClient: ApolloClient | null = null;

// Create Apollo Client
const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:8080/graphql',
    credentials: 'include',
  });

  return new ApolloClient({
    link: httpLink,
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
