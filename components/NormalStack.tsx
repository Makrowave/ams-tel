import { Button } from "react-native";
import { Stack } from "expo-router";

export default function NormalStack({}) {
  return (
    <Stack>
      <Stack.Screen
        name='login/login'
        options={{ headerTitle: "Logowanie", animation: "fade", headerBackVisible: false }}
      />
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
  );
}
