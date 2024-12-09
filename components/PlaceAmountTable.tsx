import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useBikes } from "@/hooks/queryHooks/useBikes";
import { ColorRecord } from "@/constants/Types";

interface PlaceAmountTableProps {
  id: Number;
}

export default function PlaceAmountTable({ id }: PlaceAmountTableProps) {
  const { placeFindByKey } = usePlacesData();
  const { statusFindByKey } = useStatusesData();
  const { bikeData, bikeIsError, bikeIsPending, bikeError } = useBikes(id);
  if (bikeIsError) {
    <ThemedText>{typeof bikeError === "string" ? bikeError : bikeError?.message}</ThemedText>;
  }
  if (bikeIsPending) {
    <ThemedView style={styles.table}>
      <ActivityIndicator />
    </ThemedView>;
  }

  return (
    <ThemedView style={styles.table}>
      <ThemedView style={[{ borderBottomWidth: 1, marginBottom: 6 }, styles.row]}>
        <ThemedText type='defaultSemiBold'>Lp.</ThemedText>
        <ThemedText type='defaultSemiBold'>Miejsce</ThemedText>
        <View style={{ flexDirection: "row", justifyContent: "center", width: 100 }}>
          <ThemedText type='defaultSemiBold'>Status</ThemedText>
        </View>
      </ThemedView>
      {bikeData?.map((bike, index) => (
        <PlaceRow
          index={1 + index}
          first={index === 0}
          place={placeFindByKey(bike.place)}
          status={statusFindByKey(bike.statusId)}
          key={bike.id.toString()}
        />
      ))}
    </ThemedView>
  );
}

interface PlaceRowProps {
  index: Number;
  place: string;
  status: ColorRecord | undefined;
  first: boolean;
}

function PlaceRow({ index, place, status, first }: PlaceRowProps) {
  return (
    <ThemedView style={[styles.row, first ? undefined : { borderTopWidth: 0.4 }]}>
      <ThemedText>{index.toString()}</ThemedText>
      <ThemedText>{place}</ThemedText>
      {status === undefined ? (
        <ThemedText>Nie znaleziono</ThemedText>
      ) : (
        <View style={[styles.status, { backgroundColor: status.color }]}>
          <Text style={{ alignSelf: "center" }}>{status.value}</Text>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 0.8,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    alignItems: "center",
  },
  status: {
    width: 100,
    borderRadius: 10,
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
});
