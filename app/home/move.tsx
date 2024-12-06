import { ForwardedButton } from "@/components/LabeledButton";
import Scanner from "@/components/Scanner";
import { ModelsQuery } from "@/constants/QuerySrc";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useActionData } from "@/hooks/useActionData";
import { Link, Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Move() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [bike, setBike] = useState<string>("");
  //Without this - either bike label duplicates itself or it doesn't refresh
  const [bikeKey, setBikeKey] = useState<string>("bikeKey");
  const { userLocationKey, actionLocationKey, statusKey, resetActionData } = useActionData();
  const { placeData, placeFindByKey } = usePlacesData();
  const { statusData, statusFindByKey } = useStatusesData(); //Fetched
  const { modelFindByEan } = useModelsData(ModelsQuery.all);
  const updateable = useRef<boolean>(true);

  //Blocks next scan for some time and sets values
  const handleScan = (data: string) => {
    if (updateable.current) {
      updateable.current = false;
      setTimeout(() => {
        updateable.current = true;
      }, 800);
      //Set scan barcode
      setCode(data);
      //Find model - if it exists update bike name and key
      const model = modelFindByEan(data);
      if (model !== undefined) {
        setBike(model.modelName);
        setBikeKey(model.modelId.toString());
      }
    }
  };
  return (
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          title: "Przenieś rower",
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
        <ForwardedButton
          style={styles.button}
          type='header'
          text='Rower:'
          hasContent
          content={bike}
          key={bikeKey}
          disabled
        />
        <ForwardedButton style={styles.button} text='Kod:' hasContent content={code} key={code} disabled />
        <Link
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeData), selection: "actionLocation" },
          }}
          asChild
        >
          <ForwardedButton
            style={styles.button}
            text='Z:'
            hasContent
            content={placeFindByKey(actionLocationKey)}
            key={actionLocationKey?.toString()}
          />
        </Link>
        <Link
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeData), selection: "userLocation" },
          }}
          asChild
        >
          <ForwardedButton
            style={styles.button}
            text='Do:'
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
        <ForwardedButton style={styles.button} type='footer' text='Przenieś' />
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
