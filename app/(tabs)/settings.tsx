import { ForwardedButton } from "@/components/LabeledButton";
import { useActionData } from "@/hooks/useActionData";
import useAuth from "@/hooks/useAuth";
import { useConstantsContext } from "@/hooks/useConstants";
import { Link, Stack } from "expo-router";
import { Alert, Button, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { defaultUserLocation } = useActionData();
  const { logout } = useAuth();
  const { placeList } = useConstantsContext();
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <Stack.Screen
          name=''
          options={{
            title: "Przenieś rower",
            headerBackTitle: "Wróć",
            headerRight: () => <Button title='Wpisz kod' />,
          }}
        />
        <Link
          asChild
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeList), selection: "defaultUserLocation" },
          }}
        >
          <ForwardedButton
            text='Sklep:'
            hasContent={true}
            content={placeList.find((item) => item.key === defaultUserLocation)?.value.toString()}
            key={defaultUserLocation?.toString()}
            source={require("@/assets/images/move.png")}
            hasChevron={true}
            type='header'
          />
        </Link>
        <Link
          asChild
          href={{
            pathname: "/login/login",
          }}
        >
          <ForwardedButton text='Zaloguj' type='footer' />
        </Link>
        <ForwardedButton
          text='Wyloguj'
          textColor='#FF0000'
          source={require("@/assets/images/move.png")}
          onPress={() => logout()}
          type='footer'
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {},
});
