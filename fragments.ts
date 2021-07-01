import { gql } from "@apollo/client";

export const SEE_COFFEE_SHOPS = gql`
  fragment afaf on Photo {
    coffeeShops {
      id
      name
      latitude
      longitude
      user {
        id
        name
        avatarURL
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
      isMine
    }
    maxPage
  }
`;
