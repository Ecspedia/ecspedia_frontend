import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($authRequest: AuthInput!) {
    login(authRequest: $authRequest) {
      token
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($userRegistrationDto: UserRegistrationInput!) {
    registerUser(userRegistrationDto: $userRegistrationDto) {
      id
      username
      email
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($email: String!, $token: String!, $newPassword: String!) {
    resetPassword(email: $email, token: $token, newPassword: $newPassword) {
      success
      message
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const UPDATE_USERNAME_MUTATION = gql`
  mutation UpdateUsername($updateUsernameDto: UpdateUsernameInput!) {
    updateUsername(updateUsernameDto: $updateUsernameDto) {
      id
      username
      email
    }
  }
`;

export const UPDATE_PROFILE_PHOTO_MUTATION = gql`
  mutation UpdateProfilePhoto($updateProfilePhotoDto: UpdateProfilePhotoInput!) {
    updateProfilePhoto(updateProfilePhotoDto: $updateProfilePhotoDto) {
      id
      username
      email
      profilePhotoUrl
    }
  }
`;

// Global mutations that can be used across multiple features
// Add additional global mutations here as needed
