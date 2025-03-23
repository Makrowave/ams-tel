import showKeyboardAlert from "@/components/alert/KeyboardAlert";
import Scanner from "@/components/Scanner";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import {ModelsQuery, QuerySrc} from "@/constants/QuerySrc";
import {ModelRecordData} from "@/constants/Types";
import {Places, Statuses} from "@/constants/UtilEnums";
import {useActionData} from "@/hooks/contexts/useActionData";
import {useActionResult} from "@/hooks/contexts/useActionResult";
import {useRefreshModel} from "@/hooks/contexts/useRefreshModel";
import {useBikes} from "@/hooks/queryHooks/useBikes";
import {useModelsData} from "@/hooks/queryHooks/useModelsData";
import {usePlacesData} from "@/hooks/queryHooks/usePlacesData";
import {useStatusesData} from "@/hooks/queryHooks/useStatusesData";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {AxiosError} from "axios";
import {Link, Stack, useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {Button, View, StyleSheet, Vibration, TouchableOpacity, ScrollView} from "react-native";
import ActionHeader from "@/components/navigation/ActionsHeader";
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedText} from "@/components/themed/ThemedText";
import {ContentHolderButton, ContentNavButton} from "@/components/buttons/ContentHolderButton";

export default function Move() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [code, setCode] = useState("");
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const {setContextCode, userLocationKey, actionLocationKey, statusKey, initializeValues} = useActionData();
  const {placeData, placeIsPending, placeIsError, placeFindByKey} = usePlacesData();
  const {statusData, statusIsPending, statusIsError, statusFindNameByKey: statusFindByKey} = useStatusesData();
  const {modelFindByEan} = useModelsData(ModelsQuery.all);
  const {selectFirstMatch, bikeRefetch} = useBikes(model?.modelId ?? 0);
  const updateable = useRef<boolean>(true);
  const {setFailure, setSuccess} = useActionResult();

  const [isCodeBound, setIsCodeBound] = useState<boolean>();

  useEffect(() => {
    initializeValues(Statuses.unAssembled, Places.storage1);
  }, []);

  //Blocks next scan for some time and sets values
  const handleScan = (data: string) => {
    if (updateable.current) {
      updateable.current = false;
      setTimeout(() => {
        updateable.current = true;
      }, 800);
    }
    changeCodeAndModel(data);
    Vibration.vibrate();
  };

  const changeCodeAndModel = (data: string) => {
    const foundModel = modelFindByEan(data);
    setCode(data);
    setModel(foundModel);
    if (foundModel === undefined) setIsCodeBound(false);
    else setIsCodeBound(true);
  };

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

  const handleMove = async () => {
    if (code === "") {
      setFailure("Nie zeskanowano roweru");
      return;
    }
    if (userLocationKey === undefined || actionLocationKey === undefined || statusKey === undefined) {
      setFailure("Nie wybrano statusu lub miejsca");
      return;
    }
    await bikeRefetch();

    const bikeId = selectFirstMatch(actionLocationKey, statusKey);
    try {
      if (bikeId === undefined) {
        setFailure("Nie znaleziono roweru");
        return;
      }
      const result = await axiosPrivate.put(
        `${QuerySrc.Bikes}/${bikeId}`,
        JSON.stringify({
          placeId: userLocationKey,
        })
      );
      if (result.status === 200) {
        setSuccess("Przeniesiono rower");
        router.back();
      }
    } catch (err) {
      const error = err as AxiosError;
      setFailure(error.message);
    }
  };
  return (
    <ThemedGestureHandlerRootView>
      <ActionHeader title="Przenieś rower" code={code} isCodeBound={isCodeBound}/>
      <Scanner onBarcodeScanned={handleScan}/>
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
                params: {datastring: JSON.stringify(placeData), selection: "actionLocation"},
              }}
              icon='right-from-bracket'
              style={styles.button}
              title='Z'
              content={placeFindByKey(actionLocationKey)}
              hasChevron
            />
            <ContentNavButton
              href={{
                pathname: "/home/select-screen",
                params: {datastring: JSON.stringify(placeData), selection: "userLocation"},
              }}
              icon='right-to-bracket'
              style={styles.button}
              title='Do'
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
            <TouchableOpacity onPress={() => handleMove()}>
              <ThemedView style={[styles.button, styles.confirmButton]}>
                <ThemedText style={{fontSize: 18}}>
                  Przenieś
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
