import {usePlacesData} from "@/hooks/queryHooks/usePlacesData";
import {useActionData} from "@/hooks/contexts/useActionData";
import useAuth from "@/hooks/contexts/useAuth";
import {Link, Stack, useRouter} from "expo-router";
import {StyleSheet, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import {ContentNavButton} from "@/components/buttons/ContentHolderButton";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedText} from "@/components/themed/ThemedText";
import {useRoute} from "@react-navigation/core";

export default function Settings() {
  const {defaultUserLocation} = useActionData();
  const {logout} = useAuth();
  const {placeData} = usePlacesData();
  const router = useRouter();
  const route = useRoute();
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    AsyncStorage.getItem("apiUrl").then((url) => setUrl(url ?? ""));
  }, [route.params])
  return (
    <ThemedGestureHandlerRootView>
      <SafeAreaView>
        <Stack.Screen
          name=''
          options={{
            title: "Ustawienia",
          }}
        />
        <ThemedView style={{borderRadius: 20, paddingTop: 20, paddingHorizontal: 10}}>
          <ThemedText type={'title'}>
            Ustawienia
          </ThemedText>
          <ContentNavButton
            style={styles.button}
            href={{
              pathname: "/home/select-screen",
              params: {datastring: JSON.stringify(placeData), selection: "defaultUserLocation"},
            }}
            icon='shop'
            title='Sklep'
            content={placeData ? placeData.find((item) => item.key === defaultUserLocation)?.value.toString()! : ""}
            hasChevron
          />
          <ContentNavButton
            style={styles.borderTop}
            href="/server-url"
            icon='globe'
            title='Adres aplikacji'
            content={url}
            hasChevron
          />
          <TouchableOpacity onPress={() => {
            logout();
            router.replace("/");
          }}>
            <ThemedView style={[styles.borderTop, styles.logoutButton]}>
              <ThemedText style={{fontSize: 18, fontWeight: 'bold', color: "red"}}>
                Wyloguj
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    </ThemedGestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: "transparent",
  },
  borderTop: {
    borderTopWidth: 1,
  },
  button: {
    backgroundColor: "transparent",
  }
})
