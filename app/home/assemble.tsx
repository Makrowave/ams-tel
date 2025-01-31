import showKeyboardAlert from "@/components/alert/KeyboardAlert";
import { ForwardedButton } from "@/components/LabeledButton";
import LinkButton from "@/components/LinkButton";
import Scanner from "@/components/Scanner";
import { ModelsQuery, QuerySrc } from "@/constants/QuerySrc";
import { ModelRecordData } from "@/constants/Types";
import { Places, Statuses } from "@/constants/UtilEnums";
import { useBikes } from "@/hooks/queryHooks/useBikes";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import useAuth from "@/hooks/contexts/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, View, StyleSheet, Vibration } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useActionData } from "@/hooks/contexts/useActionData";
import { useRefreshModel } from "@/hooks/contexts/useRefreshModel";
import { useActionResult } from "@/hooks/contexts/useActionResult";
import { AxiosError } from "axios";

export default function Assemble() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [code, setCode] = useState("");
  const { user } = useAuth();
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const { setContextCode, userLocationKey, statusKey, initializeValues } = useActionData();
  const { placeData, placeIsPending, placeIsError, placeFindByKey } = usePlacesData();
  const {
    statusData,
    statusIsPending,
    statusIsError,
    statusFindNameByKey: statusFindByKey,
  } = useStatusesData([Statuses.assembled, Statuses.sold, Statuses.delivery, Statuses.prepaid]);
  const { modelFindByEan } = useModelsData(ModelsQuery.all);
  const { selectFirstMatch, bikeRefetch } = useBikes(model?.modelId ?? 0);
  const updateable = useRef<boolean>(true);
  const [isCodeBound, setIsCodeBound] = useState<boolean>();
  const { setFailure, setSuccess } = useActionResult();

  useEffect(() => {
    initializeValues(Statuses.unAssembled);
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
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          title: "Złóż rower",
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
          type='header'
          title='Rower:'
          hasContent
          content={model?.modelName}
          key={"ModelKey-" + model?.modelId}
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
        <ForwardedButton style={styles.button} type='footer' title='Złóż' onPress={() => handleAssemble()} />
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
