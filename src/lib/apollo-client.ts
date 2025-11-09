import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
//singleton pattern
let apolloClient: ApolloClient | null = null;

export const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:8080/graphql',
      }),
      cache: new InMemoryCache(),
    });
  }
  return apolloClient;
};

export default getApolloClient;
