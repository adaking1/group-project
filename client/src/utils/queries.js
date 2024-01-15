import { gql } from '@apollo/client';

export const GET_FOOD = gql `
query GetFood($value: String!) {
  getFood(value: $value) {
    _id
    restaurantId
    restaurantName
    location
    restaurantDescription
    restaurantImage
  }
}
`;

export const GET_RESTAURANT = gql `
query GetRestaurant($restaurantId: ID!) {
    getRestaurant(restaurantId: $restaurantId) {
      _id
      restaurantId
      restaurantName
      location
      restaurantImage
      restaurantDescription
      Items {
        name
        description
        price
        image
      }
    }
  }
`;

export const GET_ME = gql `
query GetMe {
    getMe {
      _id
      email
      username
      savedRestaurants {
        _id
        restaurantId
        restaurantName
        location
        restaurantImage
        restaurantDescription
      }
      Reviews {
        reviewText
        _id
      }
      restaurantCount
    }
  }
`;

