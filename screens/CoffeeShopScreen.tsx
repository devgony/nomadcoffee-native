import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { ScreenProps } from "../types/screen";
import {
  seeCoffeeShop,
  seeCoffeeShopVariables,
  seeCoffeeShop_seeCoffeeShop,
} from "../__generated__/seeCoffeeShop";
import CoffeeShop from "../components/CoffeeShop";

const SEE_COFFEE_SHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
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
  }
`;

export default function CoffeeShopScreen({
  route,
}: ScreenProps<"CoffeeShopScreen">) {
  const { data, loading, refetch } = useQuery<
    seeCoffeeShop,
    seeCoffeeShopVariables
  >(SEE_COFFEE_SHOP, {
    variables: {
      id: route?.params?.coffeeShopId,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.seeCoffeeShop && <CoffeeShop coffeeShop={data?.seeCoffeeShop} />}
      </ScrollView>
    </ScreenLayout>
  );
}
