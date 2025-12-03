import { graphql } from '@/types/gql';

export const SEND_MESSAGE_QUERY = graphql(`
  query SendMessage($message: String!) {
    sendMessage(message: $message) {
      response
      typeOf
    }
  }
`);

export const CURRENT_USER_QUERY = graphql(`
  query CurrentUser {
    me {
      id
      username
      email
    }
  }
`);

export const userQueries = {
  CURRENT_USER: CURRENT_USER_QUERY,
};
