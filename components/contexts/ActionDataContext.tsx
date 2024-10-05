import { createContext, ReactNode, useEffect, useState } from "react";

interface ActionDataContextProps {
    userLocationKey?: Number,
    actionLocationKey?: Number,
    price?: Number,
    statusKey?: Number,
    setUserLocationKey: (value: Number) => void;
    setActionLocationKey: (value: Number) => void;
    setPrice: (value: Number) => void;
    setStatusKey: (value: Number) => void;
    placeList: {key: Number, value: string}[];
    resetActionData: () => void;
}

export const ActionDataContext = createContext<ActionDataContextProps | undefined >(undefined);

type ActionDataProviderProps = {
    children: ReactNode;
}

export function ActionDataProvider({children} : ActionDataProviderProps) {
    const [userLocationKey, setUserLocationKey] = useState<Number>(1);
    const [actionLocationKey, setActionLocationKey] = useState<Number>(4);
    const [price, setPrice] = useState<Number>();
    const [statusKey, setStatusKey] = useState<Number>();
    const placeList = [
        {key: 1, value: 'Wojciechowska'},
        {key: 2, value: 'Gala'},
        {key: 3, value: 'Gęsia'},
        {key: 4, value: 'Magazyn A'},
        {key: 5, value: 'Magazyn B'},
        {key: 6, value: 'Magazyn D'},
    ]
    
    function resetActionData() {
        setUserLocationKey(1);
        setActionLocationKey(4);
        setPrice(undefined);
        setStatusKey(undefined);
    }

    return (
        <ActionDataContext.Provider value={{
            userLocationKey,
            actionLocationKey,
            price,
            statusKey,
            setUserLocationKey,
            setActionLocationKey,
            setPrice,
            setStatusKey,
            placeList,
            resetActionData,
        }}>
            {children}
        </ActionDataContext.Provider>
    )
}