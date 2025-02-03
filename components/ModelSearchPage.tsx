import { ForwardedButton } from "@/components/LabeledButton";
import ModelTable from "@/components/model-table/ModelTable";
import { ThemedImage } from "@/components/themed/ThemedImage";
import ThemedIonicons from "@/components/themed/ThemedIonicons";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { Link } from "expo-router";
import { StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedGestureHandlerRootView } from "./themed/ThemedGestureHandlerRootView";

export interface ModelTableBindProps {
  bindMode?: boolean;
}

export default function ModelSearchPage({ bindMode }: ModelTableBindProps) {
  const insets = useSafeAreaInsets();
  const absoluteStyle = (): ViewStyle => {
    return { position: "absolute", top: insets.top, bottom: insets.bottom, left: insets.left, right: insets.right };
  };

  return (
    <ThemedGestureHandlerRootView>
      <ThemedView style={[absoluteStyle(), styles.pageWrapper]}>
        <ThemedView style={styles.header}>
          <ThemedIonicons name='color-palette' size={32} style={{ padding: 4, marginRight: 10 }} />
          <ThemedText style={{ width: "50%", textAlign: "center" }}>Nazwa</ThemedText>
          <ThemedImage
            source={require("@/assets/images/frame.png")}
            style={{ height: 30, width: 80, resizeMode: "contain" }}
          />
        </ThemedView>
        <ModelTable style={styles.table} bindMode={bindMode} />
        <Link href='/search/filter-menu' asChild style={styles.filterButton}>
          <ForwardedButton
            title='Wyszukaj'
            type='single'
            hasChevron
            iconColor='#00ccdc'
            hasIcon
            source={require("@/assets/images/search.png")}
            style={{
              marginVertical: "auto",
              alignSelf: "center",
              borderWidth: 1,
            }}
          />
        </Link>
      </ThemedView>
    </ThemedGestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  table: {
    flexBasis: "80%",
    display: "flex",
  },
  header: {
    display: "flex",
    flexBasis: "10%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  filterButton: {
    marginTop: 10,
    marginBottom: 10,
    flexBasis: "10%",
  },
  pageWrapper: {
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
  },
});
