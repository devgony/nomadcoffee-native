import { Ionicons } from "@expo/vector-icons";
import { ImageResizeMode, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RADIUS = "40px";
const BORDER_RADIUS = "20px";

const Layout = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

export const SUserAvatar = styled.Image`
  margin-right: 10px;
  width: ${RADIUS};
  height: ${RADIUS};
  border-radius: ${BORDER_RADIUS};
`;

export const SDefaultAvatar = styled.View`
  margin-right: 10px;
  width: ${RADIUS};
  height: ${RADIUS};
  border-radius: ${BORDER_RADIUS};
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
  username: string;
}

export default function UserAvatar({ resizeMode, uri, username }: IUserAvatar) {
  const navigation = useNavigation();
  return (
    <Layout
      onPress={() => {
        navigation.navigate("User", {
          username,
          isMe: false,
        });
      }}
    >
      {uri ? (
        <SUserAvatar resizeMode={resizeMode} source={{ uri }} />
      ) : (
        <SDefaultAvatar>
          <Ionicons name={"person"} color={"white"} size={30} />
        </SDefaultAvatar>
      )}
      <Username>{username}</Username>
    </Layout>
  );
}
