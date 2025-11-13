import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    me {
      id
      username
      email
    }
  }
`;

export const userQueries = {
  CURRENT_USER: CURRENT_USER_QUERY,
};
