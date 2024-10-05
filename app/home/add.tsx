import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Scanner from "@/components/Scanner";
import { ThemedView } from "@/components/ThemedView";
import { Link, Stack, useRouter } from "expo-router";
import Label from "@/components/Label";
import ButtonLabel from "@/components/ButtonLabel";
import { useActionData } from "@/hooks/useActionData";


export default function Add() {
  const {
    userLocationKey,
    statusKey,
    placeList,
    resetActionData,
  } = useActionData();

  const router = useRouter();
  const [code, setCode] = useState('');
  const [bike, setBike] = useState('Esker 8.0 L pom_zie_czer'); //debug value
  const statuses = [
    { key: 1, value: "Niezłozony" },
    { key: 2, value: "Złozony" },
    { key: 4, value: "Zadatek" },
    { key: 5, value: "Reklamacja" },
    { key: 6, value: "Do wysyłki" }
  ]; //Fetched
  function handleScan(data: string) {
    setCode(data);
  }
  return (
    <GestureHandlerRootView>
      <Stack.Screen name=""
            options={{
              title: "Dodaj rower", headerBackTitle: "Wróć",
              headerRight: () => <Button title="Wpisz kod" />,
              headerLeft: () => <Button title="Wróć" onPress={
                () => { resetActionData(); router.back() }
              } />
            }}
          />
      <Scanner onBarcodeScanned={handleScan} />
      <View style={styles.wrapper}>
        {/*<Label title="Rower:" hasContent content={bike} type="header"/>
        <Label title="Kod:" hasContent content={code} />*/}
        <ButtonLabel style={{height: 60}} type="header" text="Rower:" hasContent content={bike}/>
        <ButtonLabel style={{height: 60}} text="Kod:" hasContent content={code} key={code} />
        <Link href={{
          pathname: '/home/select-screen',
          params: { datastring: JSON.stringify(placeList), selection: 'userLocation' }
        }}
        asChild>
          <ButtonLabel style={{height: 60}} text="Miejsce:" hasContent
            content={placeList.find(item => item.key === userLocationKey)?.value} key={userLocationKey?.toString()} />
        </Link>
        <Link href={{
          pathname: '/home/select-screen',
          params: { datastring: JSON.stringify(statuses), selection: 'status' }
        }} asChild>
          <ButtonLabel style={{height: 60}} text="Status:" hasContent
            content={statuses.find(item => item.key === statusKey)?.value} key={statusKey?.toString()} />
        </Link>
        <ButtonLabel style={{height: 60}} type="footer" text="Dodaj" />
      </View>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: '2%',
    marginTop: 10
  },
})