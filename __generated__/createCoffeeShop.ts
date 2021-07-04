/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCoffeeShop
// ====================================================

export interface createCoffeeShop_createCoffeeShop_user {
  __typename: "User";
  id: number;
  name: string;
  avatarURL: string | null;
}

export interface createCoffeeShop_createCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface createCoffeeShop_createCoffeeShop_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface createCoffeeShop_createCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: createCoffeeShop_createCoffeeShop_user;
  photos: createCoffeeShop_createCoffeeShop_photos[];
  categories: (createCoffeeShop_createCoffeeShop_categories | null)[] | null;
  isMine: boolean;
}

export interface createCoffeeShop {
  createCoffeeShop: createCoffeeShop_createCoffeeShop | null;
}

export interface createCoffeeShopVariables {
  name: string;
  latitude: string;
  longitude: string;
  photos?: (any | null)[] | null;
  categories: (string | null)[];
}
