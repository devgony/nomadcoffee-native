import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { ScreenProps } from "../types/screen";
import { seeProfile } from "../__generated__/seeProfile";
import { UserAvatar } from "../components/UserAvatar";
import AuthButton from "../components/AuthButton";
import { logUserOut } from "../apollo";

const SEE_PROFILE = gql`
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

interface IProfile extends ScreenProps<"Profile"> {
  username?: string;
  isMe: boolean;
}

const WText = styled.Text`
  color: white;
  font-size: 20px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Layout = styled.View`
  padding: 0 4px;
  background-color: black;
  flex: 1;
`;

export default function Profile({ username, navigation, isMe }: IProfile) {
  const { data, loading, error } = useQuery<seeProfile>(SEE_PROFILE, {
    variables: { username },
  });
  useEffect(() => {
    navigation.setOptions({
      title: isMe ? "My Profile" : username,
    });
  }, []);
  return (
    <Layout>
      <Wrapper>
        <UserAvatar
          resizeMode="cover"
          uri={data?.seeProfile?.avatarURL}
          username={data?.seeProfile?.username}
        />
        {isMe && (
          <AuthButton
            text="Edit"
            loading={false}
            disabled={false}
            onPress={() => {}}
            width={"30%"}
          />
        )}
        {isMe && (
          <AuthButton
            text="Logout"
            loading={false}
            disabled={false}
            onPress={logUserOut}
            width={"30%"}
          />
        )}
      </Wrapper>
      <WText>{`email: ${data?.seeProfile?.email}`}</WText>
      <WText>{`name: ${data?.seeProfile?.name}`}</WText>
      <WText>{`location: ${data?.seeProfile?.location}`}</WText>
      <WText>{`github: ${data?.seeProfile?.githubUsername}`}</WText>
    </Layout>
  );
}
