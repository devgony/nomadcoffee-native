import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import styled from "styled-components/native";
import {
  seeCoffeeShops,
  seeCoffeeShops_seeCoffeeShops,
  seeCoffeeShops_seeCoffeeShops_coffeeShops,
} from "../__generated__/seeCoffeeShops";
import ScreenLayout from "../components/ScreenLayout";
import { RefreshControl } from "react-native";
import CoffeeShop from "../components/CoffeeShop";
import { COFFEE_SHOP_FRAGMENT, SEE_COFFEE_SHOPS_FRAGMENT } from "../fragments";

const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      ...SeeCoffeeShopsFragment
    }
  }
  ${SEE_COFFEE_SHOPS_FRAGMENT}
`;

const Container = styled.View`
  background-color: black;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch, fetchMore } = useQuery<seeCoffeeShops>(
    SEE_COFFEE_SHOPS,
    {
      variables: { page: 1 },
    }
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const renderCoffeeShop: ListRenderItem<seeCoffeeShops_seeCoffeeShops_coffeeShops> =
    ({ item: coffeeShop }) => <CoffeeShop coffeeShop={coffeeShop} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.05}
        onEndReached={() => {
          if (data?.seeCoffeeShops && page < data.seeCoffeeShops.maxPage) {
            setPage(prev => {
              const next = prev + 1;
              fetchMore({
                variables: {
                  page: next,
                },
              });
              return next;
            });
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
        data={
          data?.seeCoffeeShops
            ?.coffeeShops as seeCoffeeShops_seeCoffeeShops_coffeeShops[]
        }
        keyExtractor={coffeeShops => "CoffeeShop:" + coffeeShops.id}
        renderItem={renderCoffeeShop}
      />
    </ScreenLayout>
  );
}
