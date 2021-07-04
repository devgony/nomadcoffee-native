/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SeeCoffeeShopsFragment
// ====================================================

export interface SeeCoffeeShopsFragment_coffeeShops_user {
  __typename: "User";
  id: number;
  name: string;
  avatarURL: string | null;
}

export interface SeeCoffeeShopsFragment_coffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface SeeCoffeeShopsFragment_coffeeShops_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface SeeCoffeeShopsFragment_coffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: SeeCoffeeShopsFragment_coffeeShops_user;
  photos: SeeCoffeeShopsFragment_coffeeShops_photos[];
  categories: (SeeCoffeeShopsFragment_coffeeShops_categories | null)[] | null;
  isMine: boolean;
}

export interface SeeCoffeeShopsFragment {
  __typename: "Result";
  coffeeShops: (SeeCoffeeShopsFragment_coffeeShops | null)[] | null;
  maxPage: number;
}
