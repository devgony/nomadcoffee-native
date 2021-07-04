/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchMyCoffeeShops
// ====================================================

export interface searchMyCoffeeShops_searchMyCoffeeShops_user {
  __typename: "User";
  id: number;
  name: string;
  avatarURL: string | null;
}

export interface searchMyCoffeeShops_searchMyCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface searchMyCoffeeShops_searchMyCoffeeShops_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface searchMyCoffeeShops_searchMyCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  user: searchMyCoffeeShops_searchMyCoffeeShops_user;
  photos: searchMyCoffeeShops_searchMyCoffeeShops_photos[];
  categories: (searchMyCoffeeShops_searchMyCoffeeShops_categories | null)[] | null;
  isMine: boolean;
}

export interface searchMyCoffeeShops {
  searchMyCoffeeShops: (searchMyCoffeeShops_searchMyCoffeeShops | null)[] | null;
}

export interface searchMyCoffeeShopsVariables {
  searchType: string;
  keyword: string;
  offset: number;
}
