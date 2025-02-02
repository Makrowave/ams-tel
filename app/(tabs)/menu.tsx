import { ForwardedButton } from "@/components/LabeledButton";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useActionData } from "@/hooks/contexts/useActionData";
import useAuth from "@/hooks/contexts/useAuth";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedGestureHandlerRootView } from "@/components/themed/ThemedGestureHandlerRootView";

export default function HomeScreen() {
  const { user } = useAuth();
  const { defaultUserLocation } = useActionData();
  const { placeFindByKey } = usePlacesData();

  return (
    <ThemedGestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
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
              title='Przenieś rower'
              source={require("@/assets/images/move.png")}
              hasIcon={true}
              iconColor={colors.get("move")}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/assemble' asChild>
            <ForwardedButton
              title='Złóż rower'
              source={require("@/assets/images/unpack.png")}
              hasIcon={true}
              iconColor={colors.get("assemble")}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/sell' asChild>
            <ForwardedButton
              title='Sprzedaj rower'
              source={require("@/assets/images/sell.png")}
              hasIcon={true}
              iconColor={colors.get("sell")}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/add' asChild>
            <ForwardedButton
              title='Dodaj rower'
              source={require("@/assets/images/plus.png")}
              hasIcon={true}
              iconColor={colors.get("add")}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/delivery' asChild>
            <ForwardedButton
              title='Dostawa'
              source={require("@/assets/images/delivery.png")}
              hasIcon={true}
              iconColor={colors.get("delivery")}
              hasChevron={true}
              type='footer'
            />
          </Link>
        </View>
      </SafeAreaView>
    </ThemedGestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
