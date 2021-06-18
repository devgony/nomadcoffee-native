import TabNav from "./navigators/TabNav";
import { AppearanceProvider } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map(font => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/cat.gif")];
    const imagePromises = imagesToLoad.map(image => Asset.loadAsync(image));
    Promise.all<void | Asset[]>([...fontPromises, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer>
          <TabNav isLoggedIn={isLoggedIn} />
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
