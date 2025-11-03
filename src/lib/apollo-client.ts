import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Singleton Apollo Client instance
let apolloClient: ApolloClient | null = null;

// Create Apollo Client
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:8080/graphql',
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // Hotel search results - merge strategy
            hotelsByLocation: {
              // Always replace with fresh results (don't merge with previous searches)
              merge(_existing, incoming) {
                return incoming;
              },
              // Read function for cache-only queries
              read(existing) {
                return existing;
              },
            },
            // Single hotel by ID - cache by ID for normalization
            hotelById: {
              read(existing) {
                return existing;
              },
            },
          },
        },
        Hotel: {
          // Normalize hotels by ID for efficient cache updates
          keyFields: ['id'],
        },
      },
    }),
    // Default options for queries
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network', // Use cache, but fetch fresh data
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-first', // Prefer cache for one-time queries
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
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
