import { ProviderNodeProps } from "@/constants/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

interface ActionDataContext {
  userLocationKey?: Number;
  actionLocationKey?: Number;
  price?: Number;
  statusKey?: Number;
  defaultUserLocation?: Number;
  setUserLocationKey: (value: Number) => void;
  setActionLocationKey: (value: Number) => void;
  setPrice: (value: Number) => void;
  setStatusKey: (value: Number) => void;
  initializeValues: (statusKey: Number, actionLocationKey?: Number, price?: Number) => void;
  setDefaultUserLocation: (value: Number | undefined) => void;

  contextCode: string;
  setContextCode: (value: string) => void;
}

export const ActionDataContext = createContext<ActionDataContext | undefined>(undefined);

export function ActionDataProvider({ children }: ProviderNodeProps) {
  const [defaultUserLocation, setDefaultUserLocation] = useState<Number>();
  const [userLocationKey, setUserLocationKey] = useState<Number>();
  const [actionLocationKey, setActionLocationKey] = useState<Number>(4);
  const [price, setPrice] = useState<Number>(3000);
  const [statusKey, setStatusKey] = useState<Number>(2);
  // const [updateModel, setUpdateModel] = useState<ModelRecordData>()
  //code for binding to model if not present
  const [contextCode, setContextCode] = useState<string>("");

  useEffect(() => {
    getDefaultUserLocation().then(() => setUserLocationKey(defaultUserLocation));

  }, []);

  useEffect(() => {
    setDefaultUserLocationInStorage(defaultUserLocation).then(
      () => setUserLocationKey(defaultUserLocation)
    )

  }, [defaultUserLocation]);

  async function getDefaultUserLocation() {
    try {
      const value = await AsyncStorage.getItem("userLocation");
      let parsedValue = Number(value);
      if (value === null) {
        await setDefaultUserLocationInStorage(1);
        parsedValue = 1;
      }
      setDefaultUserLocation(parsedValue);
    } catch (e) {
      console.log(e);
    }
  }

  async function setDefaultUserLocationInStorage(value: Number | undefined) {
    try {
      await AsyncStorage.setItem("userLocation", value!.toString());
    } catch (e) {}
  }

  function initializeValues(statusKey: Number, actionLocationKey?: Number, price?: Number) {
    setUserLocationKey(defaultUserLocation);
    if (actionLocationKey) setActionLocationKey(actionLocationKey);
    setStatusKey(statusKey);
    if (price) setPrice(price);
  }

  return (
    <ActionDataContext.Provider
      value={{
        userLocationKey,
        actionLocationKey,
        price,
        statusKey,
        setUserLocationKey,
        setActionLocationKey,
        setPrice,
        setStatusKey,
        setDefaultUserLocation,
        defaultUserLocation,
        initializeValues,

        contextCode,
        setContextCode,
      }}
    >
      {children}
    </ActionDataContext.Provider>
  );
}
