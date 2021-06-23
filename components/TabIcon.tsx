import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ITabIcon {
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
}

export default function TabIcon({ iconName, color, focused }: ITabIcon) {
  return (
    <Ionicons
      name={
        focused ? iconName : (`${iconName}-outline` as ITabIcon["iconName"])
      }
      color={color}
      size={22}
    />
  );
}
