import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Button } from "react-native";
import { ActionDataProvider } from "@/components/contexts/ActionDataContext";
import { useActionData } from "@/hooks/useActionData";
import { ConstantsContextProvider } from "@/components/contexts/ConstantsContext";
import { FilterContextProvider } from "@/components/contexts/FilterContext";
import AuthContext, { AuthProvider } from "@/components/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";

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

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <ActionDataProvider>
          <ConstantsContextProvider>
            <FilterContextProvider>
              <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='+not-found' />
                <Stack.Screen
                  name='home/move'
                  options={{
                    title: "Przenieś rower",
                    headerBackTitle: "Wróć",
                    headerRight: () => <Button title='Wpisz kod' />,
                  }}
                />
                <Stack.Screen
                  name='home/assemble'
                  options={{
                    title: "Złóż rower",
                    headerBackTitle: "Wróć",
                    headerRight: () => <Button title='Wpisz kod' />,
                  }}
                />
                <Stack.Screen
                  name='home/sell'
                  options={{
                    title: "Sprzedaj rower",
                    headerBackTitle: "Wróć",
                    headerRight: () => <Button title='Wpisz kod' />,
                  }}
                />
                <Stack.Screen
                  name='home/add'
                  options={{
                    title: "Dodaj rower",
                    headerBackTitle: "Wróć",
                    headerRight: () => <Button title='Wpisz kod' />,
                  }}
                />
                <Stack.Screen
                  name='home/delivery'
                  options={{
                    title: "Dostawa",
                    headerBackTitle: "Wróć",
                    headerRight: () => <Button title='Wpisz kod' />,
                  }}
                />
                <Stack.Screen
                  name='search/filter-menu'
                  options={{
                    title: "Wyszukaj",
                    headerBackTitle: "Wróć",
                  }}
                />
                <Stack.Screen
                  name='search/filter-page'
                  options={{
                    title: "",
                    headerBackTitle: "Wróć",
                  }}
                />
              </Stack>
            </FilterContextProvider>
          </ConstantsContextProvider>
        </ActionDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
