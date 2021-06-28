import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";

const Tab = createMaterialTopTabNavigator();

const Layout = styled.View`
  padding: 0 4px;
  background-color: black;
  flex: 1;
`;

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: "black",
        },
        activeTintColor: "white",
        indicatorStyle: {
          backgroundColor: "white",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="SELECT" component={SelectPhoto} />
      <Tab.Screen name="TAKE" component={TakePhoto} />
    </Tab.Navigator>
  );
}
