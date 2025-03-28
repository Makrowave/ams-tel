import {Tabs} from "expo-router";
import React from "react";

import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {ThemedView} from "@/components/themed/ThemedView";
import {View} from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        lazy: false,
        tabBarBackground: () => <ThemedView style={{flex: 1}}/>,
        tabBarInactiveBackgroundColor: Colors[colorScheme ?? "light"].background,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? "light"].background,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconSelected,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='menu'
        options={{
          lazy: false,
          title: "Strona główna",
          tabBarIcon: ({color, focused}) => <TabBarIcon name={focused ? "home" : "home-outline"} color={color}/>,
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          lazy: false,
          title: "Rowery",
          tabBarIcon: ({color, focused}) => <TabBarIcon name={focused ? "search" : "search-outline"} color={color}/>,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          lazy: true,
          title: "Ustawienia",
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name={focused ? "settings" : "settings-outline"} color={color}/>
          ),
        }}
      />
    </Tabs>
  );
}
