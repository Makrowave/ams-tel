import { CameraView, CameraNativeProps, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Button } from "react-native";
import { ThemedImage } from "./themed/ThemedImage";
import { ThemedView } from "./themed/ThemedView";

type ScannerProps = {
  onBarcodeScanned: (data: string) => void;
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
    <View style={styles.wrapper}>
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
          <ThemedImage source={require("@/assets/images/flashlight.png")} style={styles.icon} />
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
  icon: {
    resizeMode: "contain",
    height: 60,
    width: 60,
    margin: 10,
  },
});
