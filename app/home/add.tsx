import { Button, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import Scanner from "@/components/Scanner";
import { Link, Stack, useRouter } from "expo-router";
import { ForwardedButton } from "@/components/LabeledButton";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { ModelsQuery, QuerySrc } from "@/constants/QuerySrc";
import { Places, Statuses } from "@/constants/UtilEnums";
import { ModelRecordData } from "@/constants/Types";
import { axiosPrivate } from "@/api/axios";
import { Vibration } from "react-native";
import showKeyboardAlert from "@/components/alert/KeyboardAlert";
import LinkButton from "@/components/LinkButton";
import { useRefreshModel } from "@/hooks/contexts/useRefreshModel";
import { useActionData } from "@/hooks/contexts/useActionData";
import { useActionResult } from "@/hooks/contexts/useActionResult";
import { AxiosError } from "axios";
import { ThemedGestureHandlerRootView } from "@/components/themed/ThemedGestureHandlerRootView";

export default function Add() {
  const { setContextCode, userLocationKey, statusKey, initializeValues } = useActionData();
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const { placeData, placeIsPending, placeIsError, placeFindByKey } = usePlacesData();
  const { setFailure, setSuccess } = useActionResult();
  const {
    statusData,
    statusIsPending,
    statusIsError,
    statusFindNameByKey: statusFindByKey,
  } = useStatusesData([Statuses.sold]);
  const { modelFindByEan, modelRefetch } = useModelsData(ModelsQuery.all);
  const updateable = useRef<boolean>(true);

  const [isCodeBound, setIsCodeBound] = useState<boolean>();

  useEffect(() => {
    initializeValues(Statuses.unAssembled, Places.storage1);
  }, []);

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

  //Blocks next scan for some time and sets values
  const handleScan = (data: string) => {
    if (updateable.current) {
      updateable.current = false;
      setTimeout(() => {
        updateable.current = true;
      }, 800);

      changeCodeAndModel(data);
      Vibration.vibrate();
    }
  };

  const changeCodeAndModel = (data: string) => {
    const foundModel = modelFindByEan(data);
    if (foundModel === undefined) setIsCodeBound(false);
    else setIsCodeBound(true);

    setModel(foundModel);
    setCode(data);
  };
  const handleAdd = async () => {
    if (userLocationKey === undefined || statusKey === undefined) {
      setFailure("Nie wybrano statusu lub miejsca");
      return;
    }
    if (model === undefined) {
      setFailure("Nie znaleziono modelu");
      return;
    }
    try {
      const result = await axiosPrivate.post(
        QuerySrc.Bikes,
        JSON.stringify({
          modelId: model?.modelId,
          placeId: userLocationKey,
          statusId: statusKey,
        })
      );
      if (result.status === 200) {
        setSuccess("Dodano rower");
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
          title: "Dodaj rower",
          headerBackTitle: "Wróć",
          headerRight: () => (
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
          title='Rower:'
          hasContent
          content={model?.modelName}
          key={"ModelKey-" + model?.modelId}
          type='header'
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
        <ForwardedButton style={styles.button} type='footer' title='Dodaj' onPress={() => handleAdd()} />
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
