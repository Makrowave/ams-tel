import ButtonWithInputAlert from "@/components/ButtonWithInputAlert";
import { ForwardedButton } from "@/components/LabeledButton";
import Scanner from "@/components/Scanner";
import { ModelsQuery, QuerySrc } from "@/constants/QuerySrc";
import { ModelRecordData } from "@/constants/Types";
import { Places, Statuses } from "@/constants/UtilEnums";
import { useBikes } from "@/hooks/queryHooks/useBikes";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useActionData } from "@/hooks/useActionData";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Assemble() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [code, setCode] = useState("");
  const { user } = useAuth();
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const { userLocationKey, statusKey, initializeValues } = useActionData();
  const { placeData, placeIsPending, placeIsError, placeFindByKey } = usePlacesData();
  const { statusData, statusIsPending, statusIsError, statusFindByKey } = useStatusesData([
    Statuses.assembled,
    Statuses.sold,
    Statuses.delivery,
    Statuses.prepaid,
  ]);
  const { modelFindByEan } = useModelsData(ModelsQuery.all);
  const { selectFirstMatch, bikeRefetch } = useBikes(model?.modelId ?? 0);
  const updateable = useRef<boolean>(true);

  useEffect(() => {
    initializeValues(Statuses.unAssembled);
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

  const handleAssemble = async () => {
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
        statusId: Statuses.assembled,
        assembledBy: user.employeeKey,
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
          title: "Złóż rower",
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
          text='Rower:'
          hasContent
          content={model?.modelName}
          key={"ModelKey-" + model?.modelId}
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
            text='Status:'
            hasContent
            content={statusFindByKey(statusKey)}
            key={`Status-${statusKey?.toString()}-${statusIsPending}-${statusIsError}`}
          />
        </Link>
        <ForwardedButton style={styles.button} type='footer' text='Złóż' onPress={() => handleAssemble()} />
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
