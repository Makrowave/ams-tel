import { ForwardedButton } from "@/components/LabeledButton";
import ModelTable from "@/components/model-table/ModelTable";
import { ThemedImage } from "@/components/ThemedImage";
import ThemedIonicons from "@/components/ThemedIonicons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ModelTableBindProps {
  bindMode?: boolean;
}

export default function ModelSearchPage({ bindMode }: ModelTableBindProps) {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ThemedView style={styles.pageWrapper}>
          <ThemedView style={styles.header}>
            <ThemedIonicons name='color-palette' size={32} style={{ padding: 4, marginRight: 10 }} />
            <ThemedText style={{ width: "50%" }}>Nazwa</ThemedText>
            <ThemedImage
              source={require("@/assets/images/frame.png")}
              style={{ height: 30, width: 80, resizeMode: "contain" }}
            />
          </ThemedView>
          <ModelTable style={{ height: "75%" }} bindMode={bindMode} />
          <View style={styles.container}>
            <Link href='/search/filter-menu' asChild>
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
          </View>
        </ThemedView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  pageWrapper: {
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
