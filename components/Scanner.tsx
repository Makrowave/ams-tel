import { CameraView, CameraNativeProps, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemedImage } from "./ThemedImage";
import { ThemedView } from "./ThemedView";


type ScannerProps = {
    onBarcodeScanned: (data: string) => void;
}

export default function Scanner(props: ScannerProps) {
    const [useFlashlight, setUseFlashlight] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <GestureHandlerRootView />
    }

    if (!permission.granted) {
        return (
            <GestureHandlerRootView>
                <Button onPress={requestPermission} title="Grant permission" />
            </GestureHandlerRootView>
        )
    }

    return (
        <View style={styles.wrapper}>
            <CameraView
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["ean13"],
                }}
                onBarcodeScanned={(result) => {
                    props.onBarcodeScanned(result.data)
                }}
                autofocus="off"
                enableTorch={useFlashlight}
            >
                <ThemedView style={styles.flashlightButton}>
                    <TouchableOpacity onPress={() => setUseFlashlight(!useFlashlight)}>
                        <ThemedImage source={require('@/assets/images/flashlight.png')} style={styles.icon} />
                    </TouchableOpacity>
                </ThemedView>
            </CameraView>
        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    flashlightButton: {
        borderRadius: 20,
        position: 'absolute',
        bottom: 10,
        right: 10,
        opacity: 0.7
    },
    icon: {
        resizeMode: 'contain',
        height: 60,
        width: 60,
        margin: 10
    }
})