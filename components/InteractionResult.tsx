import { useActionResult } from "@/hooks/contexts/useActionResult";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedGestureHandlerRootView } from "./themed/ThemedGestureHandlerRootView";

export default function InteractionResult() {
  const { message, status, visible, clearInteractionResult } = useActionResult();
  const insets = useSafeAreaInsets();

  return (
    visible && (
      <ThemedGestureHandlerRootView style={[styles.wrapper, { top: insets.top }]}>
        <TouchableOpacity
          onPressIn={() => {
            console.log("seima");
            clearInteractionResult();
          }}
          style={[styles.result, getStyle(status)]}
        >
          <Text style={styles.text}>{message}</Text>
          <Text style={styles.closeText}>Naciśnij aby zamknąć</Text>
        </TouchableOpacity>
      </ThemedGestureHandlerRootView>
    )
  );
}

const getStyle = (status: "success" | "failure" | "") => {
  if (status === "success") {
    return styles.success;
  } else if (status === "failure") {
    return styles.failure;
  } else {
    return;
  }
};

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 19,
  },
  closeText: {
    color: "#ffffff",
    fontSize: 12,
    textDecorationLine: "underline",
    marginTop: 4,
  },
  wrapper: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
  },
  result: {
    paddingVertical: 10,
    minHeight: 80,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  success: {
    backgroundColor: "#22dd00",
  },
  failure: {
    backgroundColor: "#ff2200",
  },
});
