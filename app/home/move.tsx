import showKeyboardAlert from "@/components/alert/KeyboardAlert";
import { ForwardedButton } from "@/components/LabeledButton";
import LinkButton from "@/components/LinkButton";
import Scanner from "@/components/Scanner";
import { ModelsQuery, QuerySrc } from "@/constants/QuerySrc";
import { ModelRecordData } from "@/constants/Types";
import { Places, Statuses } from "@/constants/UtilEnums";
import { useActionData } from "@/hooks/contexts/useActionData";
import { useRefreshModel } from "@/hooks/contexts/useRefreshModel";
import { useBikes } from "@/hooks/queryHooks/useBikes";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, View, StyleSheet, Vibration } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Move() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [code, setCode] = useState("");
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const { setContextCode, userLocationKey, actionLocationKey, statusKey, initializeValues } = useActionData();
  const { placeData, placeIsPending, placeIsError, placeFindByKey } = usePlacesData();
  const { statusData, statusIsPending, statusIsError, statusFindNameByKey: statusFindByKey } = useStatusesData();
  const { modelFindByEan } = useModelsData(ModelsQuery.all);
  const { selectFirstMatch, bikeRefetch } = useBikes(model?.modelId ?? 0);
  const updateable = useRef<boolean>(true);

  const [isCodeBound, setIsCodeBound] = useState<boolean>(false);

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

  const handleMove = async () => {
    await bikeRefetch();
    if (userLocationKey === undefined || actionLocationKey === undefined || statusKey === undefined) {
      console.log("No locations and status chosen");
      return;
    }
    const bikeId = selectFirstMatch(actionLocationKey, statusKey);
    if (bikeId === undefined) {
      console.log("No bike found - implement error handling");
      return;
    }
    const result = await axiosPrivate.put(
      `${QuerySrc.Bikes}/${bikeId}`,
      JSON.stringify({
        placeId: userLocationKey,
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
          title: "Przenieś rower",
          headerBackTitle: "Wróć",
          headerRight: () => (
            <Link
              href={{
                pathname: "/home/search",
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
          onPress={() => showKeyboardAlert("Kod", changeCodeAndModel)}
        />
        <LinkButton
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeData), selection: "actionLocation" },
          }}
          style={styles.button}
          title='Z:'
          hasContent
          content={placeFindByKey(actionLocationKey)}
          key={`Place-${actionLocationKey?.toString()}-${placeIsError}-${placeIsPending}`}
          hasChevron
        />
        <LinkButton
          href={{
            pathname: "/home/select-screen",
            params: { datastring: JSON.stringify(placeData), selection: "userLocation" },
          }}
          style={styles.button}
          title='Do:'
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
        <ForwardedButton style={styles.button} type='footer' title='Przenieś' onPress={() => handleMove()} />
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
