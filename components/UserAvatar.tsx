import { Ionicons } from "@expo/vector-icons";
import { ImageResizeMode, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import React from "react";

const RADIUS = "60px";

const Layout = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SUserAvatar = styled.Image`
  margin-right: 10px;
  width: ${RADIUS};
  height: ${RADIUS};
  border-radius: 40px;
`;

export const SDefaultAvatar = styled.View`
  margin-right: 10px;
  width: ${RADIUS};
  height: ${RADIUS};
  border-radius: 40px;
  background-color: lightgray;
  align-items: center;
  justify-content: center;
`;

export const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

interface IUserAvatar {
  resizeMode: ImageResizeMode;
  uri?: string | null;
  username?: string;
}

export function UserAvatar({ resizeMode, uri, username }: IUserAvatar) {
  return (
    <Layout>
      {uri ? (
        <SUserAvatar resizeMode={resizeMode} source={{ uri }} />
      ) : (
        <SDefaultAvatar>
          <Ionicons name={"person"} color={"white"} size={40} />
        </SDefaultAvatar>
      )}
      <Username>{username}</Username>
    </Layout>
  );
}
