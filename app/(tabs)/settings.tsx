import { ForwardedButton } from "@/components/LabeledButton";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useActionData } from "@/hooks/contexts/useActionData";
import useAuth from "@/hooks/contexts/useAuth";
import { Link, Stack, useRouter } from "expo-router";
import { Alert, Button, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { defaultUserLocation } = useActionData();
  const { logout } = useAuth();
  const { placeData } = usePlacesData();
  const router = useRouter();
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <Stack.Screen
          name=''
          options={{
            title: "Ustawienia",
          }}
        />
        <Link
          asChild
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeData), selection: "defaultUserLocation" },
          }}
        >
          <ForwardedButton
            title='Sklep:'
            hasContent={true}
            content={placeData ? placeData.find((item) => item.key === defaultUserLocation)?.value.toString() : ""}
            key={defaultUserLocation?.toString()}
            source={require("@/assets/images/move.png")}
            hasChevron={true}
            type='header'
          />
        </Link>
        <ForwardedButton
          title='Wyloguj'
          textColor='#FF0000'
          source={require("@/assets/images/move.png")}
          onPress={() => {
            logout();
            router.replace("/login/login");
          }}
          type='footer'
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {},
});
