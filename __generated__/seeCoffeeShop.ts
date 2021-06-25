/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShop
// ====================================================

export interface seeCoffeeShop_seeCoffeeShop_user {
  __typename: "User";
  id: number;
  name: string;
  avatarURL: string | null;
}

export interface seeCoffeeShop_seeCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface seeCoffeeShop_seeCoffeeShop_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface seeCoffeeShop_seeCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: seeCoffeeShop_seeCoffeeShop_user;
  photos: seeCoffeeShop_seeCoffeeShop_photos[];
  categories: (seeCoffeeShop_seeCoffeeShop_categories | null)[] | null;
  isMine: boolean;
}

export interface seeCoffeeShop {
  seeCoffeeShop: seeCoffeeShop_seeCoffeeShop | null;
}

export interface seeCoffeeShopVariables {
  id: number;
}
