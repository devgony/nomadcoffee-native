import React, { useState } from "react";
import { Image, useWindowDimensions } from "react-native";
import { Text, View } from "react-native";
import { seeCoffeeShops_seeCoffeeShops_coffeeShops } from "../__generated__/seeCoffeeShops";
import UserAvatar from "../components/UserAvatar";
import styled from "styled-components/native";
import useGeo from "../hooks/useGeo";

interface ICoffeeShop {
  coffeeShop: seeCoffeeShops_seeCoffeeShops_coffeeShops;
}

const Container = styled.View`
  margin-bottom: 20px;
`;

const LineContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  margin-left: 80px;
  font-weight: 600;
  font-size: 20px;
`;

const SAddress = styled.Text`
  color: white;
`;

const SCategory = styled.Text`
  background-color: white;
  margin-right: 2%;
  border-radius: 50px;
`;

export default function CoffeeShop({
  coffeeShop: { name, user, photos, latitude, longitude, categories },
}: ICoffeeShop) {
  const { width, height } = useWindowDimensions();
  const [address, setAddress] = useState("");
  useGeo(+latitude, +longitude).then(addr => setAddress(addr as string));
  return (
    <Container>
      <LineContainer>
        <UserAvatar
          resizeMode="cover"
          uri={user.avatarURL}
          username={user.name}
        />
        <Title>{name}</Title>
      </LineContainer>
      <Image
        resizeMode="cover"
        style={{ width, height: height - 400, borderRadius: 10 }}
        source={{ uri: photos[0].url }}
      />
      <SAddress>{address}</SAddress>
      <LineContainer>
        {categories?.map(category => (
          <SCategory key={category?.id}>#{category?.name}</SCategory>
        ))}
      </LineContainer>
    </Container>
  );
}
