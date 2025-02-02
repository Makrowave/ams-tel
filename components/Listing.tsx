import { StyleSheet } from "react-native";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";

interface ListingProps {
  title: string;
  text: string;
}

export default function Listing({ title, text }: ListingProps) {
  return (
    <ThemedView style={styles.listing}>
      <ThemedView style={styles.titleWrapper}>
        <ThemedText style={styles.title} type='defaultSemiBold'>
          {title}
        </ThemedText>
      </ThemedView>
      <ThemedText>{text}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listing: {
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 0.7,
  },
  title: {},
  titleWrapper: {
    borderBottomWidth: 0.4,
  },
});
