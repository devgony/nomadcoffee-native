import React, { useEffect, useState } from "react";
import { Image, useWindowDimensions } from "react-native";
import { Text, View } from "react-native";
import { seeCoffeeShops_seeCoffeeShops_coffeeShops } from "../__generated__/seeCoffeeShops";
import UserAvatar from "../components/UserAvatar";
import styled from "styled-components/native";
import useGeo from "../hooks/useGeo";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";

interface ICoffeeShop {
  coffeeShop: seeCoffeeShops_seeCoffeeShops_coffeeShops;
}

const Container = styled.View`
  margin-bottom: 20px;
`;

const LineContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 20px;
  margin-left: 10px;
`;

const SAddress = styled.Text`
  color: white;
`;
const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

const SCategory = styled.Text`
  color: ${colors.orange};
  font-weight: 600;
  margin-right: 2%;
  border-radius: 50px;
`;

export default function CoffeeShop({
  coffeeShop: { name, user, photos, latitude, longitude, categories },
}: ICoffeeShop) {
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 400);
  // console.log(height);
  const [address, setAddress] = useState("");
  // useGeo(+latitude, +longitude).then(addr => setAddress(addr as string));
  // useEffect(() => {
  //   setImageHeight(height - 400);
  // }, [height]);
  return (
    <Container>
      <LineContainer>
        <UserAvatar
          resizeMode="cover"
          uri={user.avatarURL}
          username={user.name}
        />
        <Ionicons name="share-social" size={25} color={"white"} />
      </LineContainer>
      <Image
        resizeMode="cover"
        style={{
          width,
          height: imageHeight,
          borderRadius: 10,
          marginBottom: 10,
        }}
        source={{ uri: photos[0].url }}
      />
      <Title>{name}</Title>
      <SAddress>{address}</SAddress>
      <CategoryContainer>
        {categories?.map(category => (
          <SCategory key={category?.id}>#{category?.name}</SCategory>
        ))}
      </CategoryContainer>
    </Container>
  );
}
