/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCoffeeShops
// ====================================================

export interface searchCoffeeShops_searchCoffeeShops_user {
  __typename: "User";
  id: number;
}

export interface searchCoffeeShops_searchCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface searchCoffeeShops_searchCoffeeShops_categories {
  __typename: "Category";
  id: number;
}

export interface searchCoffeeShops_searchCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: searchCoffeeShops_searchCoffeeShops_user;
  photos: searchCoffeeShops_searchCoffeeShops_photos[];
  categories: (searchCoffeeShops_searchCoffeeShops_categories | null)[] | null;
  isMine: boolean;
}

export interface searchCoffeeShops {
  searchCoffeeShops: (searchCoffeeShops_searchCoffeeShops | null)[] | null;
}

export interface searchCoffeeShopsVariables {
  searchType: string;
  keyword: string;
  offset: number;
}
