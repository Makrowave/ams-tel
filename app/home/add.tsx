import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import Scanner from "@/components/Scanner";
import {useRouter} from "expo-router";
import {usePlacesData} from "@/hooks/queryHooks/usePlacesData";
import {useStatusesData} from "@/hooks/queryHooks/useStatusesData";
import {useModelsData} from "@/hooks/queryHooks/useModelsData";
import {ModelsQuery, QuerySrc} from "@/constants/QuerySrc";
import {Places, Statuses} from "@/constants/UtilEnums";
import {ModelRecordData} from "@/constants/Types";
import {axiosPrivate} from "@/api/axios";
import {Vibration} from "react-native";
import showKeyboardAlert from "@/components/alert/KeyboardAlert";
import {useRefreshModel} from "@/hooks/contexts/useRefreshModel";
import {useActionData} from "@/hooks/contexts/useActionData";
import {useActionResult} from "@/hooks/contexts/useActionResult";
import {AxiosError} from "axios";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import ActionHeader from "@/components/navigation/ActionsHeader";
import {ContentHolderButton, ContentNavButton} from "@/components/buttons/ContentHolderButton";
import {ThemedText} from "@/components/themed/ThemedText";
import {ThemedView} from "@/components/themed/ThemedView";

export default function Add() {
  const {userLocationKey, statusKey, initializeValues} = useActionData();
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const {placeData, placeIsPending, placeIsError, placeFindByKey} = usePlacesData();
  const {setFailure, setSuccess} = useActionResult();
  const {
    statusData,
    statusIsPending,
    statusIsError,
    statusFindNameByKey: statusFindByKey,
  } = useStatusesData([Statuses.sold]);
  const {modelFindByEan, modelRefetch} = useModelsData(ModelsQuery.all);
  const updateable = useRef<boolean>(true);

  const [isCodeBound, setIsCodeBound] = useState<boolean>();

  useEffect(() => {
    initializeValues(Statuses.unAssembled, Places.storage1);
  }, []);

  const {refreshModel, setRefreshModel} = useRefreshModel();

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
      <ActionHeader title="Dodaj rower" code={code} isCodeBound={isCodeBound}/>
      <Scanner onBarcodeScanned={handleScan} style={{flex: 1}}/>
      <View style={styles.wrapper}>
        <ThemedView style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
          <ScrollView>
            <ContentHolderButton
              icon='bicycle'
              title='Rower'
              content={model?.modelName ?? ""}
              placeholder={"Tu pojawi się rower"}
              disabled
            />
            <ContentHolderButton
              icon='barcode'
              style={styles.button}
              title='Kod'
              content={code}
              onPress={() => showKeyboardAlert("Kod", changeCodeAndModel)}
              placeholder={"Kod"}
              hasChevron
            />
            <ContentNavButton
              href={{
                pathname: "/home/select-screen",
                params: {datastring: JSON.stringify(placeData), selection: "userLocation"},
              }}
              icon='shop'
              style={styles.button}
              title='Miejsce'
              content={placeFindByKey(userLocationKey)}
              hasChevron
            />
            <ContentNavButton
              href={{
                pathname: "/home/select-screen",
                params: {datastring: JSON.stringify(statusData), selection: "status"},
              }}
              icon='circle-info'
              style={styles.button}
              title='Status'
              content={statusFindByKey(statusKey)}
              hasChevron
            />
            <TouchableOpacity onPress={() => handleAdd()}>
              <ThemedView style={[styles.button, styles.confirmButton]}>
                <ThemedText style={{fontSize: 18}}>
                  Dodaj
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ScrollView>
        </ThemedView>
      </View>
    </ThemedGestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
  },
  button: {
    borderTopWidth: 1,
  },
  confirmButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: "transparent",
  }
});
