import showKeyboardAlert from "@/components/alert/KeyboardAlert";
import { ForwardedButton } from "@/components/LabeledButton";
import LinkButton from "@/components/LinkButton";
import Scanner from "@/components/Scanner";
import { ThemedGestureHandlerRootView } from "@/components/themed/ThemedGestureHandlerRootView";
import { ModelsQuery, QuerySrc } from "@/constants/QuerySrc";
import { ModelRecordData } from "@/constants/Types";
import { Statuses } from "@/constants/UtilEnums";
import { useActionData } from "@/hooks/contexts/useActionData";
import { useActionResult } from "@/hooks/contexts/useActionResult";
import { useRefreshModel } from "@/hooks/contexts/useRefreshModel";
import { useBikes } from "@/hooks/queryHooks/useBikes";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, View, StyleSheet, Alert, Vibration } from "react-native";

export default function Sell() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [code, setCode] = useState("");
  const [price, setPrice] = useState<string>("");
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const { setContextCode, userLocationKey, statusKey, initializeValues } = useActionData();
  const { placeData, placeIsPending, placeIsError, placeFindByKey } = usePlacesData();
  const { statusData, statusIsPending, statusIsError, statusFindNameByKey: statusFindByKey } = useStatusesData();
  const { modelFindByEan, modelRefetch } = useModelsData(ModelsQuery.all);
  const { selectFirstMatch, bikeRefetch } = useBikes(model?.modelId ?? 0);
  const updateable = useRef<boolean>(true);
  const { setFailure, setSuccess } = useActionResult();
  const [isCodeBound, setIsCodeBound] = useState<boolean | undefined>();

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
    if (foundModel === undefined) {
      setIsCodeBound(false);
    } else {
      setIsCodeBound(true);
    }
    setModel(foundModel);
    setPrice(foundModel?.price.toString() ?? "");
  };

  const { refreshModel, setRefreshModel } = useRefreshModel();

  const refreshOnBind = () => {
    if (refreshModel) {
      const foundModel = modelFindByEan(code);
      if (foundModel === undefined) setIsCodeBound(false);
      else setIsCodeBound(true);
      setModel(foundModel);
      setRefreshModel(false);
    }
  };
  useEffect(() => {
    refreshOnBind();
  }, [refreshModel]);

  const handleSell = async () => {
    if (code === "") {
      setFailure("Nie zeskanowano roweru");
      return;
    }
    if (userLocationKey === undefined || statusKey === undefined) {
      setFailure("Nie wybrano statusu lub miejsca");
      return;
    }
    await bikeRefetch();
    const bikeId = selectFirstMatch(userLocationKey, statusKey);
    if (bikeId === undefined) {
      setFailure("Nie znaleziono roweru");
      return;
    }
    try {
      const result = await axiosPrivate.put(
        `${QuerySrc.Bikes}/${bikeId}`,
        JSON.stringify({
          statusId: Statuses.sold,
          salePrice: price,
        })
      );
      if (result.status === 200) {
        setSuccess("Sprzedano rower");
        router.back();
      }
    } catch (err) {
      const error = err as AxiosError;
      setFailure(error.message);
    }
  };

  return (
    <ThemedGestureHandlerRootView>
      <Stack.Screen
        options={{
          title: "Sprzedaj rower",
          headerBackTitle: "Wróć",
          headerRight: () => (
            //Forward ref error, although it works
            <Link
              href={{
                pathname: "/home/search",
                params: { ean: code },
              }}
              asChild
            >
              <Button
                title='Przypisz'
                disabled={isCodeBound === undefined ? true : isCodeBound}
                onPress={() => setContextCode(code)}
              />
            </Link>
          ),
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
        <ForwardedButton
          style={styles.button}
          title='Kod:'
          hasContent
          content={code}
          key={code}
          hasChevron
          onPress={() => showKeyboardAlert("Kod", changeCodeAndModel)}
        />
        <LinkButton
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeData), selection: "userLocation" },
          }}
          style={styles.button}
          title='Miejsce:'
          hasContent
          content={placeFindByKey(userLocationKey)}
          key={`Place-${userLocationKey?.toString()}-${placeIsError}-${placeIsPending}`}
          hasChevron
        />
        <LinkButton
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(statusData), selection: "status" },
          }}
          style={styles.button}
          title='Status:'
          hasContent
          content={statusFindByKey(statusKey)}
          key={`Status-${statusKey?.toString()}-${statusIsPending}-${statusIsError}`}
          hasChevron
        />
        <ForwardedButton
          style={styles.button}
          title='Cena:'
          hasContent
          content={price}
          key={"Price-" + price}
          onPress={() => showKeyboardAlert("Cena", setPrice, "numeric")}
          hasChevron
        />
        <ForwardedButton style={styles.button} type='footer' title='Sprzedaj' onPress={() => handleSell()} />
      </View>
    </ThemedGestureHandlerRootView>
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
