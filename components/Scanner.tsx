import {CameraView, useCameraPermissions} from "expo-camera";
import {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle} from "react-native";
import {ThemedView} from "./themed/ThemedView";
import {ThemedIonicons} from "@/components/themed/ThemedIonicons";

type ScannerProps = {
  onBarcodeScanned: (data: string) => void;
  style?: StyleProp<ViewStyle>;
};

export default function Scanner(props: ScannerProps) {
  const [useFlashlight, setUseFlashlight] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  function handlePress() {
    setUseFlashlight(!useFlashlight);
  }

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  });

  return (
    <View style={[styles.wrapper, props.style]}>
      <CameraView
        pointerEvents='box-none'
        style={styles.camera}
        facing='back'
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        onBarcodeScanned={(result) => {
          props.onBarcodeScanned(result.data);
        }}
        autofocus='off'
        enableTorch={useFlashlight}
      ></CameraView>
      {/* The button shouldn't be in camera - somehow it isn't pressable */}
      <ThemedView style={styles.flashlightButton}>
        <TouchableOpacity onPress={handlePress}>
          <ThemedIonicons name={useFlashlight ? "flashlight" : "flashlight-outline"} size={50} style={{padding: 10}}/>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  flashlightButton: {
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    right: 10,
    opacity: 0.7,
  },
});
