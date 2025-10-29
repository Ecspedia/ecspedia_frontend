'use client';

import { ApolloProvider as ApolloProviderBase } from '@apollo/client/react';
import { getApolloClient } from '@/lib/apollo-client';

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  const client = getApolloClient();

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
}
