import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ActionDataProvider } from "@/components/contexts/ActionDataContext";
import { FilterContextProvider } from "@/components/contexts/FilterContext";
import { AuthProvider } from "@/components/contexts/AuthContext";
import NormalStack from "@/components/NormalStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) {
    return null;
  }
  const queryClient = new QueryClient();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ActionDataProvider>
            <FilterContextProvider>
              <NormalStack />
            </FilterContextProvider>
          </ActionDataProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
