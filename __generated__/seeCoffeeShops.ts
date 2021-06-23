/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShops
// ====================================================

export interface seeCoffeeShops_seeCoffeeShops_coffeeShops_user {
  __typename: "User";
  id: number;
  name: string;
  avatarURL: string | null;
}

export interface seeCoffeeShops_seeCoffeeShops_coffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface seeCoffeeShops_seeCoffeeShops_coffeeShops_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface seeCoffeeShops_seeCoffeeShops_coffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: seeCoffeeShops_seeCoffeeShops_coffeeShops_user;
  photos: seeCoffeeShops_seeCoffeeShops_coffeeShops_photos[];
  categories: (seeCoffeeShops_seeCoffeeShops_coffeeShops_categories | null)[] | null;
  isMine: boolean;
}

export interface seeCoffeeShops_seeCoffeeShops {
  __typename: "Result";
  coffeeShops: (seeCoffeeShops_seeCoffeeShops_coffeeShops | null)[] | null;
  maxPage: number;
}

export interface seeCoffeeShops {
  seeCoffeeShops: seeCoffeeShops_seeCoffeeShops | null;
}

export interface seeCoffeeShopsVariables {
  page: number;
}
