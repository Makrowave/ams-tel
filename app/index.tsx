import { ThemedImage } from "@/components/ThemedImage";
import { ThemedView } from "@/components/ThemedView";
import { useEnableQueries } from "@/hooks/queryHooks/useEnableQueries";
import useRefreshUser from "@/hooks/useRefreshUser";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface LoadingScreenProps {
  lightColor?: string;
  darkColor?: string;
}

export default function LoadingScreen({ lightColor, darkColor }: LoadingScreenProps) {
  const refreshUser = useRefreshUser();
  const router = useRouter();
  const enableQueries = useEnableQueries();
  const shadowColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  useEffect(() => {
    const refresh = async () => {
      const startTime = Date.now();
      const response = await refreshUser();
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
      if (response) {
        enableQueries();
        router.replace("/(tabs)/menu");
      } else {
        router.replace("/login/login");
      }
    };

    refresh();
  }, []);

  return (
    <GestureHandlerRootView>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView style={[styles.logoWrapper, { shadowColor: shadowColor }]}>
          <ThemedImage style={{ width: 200, height: 200 }} source={require("@/assets/images/bike.png")} />
        </ThemedView>
      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    margin: "auto",
    borderRadius: 40,
    padding: 10,
    shadowRadius: 40,
    shadowOpacity: 0.2,
  },
});
