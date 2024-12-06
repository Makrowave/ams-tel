import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, StyleSheet, View } from "react-native";
import { useRef, useState } from "react";
import Scanner from "@/components/Scanner";
import { Link, Stack, useRouter } from "expo-router";
import { ForwardedButton } from "@/components/LabeledButton";
import { useActionData } from "@/hooks/useActionData";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { ModelsQuery } from "@/constants/QuerySrc";
import { useMutation } from "@tanstack/react-query";
import { Statuses } from "@/constants/UtilEnums";

export default function Add() {
  const { userLocationKey, statusKey, resetActionData } = useActionData();
  const { placeData, placeFindByKey } = usePlacesData();
  const router = useRouter();

  const [code, setCode] = useState<string>("");
  const [bike, setBike] = useState<string>("");
  //Without this - either bike label duplicates itself or it doesn't refresh
  const [bikeKey, setBikeKey] = useState<string>("bikeKey");
  const { statusData, statusFindByKey } = useStatusesData([Statuses.sold]);
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
          title: "Dodaj rower",
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
          text='Rower:'
          hasContent
          content={bike}
          key={bikeKey}
          type='header'
          disabled
        />
        <ForwardedButton style={styles.button} text='Kod:' hasContent content={code} key={code} disabled />
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
            hasChevron
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
            hasChevron
          />
        </Link>
        <ForwardedButton style={styles.button} type='footer' text='Dodaj' />
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
