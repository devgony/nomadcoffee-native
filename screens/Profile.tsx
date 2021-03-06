import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ScreenProps } from "../types/screen";
import { seeProfile } from "../__generated__/seeProfile";
import UserAvatar from "../components/UserAvatar";
import SkeletonButton from "../components/SkeletonButton";
import { cache, logUserOut } from "../apollo";
import {
  searchCoffeeShops,
  searchCoffeeShopsVariables,
  searchCoffeeShops_searchCoffeeShops,
} from "../__generated__/searchCoffeeShops";
import useMe from "../hooks/useMe";
import { SEARCH_COFFEE_SHOPS } from "./Search";
import { useWindowDimensions } from "react-native";
import { COFFEE_SHOP_FRAGMENT } from "../fragments";
import {
  searchMyCoffeeShops,
  searchMyCoffeeShopsVariables,
  searchMyCoffeeShops_searchMyCoffeeShops,
} from "../__generated__/searchMyCoffeeShops";

export const SEE_PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      email
      name
      location
      avatarURL
      githubUsername
      # following(page: Int): [User]
      # followers(page: Int): [User]
    }
  }
`;

const SEARCH_MY_COFFEE_SHOPS = gql`
  query searchMyCoffeeShops(
    $searchType: String!
    $keyword: String!
    $offset: Int!
  ) {
    searchMyCoffeeShops(
      searchType: $searchType
      keyword: $keyword
      offset: $offset
    ) {
      ...CoffeeShopFragment
    }
  }
  ${COFFEE_SHOP_FRAGMENT}
`;

interface IProfile extends ScreenProps<"Profile"> {
  isMe: boolean;
  myName?: string;
}

const WText = styled.Text`
  color: white;
  font-size: 20px;
`;

const UnderlineView = styled.View`
  border-bottom-color: white;
  border-bottom-width: 1px;
  /* flex: 0.8; */
  width: 65%;
  align-items: flex-end;
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const Layout = styled.View`
  padding: 0 4px;
  background-color: black;
  flex: 1;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: flex-end;
  margin-bottom: 5%;
`;

export default function Profile({ route, navigation, isMe, myName }: IProfile) {
  console.log(route?.params?.username, isMe, myName);
  const searchType = "user";
  const numColumns = 4;
  const { width, height } = useWindowDimensions();
  const { data, loading, error } = useQuery<seeProfile>(SEE_PROFILE, {
    variables: {
      username: isMe ? myName : route?.params?.username,
    },
    // fetchPolicy: "no-cache",
    // nextFetchPolicy: "cache-first",
  });
  const { data: dataSCS, fetchMore } = useQuery<
    searchMyCoffeeShops,
    searchMyCoffeeShopsVariables
  >(SEARCH_MY_COFFEE_SHOPS, {
    variables: {
      searchType,
      keyword: myName as string,
      offset: 0,
    },
  });

  const renderItem = ({
    item: coffeeShop,
  }: {
    item: searchMyCoffeeShops_searchMyCoffeeShops;
  }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CoffeeShopScreen", {
          coffeeShopId: coffeeShop.id,
        })
      }
    >
      <Image
        source={{ uri: coffeeShop.photos[0].url as string }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      title: isMe ? "My Profile" : route?.params?.username,
    });
  }, []);
  return (
    <Layout>
      {data?.seeProfile?.username && (
        <UserAvatar
          resizeMode="cover"
          uri={data?.seeProfile?.avatarURL}
          username={data?.seeProfile?.username}
        />
      )}
      <Wrapper>
        <WText>{`email: `}</WText>
        <UnderlineView>
          <WText>{`${data?.seeProfile?.email}`}</WText>
        </UnderlineView>
      </Wrapper>
      <Wrapper>
        <WText>{`name: `}</WText>
        <UnderlineView>
          <WText>{`${data?.seeProfile?.name}`}</WText>
        </UnderlineView>
      </Wrapper>
      <Wrapper>
        <WText>{`location: `}</WText>
        <UnderlineView>
          <WText>{`${data?.seeProfile?.location}`}</WText>
        </UnderlineView>
      </Wrapper>
      <Wrapper>
        <WText>{`github: `}</WText>
        <UnderlineView>
          <WText>{`${data?.seeProfile?.githubUsername}`}</WText>
        </UnderlineView>
      </Wrapper>
      <ButtonWrapper>
        {isMe && (
          <SkeletonButton
            text="Edit"
            loading={false}
            disabled={false}
            onPress={() => {}}
            width={"30%"}
          />
        )}
        {isMe && (
          <SkeletonButton
            text="Logout"
            loading={false}
            disabled={false}
            onPress={logUserOut}
            width={"30%"}
          />
        )}
      </ButtonWrapper>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore &&
          fetchMore({
            variables: {
              searchType: "user",
              keyword: isMe ? myName : route?.params?.username,
              offset: dataSCS?.searchMyCoffeeShops?.length as number,
            },
          })
        }
        numColumns={numColumns}
        data={
          dataSCS?.searchMyCoffeeShops as searchMyCoffeeShops_searchMyCoffeeShops[]
        }
        keyExtractor={coffeeShop => "CoffeeShop:" + coffeeShop.id}
        renderItem={renderItem}
      />
    </Layout>
  );
}
