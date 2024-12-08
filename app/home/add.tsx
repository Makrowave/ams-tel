import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import Scanner from "@/components/Scanner";
import { Link, Stack, useRouter } from "expo-router";
import { ForwardedButton } from "@/components/LabeledButton";
import { useActionData } from "@/hooks/useActionData";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { ModelsQuery, QuerySrc } from "@/constants/QuerySrc";
import { Places, Statuses } from "@/constants/UtilEnums";
import { ModelRecordData } from "@/constants/Types";
import { axiosPrivate } from "@/api/axios";
import ButtonWithInputAlert from "@/components/ButtonWithInputAlert";

export default function Add() {
  const { userLocationKey, statusKey, initializeValues } = useActionData();
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const { placeData, placeIsPending, placeIsError, placeFindByKey } = usePlacesData();
  const { statusData, statusIsPending, statusIsError, statusFindByKey } = useStatusesData([Statuses.sold]);
  const { modelFindByEan } = useModelsData(ModelsQuery.all);
  const updateable = useRef<boolean>(true);

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

      changeCodeAndModel(data);
    }
  };

  const changeCodeAndModel = (data: string) => {
    setCode(data);
    setModel(modelFindByEan(data));
  };
  const handleAdd = async () => {
    if (model !== undefined && userLocationKey !== undefined && statusKey !== undefined) {
      const result = await axiosPrivate.post(
        QuerySrc.Bikes,
        JSON.stringify({
          modelId: model?.modelId,
          placeId: userLocationKey,
          statusId: statusKey,
        })
      );
      if (result.status === 200) {
        router.back();
      }
    } else {
      console.log(model?.modelId + " " + userLocationKey + " " + statusKey);
    }
  };

  return (
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          title: "Dodaj rower",
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
          title='Rower:'
          hasContent
          content={model?.modelName}
          key={"ModelKey-" + model?.modelId}
          type='header'
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
            title='Status:'
            hasContent
            content={statusFindByKey(statusKey)}
            key={`Status-${statusKey?.toString()}-${statusIsPending}-${statusIsError}`}
            hasChevron
          />
        </Link>
        <ForwardedButton style={styles.button} type='footer' title='Dodaj' onPress={() => handleAdd()} />
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
