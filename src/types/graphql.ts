/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
};

export type Booking = {
  __typename?: 'Booking';
  canceledAt?: Maybe<Scalars['String']['output']>;
  confirmedAt?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  emailGuest: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  firstNameGuest: Scalars['String']['output'];
  hotelId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  lastNameGuest: Scalars['String']['output'];
  phoneNumberGuest?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  startTime: Scalars['String']['output'];
  status: BookingStatus;
  userId: Scalars['ID']['output'];
};

export type BookingCreateInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  emailGuest: Scalars['String']['input'];
  endTimeIso: Scalars['String']['input'];
  firstNameGuest: Scalars['String']['input'];
  hotelId: Scalars['ID']['input'];
  lastNameGuest: Scalars['String']['input'];
  phoneNumberGuest?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  startTimeIso: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export enum BookingStatus {
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type ChatResponseDto = {
  __typename?: 'ChatResponseDto';
  bookingData?: Maybe<Scalars['String']['output']>;
  chatResponseType: ChatResponseType;
  errorData?: Maybe<Scalars['String']['output']>;
  otherData?: Maybe<Scalars['String']['output']>;
  questionData?: Maybe<Scalars['String']['output']>;
  searchData?: Maybe<Array<HotelResponseDto>>;
  success: Scalars['Boolean']['output'];
};

export enum ChatResponseType {
  Booking = 'BOOKING',
  Error = 'ERROR',
  Other = 'OTHER',
  QuestionAnswer = 'QUESTION_ANSWER',
  SearchResults = 'SEARCH_RESULTS'
}

export type HotelAccessibilityAttributes = {
  __typename?: 'HotelAccessibilityAttributes';
  attributes?: Maybe<Array<Scalars['String']['output']>>;
  distanceFromTheElevatorToTheAccessibleRoom?: Maybe<Scalars['Int']['output']>;
  entranceDoorWidth?: Maybe<Scalars['Int']['output']>;
  entranceType?: Maybe<Scalars['String']['output']>;
  petFriendly?: Maybe<Scalars['String']['output']>;
  rampAngle?: Maybe<Scalars['Int']['output']>;
  rampLength?: Maybe<Scalars['Int']['output']>;
  roomMaxGuestsNumber?: Maybe<Scalars['Int']['output']>;
  showerChair?: Maybe<Scalars['Boolean']['output']>;
};

export type HotelAccessibilityAttributesInput = {
  attributes?: InputMaybe<Array<Scalars['String']['input']>>;
  distanceFromTheElevatorToTheAccessibleRoom?: InputMaybe<Scalars['Int']['input']>;
  entranceDoorWidth?: InputMaybe<Scalars['Int']['input']>;
  entranceType?: InputMaybe<Scalars['String']['input']>;
  petFriendly?: InputMaybe<Scalars['String']['input']>;
  rampAngle?: InputMaybe<Scalars['Int']['input']>;
  rampLength?: InputMaybe<Scalars['Int']['input']>;
  roomMaxGuestsNumber?: InputMaybe<Scalars['Int']['input']>;
  showerChair?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HotelCreateInput = {
  accessibilityAttributes?: InputMaybe<HotelAccessibilityAttributesInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  facilityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  hotelDescription?: InputMaybe<Scalars['String']['input']>;
  hotelTypeId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  location: Scalars['String']['input'];
  longitude?: InputMaybe<Scalars['Float']['input']>;
  mainPhoto?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  pricePerNight: Scalars['Float']['input'];
  rating?: InputMaybe<Scalars['Float']['input']>;
  reviewCount?: InputMaybe<Scalars['Int']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type HotelResponseDto = {
  __typename?: 'HotelResponseDto';
  accessibilityAttributes?: Maybe<HotelAccessibilityAttributes>;
  address?: Maybe<Scalars['String']['output']>;
  chain?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  facilityIds?: Maybe<Array<Scalars['Int']['output']>>;
  hotelDescription?: Maybe<Scalars['String']['output']>;
  hotelTypeId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isAvailable: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  location: Scalars['String']['output'];
  longitude?: Maybe<Scalars['Float']['output']>;
  mainPhoto?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  pricePerNight: Scalars['Float']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  stars?: Maybe<Scalars['Int']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type ImageUpdateResponse = {
  __typename?: 'ImageUpdateResponse';
  imageId: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  city: Scalars['String']['output'];
  code: Scalars['String']['output'];
  country: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPopular?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type LocationCreateInput = {
  city: Scalars['String']['input'];
  code: Scalars['String']['input'];
  country: Scalars['String']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: Booking;
  createHotel: HotelResponseDto;
  createLocation: Location;
  deleteBookingById: Scalars['String']['output'];
  forgotPassword: PasswordResetResponse;
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  registerUser: User;
  resetPassword: PasswordResetResponse;
  updateProfilePhoto: User;
  updateUsername: User;
};


export type MutationCreateBookingArgs = {
  bookingCreateDto: BookingCreateInput;
};


export type MutationCreateHotelArgs = {
  hotelCreateDto: HotelCreateInput;
};


export type MutationCreateLocationArgs = {
  locationCreateDto: LocationCreateInput;
};


export type MutationDeleteBookingByIdArgs = {
  bookingId: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  authRequest: AuthInput;
};


export type MutationRegisterUserArgs = {
  userRegistrationDto: UserRegistrationInput;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateProfilePhotoArgs = {
  updateProfilePhotoDto: UpdateProfilePhotoInput;
};


export type MutationUpdateUsernameArgs = {
  updateUsernameDto: UpdateUsernameInput;
};

export type PasswordResetResponse = {
  __typename?: 'PasswordResetResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  askHotelQuestion: Array<HotelResponseDto>;
  bookings: Array<Booking>;
  bookingsByUserEmail: Array<Booking>;
  getAllUsers: Array<User>;
  getUserById?: Maybe<User>;
  hotelById?: Maybe<HotelResponseDto>;
  hotelExists: Scalars['Boolean']['output'];
  hotels: Array<HotelResponseDto>;
  hotelsByLocation: Array<HotelResponseDto>;
  locations: Array<Location>;
  me?: Maybe<User>;
  popularHotels: Array<HotelResponseDto>;
  semanticSearchHotel: Scalars['String']['output'];
  sendMessage: ChatResponseDto;
  topLocations: Array<Location>;
};


export type QueryAskHotelQuestionArgs = {
  hotelId: Scalars['String']['input'];
  searchQuery: Scalars['String']['input'];
};


export type QueryBookingsByUserEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHotelByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHotelExistsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHotelsByLocationArgs = {
  location: Scalars['String']['input'];
};


export type QuerySemanticSearchHotelArgs = {
  query: Scalars['String']['input'];
};


export type QuerySendMessageArgs = {
  message: Scalars['String']['input'];
};

export type UpdateProfilePhotoInput = {
  imageBase64: Scalars['String']['input'];
};

export type UpdateUsernameInput = {
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  profilePhotoUrl?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserRegistrationInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserRegistrationResponse = {
  __typename?: 'UserRegistrationResponse';
  message: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { __typename?: 'Query', locations: Array<{ __typename?: 'Location', id: string, code: string, city: string, country: string, state?: string | null, latitude?: number | null, longitude?: number | null }> };

export type TopLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopLocationsQuery = { __typename?: 'Query', topLocations: Array<{ __typename?: 'Location', id: string, code: string, city: string, country: string, state?: string | null, latitude?: number | null, longitude?: number | null, isPopular?: boolean | null }> };

export type LoginMutationVariables = Exact<{
  authRequest: AuthInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string } };

export type RegisterUserMutationVariables = Exact<{
  userRegistrationDto: UserRegistrationInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: string, username: string, email: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'PasswordResetResponse', success: boolean, message: string } };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'PasswordResetResponse', success: boolean, message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateUsernameMutationVariables = Exact<{
  updateUsernameDto: UpdateUsernameInput;
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateUsername: { __typename?: 'User', id: string, username: string, email: string } };

export type UpdateProfilePhotoMutationVariables = Exact<{
  updateProfilePhotoDto: UpdateProfilePhotoInput;
}>;


export type UpdateProfilePhotoMutation = { __typename?: 'Mutation', updateProfilePhoto: { __typename?: 'User', id: string, username: string, email: string, profilePhotoUrl?: string | null } };

export type SendMessageQueryVariables = Exact<{
  message: Scalars['String']['input'];
}>;


export type SendMessageQuery = { __typename?: 'Query', sendMessage: { __typename?: 'ChatResponseDto', success: boolean, chatResponseType: ChatResponseType, questionData?: string | null, otherData?: string | null, bookingData?: string | null, errorData?: string | null, searchData?: Array<{ __typename?: 'HotelResponseDto', id: string, name: string, location: string, image?: string | null, isAvailable: boolean, rating?: number | null, reviewCount?: number | null, pricePerNight: number, latitude?: number | null, longitude?: number | null, hotelDescription?: string | null, hotelTypeId?: number | null, chain?: string | null, currency?: string | null, country?: string | null, city?: string | null, address?: string | null, zip?: string | null, mainPhoto?: string | null, thumbnail?: string | null, stars?: number | null }> | null } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, profilePhotoUrl?: string | null } | null };

export type CreateBookingMutationVariables = Exact<{
  bookingCreateDto: BookingCreateInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: string, userId: string, hotelId: string, firstNameGuest: string, lastNameGuest: string, emailGuest: string, phoneNumberGuest?: string | null, startTime: string, endTime: string, status: BookingStatus, price?: number | null, currency?: string | null, createdAt: string, confirmedAt?: string | null, canceledAt?: string | null } };

export type CreateHotelMutationVariables = Exact<{
  hotelCreateDto: HotelCreateInput;
}>;


export type CreateHotelMutation = { __typename?: 'Mutation', createHotel: { __typename?: 'HotelResponseDto', id: string, name: string, location: string, image?: string | null, isAvailable: boolean, rating?: number | null, reviewCount?: number | null, pricePerNight: number, latitude?: number | null, longitude?: number | null, hotelDescription?: string | null, hotelTypeId?: number | null, chain?: string | null, currency?: string | null, country?: string | null, city?: string | null, address?: string | null, zip?: string | null, mainPhoto?: string | null, thumbnail?: string | null, stars?: number | null, facilityIds?: Array<number> | null, deletedAt?: string | null, accessibilityAttributes?: { __typename?: 'HotelAccessibilityAttributes', attributes?: Array<string> | null, showerChair?: boolean | null, entranceType?: string | null, petFriendly?: string | null, rampAngle?: number | null, rampLength?: number | null, entranceDoorWidth?: number | null, roomMaxGuestsNumber?: number | null, distanceFromTheElevatorToTheAccessibleRoom?: number | null } | null } };

export type BookingsByUserEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type BookingsByUserEmailQuery = { __typename?: 'Query', bookingsByUserEmail: Array<{ __typename?: 'Booking', id: string, hotelId: string, userId: string, firstNameGuest: string, lastNameGuest: string, emailGuest: string, phoneNumberGuest?: string | null, startTime: string, endTime: string, status: BookingStatus, price?: number | null, currency?: string | null, createdAt: string, confirmedAt?: string | null, canceledAt?: string | null }> };

export type HotelByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HotelByIdQuery = { __typename?: 'Query', hotelById?: { __typename?: 'HotelResponseDto', id: string, name: string, location: string, image?: string | null, isAvailable: boolean, rating?: number | null, reviewCount?: number | null, pricePerNight: number, latitude?: number | null, longitude?: number | null, hotelDescription?: string | null, hotelTypeId?: number | null, chain?: string | null, currency?: string | null, country?: string | null, city?: string | null, address?: string | null, zip?: string | null, mainPhoto?: string | null, thumbnail?: string | null, stars?: number | null, facilityIds?: Array<number> | null, deletedAt?: string | null, accessibilityAttributes?: { __typename?: 'HotelAccessibilityAttributes', attributes?: Array<string> | null, showerChair?: boolean | null, entranceType?: string | null, petFriendly?: string | null, rampAngle?: number | null, rampLength?: number | null, entranceDoorWidth?: number | null, roomMaxGuestsNumber?: number | null, distanceFromTheElevatorToTheAccessibleRoom?: number | null } | null } | null };

export type Get_HotelsQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_HotelsQuery = { __typename?: 'Query', hotels: Array<{ __typename?: 'HotelResponseDto', id: string, name: string, location: string, image?: string | null, isAvailable: boolean, rating?: number | null, reviewCount?: number | null, pricePerNight: number, latitude?: number | null, longitude?: number | null, hotelDescription?: string | null, hotelTypeId?: number | null, chain?: string | null, currency?: string | null, country?: string | null, city?: string | null, address?: string | null, zip?: string | null, mainPhoto?: string | null, thumbnail?: string | null, stars?: number | null, facilityIds?: Array<number> | null, accessibilityAttributes?: { __typename?: 'HotelAccessibilityAttributes', attributes?: Array<string> | null, showerChair?: boolean | null, entranceType?: string | null, petFriendly?: string | null, rampAngle?: number | null, rampLength?: number | null, entranceDoorWidth?: number | null, roomMaxGuestsNumber?: number | null, distanceFromTheElevatorToTheAccessibleRoom?: number | null } | null }> };

export type GetHotelsByLocationQueryVariables = Exact<{
  location: Scalars['String']['input'];
}>;


export type GetHotelsByLocationQuery = { __typename?: 'Query', hotelsByLocation: Array<{ __typename?: 'HotelResponseDto', id: string, name: string, location: string, image?: string | null, isAvailable: boolean, rating?: number | null, reviewCount?: number | null, pricePerNight: number, latitude?: number | null, longitude?: number | null }> };

export type SearchHotelsByLocationQueryVariables = Exact<{
  location: Scalars['String']['input'];
}>;


export type SearchHotelsByLocationQuery = { __typename?: 'Query', hotelsByLocation: Array<{ __typename?: 'HotelResponseDto', id: string, name: string, hotelDescription?: string | null, hotelTypeId?: number | null, chain?: string | null, currency?: string | null, location: string, country?: string | null, city?: string | null, address?: string | null, zip?: string | null, latitude?: number | null, longitude?: number | null, pricePerNight: number, rating?: number | null, reviewCount?: number | null, isAvailable: boolean, image?: string | null, mainPhoto?: string | null, thumbnail?: string | null, stars?: number | null, facilityIds?: Array<number> | null, deletedAt?: string | null, accessibilityAttributes?: { __typename?: 'HotelAccessibilityAttributes', attributes?: Array<string> | null, showerChair?: boolean | null, entranceType?: string | null, petFriendly?: string | null, rampAngle?: number | null, rampLength?: number | null, entranceDoorWidth?: number | null, roomMaxGuestsNumber?: number | null, distanceFromTheElevatorToTheAccessibleRoom?: number | null } | null }> };

export type TopHotelsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopHotelsQuery = { __typename?: 'Query', popularHotels: Array<{ __typename?: 'HotelResponseDto', id: string, name: string, hotelDescription?: string | null, hotelTypeId?: number | null, chain?: string | null, currency?: string | null, location: string, country?: string | null, city?: string | null, address?: string | null, zip?: string | null, latitude?: number | null, longitude?: number | null, pricePerNight: number, rating?: number | null, reviewCount?: number | null, isAvailable: boolean, image?: string | null, mainPhoto?: string | null, thumbnail?: string | null, stars?: number | null, facilityIds?: Array<number> | null, deletedAt?: string | null, accessibilityAttributes?: { __typename?: 'HotelAccessibilityAttributes', attributes?: Array<string> | null, showerChair?: boolean | null, entranceType?: string | null, petFriendly?: string | null, rampAngle?: number | null, rampLength?: number | null, entranceDoorWidth?: number | null, roomMaxGuestsNumber?: number | null, distanceFromTheElevatorToTheAccessibleRoom?: number | null } | null }> };


export const GetLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]} as unknown as DocumentNode<GetLocationsQuery, GetLocationsQueryVariables>;
export const TopLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"topLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"isPopular"}}]}}]}}]} as unknown as DocumentNode<TopLocationsQuery, TopLocationsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authRequest"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authRequest"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userRegistrationDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserRegistrationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userRegistrationDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userRegistrationDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UpdateUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUsernameDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUsernameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUsernameDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUsernameDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const UpdateProfilePhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfilePhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProfilePhotoDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfilePhotoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfilePhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProfilePhotoDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProfilePhotoDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateProfilePhotoMutation, UpdateProfilePhotoMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"chatResponseType"}},{"kind":"Field","name":{"kind":"Name","value":"searchData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerNight"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"hotelDescription"}},{"kind":"Field","name":{"kind":"Name","value":"hotelTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"mainPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questionData"}},{"kind":"Field","name":{"kind":"Name","value":"otherData"}},{"kind":"Field","name":{"kind":"Name","value":"bookingData"}},{"kind":"Field","name":{"kind":"Name","value":"errorData"}}]}}]}}]} as unknown as DocumentNode<SendMessageQuery, SendMessageQueryVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingCreateDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookingCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingCreateDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingCreateDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"hotelId"}},{"kind":"Field","name":{"kind":"Name","value":"firstNameGuest"}},{"kind":"Field","name":{"kind":"Name","value":"lastNameGuest"}},{"kind":"Field","name":{"kind":"Name","value":"emailGuest"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumberGuest"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"canceledAt"}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const CreateHotelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHotel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hotelCreateDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HotelCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHotel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hotelCreateDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hotelCreateDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerNight"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"hotelDescription"}},{"kind":"Field","name":{"kind":"Name","value":"hotelTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"mainPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"facilityIds"}},{"kind":"Field","name":{"kind":"Name","value":"accessibilityAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"showerChair"}},{"kind":"Field","name":{"kind":"Name","value":"entranceType"}},{"kind":"Field","name":{"kind":"Name","value":"petFriendly"}},{"kind":"Field","name":{"kind":"Name","value":"rampAngle"}},{"kind":"Field","name":{"kind":"Name","value":"rampLength"}},{"kind":"Field","name":{"kind":"Name","value":"entranceDoorWidth"}},{"kind":"Field","name":{"kind":"Name","value":"roomMaxGuestsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"distanceFromTheElevatorToTheAccessibleRoom"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<CreateHotelMutation, CreateHotelMutationVariables>;
export const BookingsByUserEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BookingsByUserEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingsByUserEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hotelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstNameGuest"}},{"kind":"Field","name":{"kind":"Name","value":"lastNameGuest"}},{"kind":"Field","name":{"kind":"Name","value":"emailGuest"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumberGuest"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"canceledAt"}}]}}]}}]} as unknown as DocumentNode<BookingsByUserEmailQuery, BookingsByUserEmailQueryVariables>;
export const HotelByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HotelById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotelById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerNight"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"hotelDescription"}},{"kind":"Field","name":{"kind":"Name","value":"hotelTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"mainPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"facilityIds"}},{"kind":"Field","name":{"kind":"Name","value":"accessibilityAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"showerChair"}},{"kind":"Field","name":{"kind":"Name","value":"entranceType"}},{"kind":"Field","name":{"kind":"Name","value":"petFriendly"}},{"kind":"Field","name":{"kind":"Name","value":"rampAngle"}},{"kind":"Field","name":{"kind":"Name","value":"rampLength"}},{"kind":"Field","name":{"kind":"Name","value":"entranceDoorWidth"}},{"kind":"Field","name":{"kind":"Name","value":"roomMaxGuestsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"distanceFromTheElevatorToTheAccessibleRoom"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<HotelByIdQuery, HotelByIdQueryVariables>;
export const Get_HotelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_HOTELS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerNight"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"hotelDescription"}},{"kind":"Field","name":{"kind":"Name","value":"hotelTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"mainPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"facilityIds"}},{"kind":"Field","name":{"kind":"Name","value":"accessibilityAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"showerChair"}},{"kind":"Field","name":{"kind":"Name","value":"entranceType"}},{"kind":"Field","name":{"kind":"Name","value":"petFriendly"}},{"kind":"Field","name":{"kind":"Name","value":"rampAngle"}},{"kind":"Field","name":{"kind":"Name","value":"rampLength"}},{"kind":"Field","name":{"kind":"Name","value":"entranceDoorWidth"}},{"kind":"Field","name":{"kind":"Name","value":"roomMaxGuestsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"distanceFromTheElevatorToTheAccessibleRoom"}}]}}]}}]}}]} as unknown as DocumentNode<Get_HotelsQuery, Get_HotelsQueryVariables>;
export const GetHotelsByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHotelsByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotelsByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerNight"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]} as unknown as DocumentNode<GetHotelsByLocationQuery, GetHotelsByLocationQueryVariables>;
export const SearchHotelsByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchHotelsByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotelsByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hotelDescription"}},{"kind":"Field","name":{"kind":"Name","value":"hotelTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerNight"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"mainPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"facilityIds"}},{"kind":"Field","name":{"kind":"Name","value":"accessibilityAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"showerChair"}},{"kind":"Field","name":{"kind":"Name","value":"entranceType"}},{"kind":"Field","name":{"kind":"Name","value":"petFriendly"}},{"kind":"Field","name":{"kind":"Name","value":"rampAngle"}},{"kind":"Field","name":{"kind":"Name","value":"rampLength"}},{"kind":"Field","name":{"kind":"Name","value":"entranceDoorWidth"}},{"kind":"Field","name":{"kind":"Name","value":"roomMaxGuestsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"distanceFromTheElevatorToTheAccessibleRoom"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<SearchHotelsByLocationQuery, SearchHotelsByLocationQueryVariables>;
export const TopHotelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopHotels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"popularHotels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hotelDescription"}},{"kind":"Field","name":{"kind":"Name","value":"hotelTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerNight"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"mainPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"facilityIds"}},{"kind":"Field","name":{"kind":"Name","value":"accessibilityAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"showerChair"}},{"kind":"Field","name":{"kind":"Name","value":"entranceType"}},{"kind":"Field","name":{"kind":"Name","value":"petFriendly"}},{"kind":"Field","name":{"kind":"Name","value":"rampAngle"}},{"kind":"Field","name":{"kind":"Name","value":"rampLength"}},{"kind":"Field","name":{"kind":"Name","value":"entranceDoorWidth"}},{"kind":"Field","name":{"kind":"Name","value":"roomMaxGuestsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"distanceFromTheElevatorToTheAccessibleRoom"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<TopHotelsQuery, TopHotelsQueryVariables>;