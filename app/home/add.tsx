import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, StyleSheet, Text } from "react-native";
import { useState } from "react";
import Scanner from "@/components/Scanner";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";


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
      <Stack.Screen
          options={{ title: "Dodaj rower", headerBackTitle: "Wróć", 
            headerRight: () => <Button title="Wpisz kod"/>
          }} 
        />
      <Scanner onBarcodeScanned={handleScan} />
      <ThemedView style={styles.wrapper}>
        <Text>{code}</Text>
        <Text>{bike}</Text>
      </ThemedView>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})