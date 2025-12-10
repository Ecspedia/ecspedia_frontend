import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from '@apollo/client';

// Singleton Apollo Client instance
let apolloClient: InstanceType<typeof ApolloClient> | null = null;

// Minimum delay link - ensures responses take at least the specified time
const createMinimumDelayLink = (minDelay: number = 400) => {
  return new ApolloLink((operation, forward) => {
    const startTime = Date.now();

    return new Observable((observer) => {
      const subscription = forward(operation).subscribe({
        next: (response) => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, minDelay - elapsed);

          setTimeout(() => {
            observer.next(response);
            observer.complete();
          }, remaining);
        },
        error: (error) => observer.error(error),
      });

      return () => subscription.unsubscribe();
    });
  });
};

// Create Apollo Clientgit
const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:8080/graphql',
    credentials: 'include',
  });

  // Chain: minimumDelayLink -> httpLink (delay only in development)
  const link = createMinimumDelayLink(100).concat(httpLink);
  // const link = httpLink;
  return new ApolloClient({
    link,
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
