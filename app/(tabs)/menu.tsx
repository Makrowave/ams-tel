import { ForwardedButton } from "@/components/LabeledButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useActionData } from "@/hooks/useActionData";
import useAuth from "@/hooks/useAuth";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuth();
  const { defaultUserLocation } = useActionData();
  const { placeFindByKey } = usePlacesData();

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          <ThemedView style={styles.header}>
            <View style={styles.textContainer}>
              <ThemedText type='subtitle' style={styles.text}>
                Zalogowano:
              </ThemedText>
              <ThemedText type='subtitle'>{user.username}</ThemedText>
            </View>
            <View style={styles.textContainer}>
              <ThemedText type='subtitle' style={styles.text}>
                Sklep
              </ThemedText>
              <ThemedText type='subtitle'>{placeFindByKey(defaultUserLocation)}</ThemedText>
            </View>
          </ThemedView>
          <Link push href='/home/move' asChild>
            <ForwardedButton
              text='Przenieś rower'
              source={require("@/assets/images/move.png")}
              hasIcon={true}
              iconColor={colors.get("move")}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/assemble' asChild>
            <ForwardedButton
              text='Złóż rower'
              source={require("@/assets/images/unpack.png")}
              hasIcon={true}
              iconColor={colors.get("assemble")}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/sell' asChild>
            <ForwardedButton
              text='Sprzedaj rower'
              source={require("@/assets/images/sell.png")}
              hasIcon={true}
              iconColor={colors.get("sell")}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/add' asChild>
            <ForwardedButton
              text='Dodaj rower'
              source={require("@/assets/images/plus.png")}
              hasIcon={true}
              iconColor={colors.get("add")}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/delivery' asChild>
            <ForwardedButton
              text='Dostawa'
              source={require("@/assets/images/delivery.png")}
              hasIcon={true}
              iconColor={colors.get("delivery")}
              hasChevron={true}
              type='footer'
            />
          </Link>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: "2%",
  },
  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 30,
    borderBottomWidth: 1,
    flexDirection: "column",
  },
  text: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  textContainer: {
    paddingHorizontal: "4%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const colors = new Map<string, string>([
  ["add", "#00d2ff"],
  ["delivery", "#0062cc"],
  ["assemble", "#ffdc00"],
  ["sell", "#32cd32"],
  ["move", "#ff5c00"],
]);
