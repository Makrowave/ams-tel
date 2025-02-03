import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ActionDataProvider } from "@/components/contexts/ActionDataContext";
import { FilterContextProvider } from "@/components/contexts/FilterContext";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { Stack } from "expo-router";
import { Button } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RefreshModelProvider } from "@/components/contexts/RefreshModelContext";
import { ActionResultProvider } from "@/components/contexts/ActionResultContext";
import InteractionResult from "@/components/InteractionResult";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
  duration: 1500,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const headerColor = () => {
    return colorScheme === "dark" ? DarkTheme.colors.card : DefaultTheme.colors.card;
  };
  const headerTextColor = () => {
    return colorScheme === "dark" ? DarkTheme.colors.text : DefaultTheme.colors.text;
  };

  const queryClient = new QueryClient();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ActionResultProvider>
            <ActionDataProvider>
              <FilterContextProvider>
                <RefreshModelProvider>
                  <InteractionResult />
                  <Stack>
                    <Stack.Screen name='index' options={{ headerShown: false, animation: "fade" }} />
                    <Stack.Screen
                      name='(tabs)'
                      options={{
                        headerShown: false,
                        animation: "fade",
                      }}
                    />
                    <Stack.Screen name='+not-found' />
                    <Stack.Screen
                      name='home/move'
                      options={{
                        title: "Przenieś rower",
                        headerBackTitle: "Wróć",
                        headerRight: () => <Button title='Wpisz kod' />,
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                    <Stack.Screen
                      name='home/assemble'
                      options={{
                        title: "Złóż rower",
                        headerBackTitle: "Wróć",
                        headerRight: () => <Button title='Wpisz kod' />,
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                    <Stack.Screen
                      name='home/sell'
                      options={{
                        title: "Sprzedaj rower",
                        headerBackTitle: "Wróć",
                        headerRight: () => <Button title='Wpisz kod' />,
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                    <Stack.Screen
                      name='home/add'
                      options={{
                        title: "Dodaj rower",
                        headerBackTitle: "Wróć",
                        headerRight: () => <Button title='Wpisz kod' />,
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                    <Stack.Screen
                      name='home/delivery'
                      options={{
                        title: "Dostawa",
                        headerBackTitle: "Wróć",
                        headerRight: () => <Button title='Wpisz kod' />,
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                    <Stack.Screen
                      name='search/filter-menu'
                      options={{
                        title: "Wyszukaj",
                        headerBackTitle: "Wróć",
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                    <Stack.Screen
                      name='search/filter-page'
                      options={{
                        title: "",
                        headerBackTitle: "Wróć",
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                    <Stack.Screen
                      name='search/model'
                      options={{
                        title: "Model",
                        headerBackTitle: "Wróć",
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                    <Stack.Screen
                      name='home/search'
                      options={{
                        title: "Przypisz model",
                        headerBackTitle: "Wróć",
                        headerStyle: { backgroundColor: headerColor() },
                        headerTitleStyle: { color: headerTextColor() },
                      }}
                    />
                  </Stack>
                </RefreshModelProvider>
              </FilterContextProvider>
            </ActionDataProvider>
          </ActionResultProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
