import showKeyboardAlert from "@/components/alert/KeyboardAlert";
import Scanner from "@/components/Scanner";
import {ModelsQuery, QuerySrc} from "@/constants/QuerySrc";
import {ModelRecordData} from "@/constants/Types";
import {Statuses} from "@/constants/UtilEnums";
import {useBikes} from "@/hooks/queryHooks/useBikes";
import {useModelsData} from "@/hooks/queryHooks/useModelsData";
import {usePlacesData} from "@/hooks/queryHooks/usePlacesData";
import {useStatusesData} from "@/hooks/queryHooks/useStatusesData";
import useAuth from "@/hooks/contexts/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {View, StyleSheet, Vibration, TouchableOpacity, ScrollView} from "react-native";
import {useActionData} from "@/hooks/contexts/useActionData";
import {useRefreshModel} from "@/hooks/contexts/useRefreshModel";
import {useActionResult} from "@/hooks/contexts/useActionResult";
import {AxiosError} from "axios";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import ActionHeader from "@/components/navigation/ActionsHeader";
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedText} from "@/components/themed/ThemedText";
import {ContentHolderButton, ContentNavButton} from "@/components/buttons/ContentHolderButton";

export default function Assemble() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [code, setCode] = useState("");
  const {user} = useAuth();
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const {setContextCode, userLocationKey, statusKey, initializeValues} = useActionData();
  const {placeData, placeIsPending, placeIsError, placeFindByKey} = usePlacesData();
  const {
    statusData,
    statusIsPending,
    statusIsError,
    statusFindNameByKey: statusFindByKey,
  } = useStatusesData([Statuses.assembled, Statuses.sold, Statuses.delivery, Statuses.prepaid]);
  const {modelFindByEan} = useModelsData(ModelsQuery.all);
  const {selectFirstMatch, bikeRefetch} = useBikes(model?.modelId ?? 0);
  const updateable = useRef<boolean>(true);
  const [isCodeBound, setIsCodeBound] = useState<boolean>();
  const {setFailure, setSuccess} = useActionResult();

  useEffect(() => {
    initializeValues(Statuses.unAssembled);
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

  const handleAssemble = async () => {
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
          statusId: Statuses.assembled,
          assembledBy: user.employeeKey,
        })
      );
      if (result.status === 200) {
        setSuccess("Złożono rower");
        router.back();
      }
    } catch (err) {
      const error = err as AxiosError;
      setFailure(error.message);
    }
  };

  return (
    <ThemedGestureHandlerRootView>
      <ActionHeader title="Złóż rower" code={code} isCodeBound={isCodeBound}/>
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
            <TouchableOpacity onPress={() => handleAssemble()}>
              <ThemedView style={[styles.button, styles.confirmButton]}>
                <ThemedText style={{fontSize: 18}}>
                  Złóż
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
