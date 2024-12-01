import { ForwardedButton } from "@/components/LabeledButton";
import Scanner from "@/components/Scanner";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useActionData } from "@/hooks/useActionData";
import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Sell() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [bike, setBike] = useState("Esker 8.0 L pom_zie_czer"); //debug value
  const { userLocationKey, statusKey, price, resetActionData } = useActionData();
  const { placeData, placeFindByKey } = usePlacesData();
  const { statusData, statusFindByKey } = useStatusesData(); //Fetched
  function handleScan(data: string) {
    setCode(data);
  }
  return (
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          title: "Sprzedaj rower",
          headerBackTitle: "Wróć",
          headerRight: () => <Button title='Wpisz kod' />,
          headerLeft: () => (
            <Button
              title='Wróć'
              onPress={() => {
                resetActionData();
                router.back();
              }}
            />
          ),
        }}
      />
      <Scanner onBarcodeScanned={handleScan} />
      <View style={styles.wrapper}>
        {/*<Label title="Rower:" hasContent content={bike} type="header"/>
        <Label title="Kod:" hasContent content={code} />*/}
        <ForwardedButton style={styles.button} type='header' text='Rower:' hasContent content={bike} />
        <ForwardedButton style={styles.button} text='Kod:' hasContent content={code} key={code} />
        <Link
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeData), selection: "userLocation" },
          }}
          asChild
        >
          <ForwardedButton
            style={styles.button}
            text='Miejsce:'
            hasContent
            content={placeFindByKey(userLocationKey)}
            key={userLocationKey?.toString()}
          />
        </Link>
        <Link
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(statusData), selection: "status" },
          }}
          asChild
        >
          <ForwardedButton
            style={styles.button}
            text='Status:'
            hasContent
            content={statusFindByKey(statusKey)}
            key={statusKey?.toString()}
          />
        </Link>
        <ForwardedButton style={styles.button} text='Cena:' hasContent content={price?.toString()} />
        <ForwardedButton style={styles.button} type='footer' text='Sprzedaj' />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: "2%",
    marginTop: 10,
  },
  button: {
    height: 60,
  },
});
