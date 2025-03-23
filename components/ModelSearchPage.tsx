import ModelTable from "@/components/model-table/ModelTable";
import {ThemedText} from "@/components/themed/ThemedText";
import {ThemedView} from "@/components/themed/ThemedView";
import {Link} from "expo-router";
import {StyleSheet} from "react-native";
import BigIconNavigationButton from "@/components/buttons/BigIconNavigationButton";

export interface ModelTableBindProps {
  bindMode?: boolean;
}

export default function ModelSearchPage({bindMode}: ModelTableBindProps) {
  return (
    <ThemedView style={styles.pageWrapper}>
      <ThemedView style={styles.header}>
        <ThemedText type={'title'}>
          Rowery
        </ThemedText>
      </ThemedView>
      <ModelTable style={styles.table} bindMode={bindMode}/>
      <Link href='/search/filter-menu' asChild style={styles.filterButton}>
        <BigIconNavigationButton icon={"magnifying-glass"} text={"Szukaj"} color={'#00ccdc'}/>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  filterButton: {
    borderTopWidth: 1,
  },
  pageWrapper: {
    paddingHorizontal: 10,
    paddingTop: 20,
    borderRadius: 20,
    display: "flex",
    height: "100%",
  },
});
