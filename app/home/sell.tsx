import ButtonWithInputAlert from "@/components/ButtonWithInputAlert";
import { ForwardedButton } from "@/components/LabeledButton";
import Scanner from "@/components/Scanner";
import { ModelsQuery, QuerySrc } from "@/constants/QuerySrc";
import { ModelRecordData } from "@/constants/Types";
import { Statuses } from "@/constants/UtilEnums";
import { useBikes } from "@/hooks/queryHooks/useBikes";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useActionData } from "@/hooks/useActionData";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, View, StyleSheet, Alert, Vibration } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Sell() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [code, setCode] = useState("");
  const [price, setPrice] = useState<string>("");
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const { userLocationKey, statusKey, initializeValues } = useActionData();
  const { placeData, placeIsPending, placeIsError, placeFindByKey } = usePlacesData();
  const { statusData, statusIsPending, statusIsError, statusFindNameByKey: statusFindByKey } = useStatusesData();
  const { modelFindByEan, modelRefetch } = useModelsData(ModelsQuery.all);
  const { selectFirstMatch, bikeRefetch } = useBikes(model?.modelId ?? 0);
  const updateable = useRef<boolean>(true);

  useEffect(() => {
    initializeValues(Statuses.assembled, undefined, undefined);
  }, []);

  //Blocks next scan for some time and sets values
  const handleScan = async (data: string) => {
    if (updateable.current) {
      updateable.current = false;
      setTimeout(() => {
        updateable.current = true;
      }, 800);
      await changeCodeAndModel(data);
      Vibration.vibrate();
    }
  };

  const changeCodeAndModel = async (data: string) => {
    await modelRefetch();
    setCode(data);
    const foundModel = modelFindByEan(data);
    setModel(foundModel);
    setPrice(foundModel?.price.toString() ?? "");
  };

  const handleSell = async () => {
    await bikeRefetch();
    if (userLocationKey === undefined || statusKey === undefined) {
      console.log("No location and status chosen");
      return;
    }
    const bikeId = selectFirstMatch(userLocationKey, statusKey);
    if (bikeId === undefined) {
      console.log("No bike found - implement error handling");
      return;
    }
    const result = await axiosPrivate.put(
      `${QuerySrc.Bikes}/${bikeId}`,
      JSON.stringify({
        statusId: Statuses.sold,
        salePrice: price,
      })
    );
    if (result.status === 200) {
      router.back();
    }
  };

  return (
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          title: "Sprzedaj rower",
          headerBackTitle: "Wróć",
          headerRight: () => <ButtonWithInputAlert onFinishTyping={changeCodeAndModel} title='Kod' />,
          headerLeft: () => (
            <Button
              title='Wróć'
              onPress={() => {
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
          title='Rower:'
          hasContent
          content={model?.modelName}
          key={"Model-" + model?.modelId}
          disabled
        />
        <ForwardedButton style={styles.button} title='Kod:' hasContent content={code} key={code} disabled />
        <Link
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeData), selection: "userLocation" },
          }}
          asChild
        >
          <ForwardedButton
            style={styles.button}
            title='Miejsce:'
            hasContent
            content={placeFindByKey(userLocationKey)}
            key={`Place-${userLocationKey?.toString()}-${placeIsError}-${placeIsPending}`}
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
            title='Status:'
            hasContent
            content={statusFindByKey(statusKey)}
            key={`Status-${statusKey?.toString()}-${statusIsPending}-${statusIsError}`}
          />
        </Link>
        <ForwardedButton
          style={styles.button}
          title='Cena:'
          hasContent
          content={price}
          key={"Price-" + price}
          onPress={() =>
            Alert.prompt("Cena", "", [
              { text: "Anuluj" },
              { text: "Zatwierdź", onPress: (value) => setPrice(value ?? "") },
            ])
          }
          hasChevron
        />
        <ForwardedButton style={styles.button} type='footer' title='Sprzedaj' onPress={() => handleSell()} />
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
