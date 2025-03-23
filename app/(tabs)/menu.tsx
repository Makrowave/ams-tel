import {ThemedText} from "@/components/themed/ThemedText";
import {ThemedView} from "@/components/themed/ThemedView";
import {usePlacesData} from "@/hooks/queryHooks/usePlacesData";
import {useActionData} from "@/hooks/contexts/useActionData";
import useAuth from "@/hooks/contexts/useAuth";
import {Href, Link} from "expo-router";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import BigIconNavigationButton, {BigIconNavigationButtonProps} from "@/components/buttons/BigIconNavigationButton";
import {ThemedFontAwesome6} from "@/components/themed/ThemedIonicons";

export default function HomeScreen() {
  const {user} = useAuth();
  const {defaultUserLocation} = useActionData();
  const {placeFindByKey} = usePlacesData();

  return (
    <ThemedGestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ThemedView style={{borderRadius: 15, paddingHorizontal: 10, paddingTop: 20, paddingBottom: 10}}>
          <ThemedText type={'title'}>
            Strona główna
          </ThemedText>
          <View style={styles.textContainer}>
            <ThemedFontAwesome6 name="circle-user" size={30} style={{marginRight: 10}}/>
            <ThemedText type='subtitle'>
              {user.username}
            </ThemedText>
          </View>
          <View style={styles.textContainer}>
            <ThemedFontAwesome6 name="shop" size={25} style={{marginRight: 10}}/>
            <ThemedText type='subtitle'>
              {placeFindByKey(defaultUserLocation)}
            </ThemedText>
          </View>
          {
            navItems.map((item) => (
              <Link push href={item.href} asChild>
                <BigIconNavigationButton
                  style={{borderTopWidth: 1, backgroundColor: "transparent"}}
                  {...item.buttonProps}
                />
              </Link>
            ))
          }
        </ThemedView>
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
    marginVertical: 10,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
});

const colors = new Map<string, string>([
  ["add", "#00d2ff"],
  ["delivery", "#0062cc"],
  ["assemble", "#ffdc00"],
  ["sell", "#32cd32"],
  ["move", "#ff5c00"],
]);

interface NavItem {
  buttonProps: BigIconNavigationButtonProps,
  href: Href
}

const navItems: NavItem[] = [
  {
    buttonProps: {
      icon: "bicycle", // Assuming this exists in FontAwesome6.glyphMap
      text: "Przenieś rower",
      color: colors.get("move")!,
    },
    href: "/home/move",
  },
  {
    buttonProps: {
      icon: "box-open", // Replace with the correct icon name
      text: "Złóż rower",
      color: colors.get("assemble")!,
    },
    href: "/home/assemble",
  },
  {
    buttonProps: {
      icon: "dollar-sign", // Replace with the correct icon name
      text: "Sprzedaj rower",
      color: colors.get("sell")!,
    },
    href: "/home/sell",
  },
  {
    buttonProps: {
      icon: "plus", // Assuming "plus" exists in FontAwesome6.glyphMap
      text: "Dodaj rower",
      color: colors.get("add")!,
    },
    href: "/home/add",
  },

];