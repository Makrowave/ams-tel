import { ModelRecordData } from "@/constants/Types";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface ModelRecordProps {
  model: ModelRecordData;
}

export default function ModelRecord({ model }: ModelRecordProps) {
  return (
    <ThemedView style={styles.record}>
      <Link
        asChild
        href={{
          pathname: "/search/model",
          params: { modelString: JSON.stringify(model) },
        }}
      >
        <TouchableOpacity style={styles.opacity}>
          {model.primaryColor && model.secondaryColor ? (
            <LinearGradient
              colors={[model.primaryColor, model.secondaryColor]}
              style={styles.colorBox}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              locations={[0.5, 0.5]}
            />
          ) : (
            <Ionicons name='alert-circle-outline' size={40} style={styles.colorBox} color='#ff4444' />
          )}
          <ThemedText style={{ alignSelf: "center", width: "50%" }} numberOfLines={1}>
            {model.modelName}
          </ThemedText>
          <ThemedText style={{ alignSelf: "center", width: 80, textAlign: "center" }}>
            {model.frameSize.toString()}x{model.wheelSize.toString()}
          </ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignSelf: "center",
    marginRight: 10,
  },
  record: {
    height: 60,
    borderBottomWidth: 0.3,
  },
  opacity: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
});
