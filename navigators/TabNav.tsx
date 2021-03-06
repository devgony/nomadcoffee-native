import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { cache } from "../apollo";
import TabIcon from "../components/TabIcon";
import useMe from "../hooks/useMe";
import Login from "../screens/Login";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

interface ITabNav {
  isLoggedIn: boolean;
}

export default function TabNav({ isLoggedIn }: ITabNav) {
  const myName = useMe().data?.me?.username;
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: false,
        style: {
          borderTopColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"cafe"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Upload"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              iconName={"md-cloud-upload"}
              color={color}
              focused={focused}
            />
          ),
        }}
      >
        {() =>
          isLoggedIn ? <SharedStackNav screenName="Upload" /> : <Login />
        }
      </Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => {
          if (isLoggedIn) {
            // cache.evict({ fieldName: "searchCoffeeShops" });
            // cache.evict({ fieldName: "searchMyCoffeeShops" });
            return <SharedStackNav screenName="Profile" myName={myName} />;
          }
          return <Login />;
        }}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
