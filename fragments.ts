import { gql } from "@apollo/client";

export const COFFEE_SHOP_FRAGMENT = gql`
  fragment CoffeeShopFragment on CoffeeShop {
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
`;

export const SEE_COFFEE_SHOPS_FRAGMENT = gql`
  fragment SeeCoffeeShopsFragment on Result {
    coffeeShops {
      ...CoffeeShopFragment
    }
    maxPage
  }
  ${COFFEE_SHOP_FRAGMENT}
`;
