import SelectableForwardedButton from "@/components/RadioGroup";
import { ThemedGestureHandlerRootView } from "@/components/themed/ThemedGestureHandlerRootView";
import { useActionData } from "@/hooks/contexts/useActionData";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectScreen() {
  const {
    userLocationKey,
    actionLocationKey,
    price,
    statusKey,
    defaultUserLocation,
    setUserLocationKey,
    setActionLocationKey,
    setPrice,
    setStatusKey,
    setDefaultUserLocation,
  } = useActionData();

  const colorScheme = useColorScheme();
  const headerColor = () => {
    return colorScheme === "dark" ? DarkTheme.colors.card : DefaultTheme.colors.card;
  };
  const headerTextColor = () => {
    return colorScheme === "dark" ? DarkTheme.colors.text : DefaultTheme.colors.text;
  };

  const onSelect = () => {
    switch (selection) {
      case "userLocation":
        return setUserLocationKey;
      case "actionLocation":
        return setActionLocationKey;
      case "price":
        return setPrice;
      case "status":
        return setStatusKey;
      case "defaultUserLocation":
        return setDefaultUserLocation;

      default:
        return () => {};
    }
  };

  const defaultSelection = () => {
    switch (selection) {
      case "userLocation":
        return userLocationKey;
      case "actionLocation":
        return actionLocationKey;
      case "price":
        return price;
      case "status":
        return statusKey;
      case "defaultUserLocation":
        return defaultUserLocation;
      default:
        return undefined;
    }
  };

  const header = () => {
    switch (selection) {
      case "userLocation":
        return "Miejsce";
      case "actionLocation":
        return "Miejsce";
      case "price":
        return "Cena";
      case "status":
        return "Status";
      case "defaultUserLocation":
        return "Miejsce";
      default:
        return undefined;
    }
  };

  const { datastring, selection } = useLocalSearchParams<{ datastring: string; selection: string }>();

  const optionsList = datastring ? JSON.parse(datastring) : [];
  return (
    <ThemedGestureHandlerRootView>
      <SafeAreaView>
        <Stack.Screen
          options={{
            title: header(),
            headerBackTitle: "Wróć",
            headerStyle: { backgroundColor: headerColor() },
            headerTitleStyle: { color: headerTextColor() },
          }}
        />
        <SelectableForwardedButton data={optionsList} onSelect={onSelect()} selection={defaultSelection()} />
      </SafeAreaView>
    </ThemedGestureHandlerRootView>
  );
}
