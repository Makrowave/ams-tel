import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import Scanner from "@/components/Scanner";
import ButtonLabel from "@/components/ButtonLabel";


export default function Add() {
  const [code, setCode] = useState('');
  const [bike, setBike] = useState('Esker 8.0 L pom_zie_czer'); //debug value
  const [place, setPlace] = useState(); //Changeable
  const [statuses, setStatuses] = useState(); //Fetched
  function handleScan(data: string) {
    setCode(data);
  }

  return (
    <GestureHandlerRootView>
      <Scanner onBarcodeScanned={handleScan} />
      <View style={styles.wrapper}>
        <Text>{code}</Text>
        <Text>{bike}</Text>
      </View>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
})