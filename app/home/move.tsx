import ButtonLabel from "@/components/ButtonLabel";
import Scanner from "@/components/Scanner";
import { useActionData } from "@/hooks/useActionData";
import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";



export default function Move() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [bike, setBike] = useState('Esker 8.0 L pom_zie_czer'); //debug value
  const {
    userLocationKey,
    actionLocationKey,
    statusKey,
    placeList,
    resetActionData,
  } = useActionData();

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
          title: "Przenieś rower", headerBackTitle: "Wróć",
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
        <ButtonLabel style={styles.button} type="header" text="Rower:" hasContent content={bike} />
        <ButtonLabel style={styles.button} text="Kod:" hasContent content={code} key={code} />
        <Link href={{
          pathname: '/home/select-screen',
          params: { datastring: JSON.stringify(placeList), selection: 'actionLocation' }
        }}
          asChild>
          <ButtonLabel style={styles.button} text="Z:" hasContent
            content={placeList.find(item => item.key === actionLocationKey)?.value} key={actionLocationKey?.toString()} />
        </Link>
        <Link href={{
          pathname: '/home/select-screen',
          params: { datastring: JSON.stringify(placeList), selection: 'userLocation' }
        }}
          asChild>
          <ButtonLabel style={styles.button} text="Do:" hasContent
            content={placeList.find(item => item.key === userLocationKey)?.value} key={userLocationKey?.toString()} />
        </Link>
        <Link href={{
          pathname: '/home/select-screen',
          params: { datastring: JSON.stringify(statuses), selection: 'status' }
        }} asChild>
          <ButtonLabel style={styles.button} text="Status:" hasContent
            content={statuses.find(item => item.key === statusKey)?.value} key={statusKey?.toString()} />
        </Link>
        <ButtonLabel style={styles.button} type="footer" text="Przenieś" />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: '2%',
    marginTop: 10,
  },
  button: {
    height: 60,
  },
})