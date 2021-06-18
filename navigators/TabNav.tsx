import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import TabIcon from "../components/TabIcon";
import Login from "../screens/Login";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

interface ITabNav {
  isLoggedIn: boolean;
}

export default function TabNav({ isLoggedIn }: ITabNav) {
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
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() =>
          isLoggedIn ? <SharedStackNav screenName="Profile" /> : <Login />
        }
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
