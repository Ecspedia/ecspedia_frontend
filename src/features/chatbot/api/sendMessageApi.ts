import { SEND_MESSAGE_QUERY } from '@/config/graphql/global.queries';
import { getApolloClient } from '@/lib/apollo-client';
import { ChatResponseDto } from '@/types/graphql';

export async function sendMessageToApi(message: string): Promise<ChatResponseDto> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: SEND_MESSAGE_QUERY,
      variables: {
        message: message,
      },
      fetchPolicy: 'network-only', // Don't cache AI responses
    });

      return data?.sendMessage as ChatResponseDto;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
