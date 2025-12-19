import { graphql } from '@/types/gql';

export const SEND_MESSAGE_QUERY = graphql(`
  query SendMessage($message: String!) {
    sendMessage(message: $message) {
      success
      chatResponseType
      searchData {
        id
        name
        location
        image
        isAvailable
        rating
        reviewCount
        pricePerNight
        latitude
        longitude
        hotelDescription
        hotelTypeId
        chain
        currency
        country
        city
        address
        zip
        mainPhoto
        thumbnail
        stars
      }
      questionData
      otherData
      bookingData {
        message
        bookingResponseDto {
          id
          hotelId
          userId
          roomType
          firstNameGuest
          lastNameGuest
          emailGuest
          phoneNumberGuest
          startTime
          endTime
          status
          price
          currency
          createdAt
          confirmedAt
          canceledAt
        }
      }
      errorData
    }
  }
`);

export const CURRENT_USER_QUERY = graphql(`
  query CurrentUser {
    me {
      id
      username
      email
      profilePhotoUrl
    }
  }
`);

export const userQueries = {
  CURRENT_USER: CURRENT_USER_QUERY,
};