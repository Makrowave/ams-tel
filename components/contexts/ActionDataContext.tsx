import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ActionDataContextProps {
  userLocationKey?: Number;
  actionLocationKey?: Number;
  price?: Number;
  statusKey?: Number;
  defaultUserLocation?: Number;
  setUserLocationKey: (value: Number) => void;
  setActionLocationKey: (value: Number) => void;
  setPrice: (value: Number) => void;
  setStatusKey: (value: Number) => void;
  resetActionData: () => void;
  setDefaultUserLocation: (value: Number | undefined) => void;
}

export const ActionDataContext = createContext<ActionDataContextProps | undefined>(undefined);

type ActionDataProviderProps = {
  children: ReactNode;
};

export function ActionDataProvider({ children }: ActionDataProviderProps) {
  const [defaultUserLocation, setDefaultUserLocation] = useState<Number>();
  const [userLocationKey, setUserLocationKey] = useState<Number>();
  const [actionLocationKey, setActionLocationKey] = useState<Number>(4);
  const [price, setPrice] = useState<Number>(3000);
  const [statusKey, setStatusKey] = useState<Number>(2);
  useEffect(() => {
    getDefaultUserLocation();
    setUserLocationKey(defaultUserLocation);
  }, []);

  useEffect(() => {
    setDefaultUserLocationInStorage(defaultUserLocation);
    setUserLocationKey(defaultUserLocation);
  }, [defaultUserLocation]);

  async function getDefaultUserLocation() {
    try {
      const value = await AsyncStorage.getItem("userLocation");
      let parsedValue = Number(value);
      if (value === null) {
        setDefaultUserLocationInStorage(1);
        parsedValue = 1;
      }
      setDefaultUserLocation(parsedValue);
    } catch (e) {
      console.log(e);
    }
  }

  async function setDefaultUserLocationInStorage(value: Number | undefined) {
    try {
      AsyncStorage.setItem("userLocation", value!.toString());
    } catch (e) {}
  }

  function resetActionData() {
    setUserLocationKey(defaultUserLocation);
    setActionLocationKey(4);
    setPrice(3000);
    setStatusKey(2);
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
        resetActionData,
        setDefaultUserLocation,
        defaultUserLocation,
      }}
    >
      {children}
    </ActionDataContext.Provider>
  );
}
