import { createContext, ReactNode } from "react";

interface ConstantsContextProps {
    placeList: { key: Number, value: string }[];
}


export const ConstantsContext = createContext<ConstantsContextProps | undefined>(undefined)

type ConstantsProviderProps = {
    children: ReactNode,
}

export function ConstantsContextProvider({children}: ConstantsProviderProps) {
    const placeList = [
        { key: 1, value: 'Wojciechowska' },
        { key: 2, value: 'Gala' },
        { key: 3, value: 'Gęsia' },
        { key: 4, value: 'Magazyn A' },
        { key: 5, value: 'Magazyn B' },
        { key: 6, value: 'Magazyn D' },
    ]

    return (
        <ConstantsContext.Provider value={{placeList}}>
            {children}
        </ConstantsContext.Provider>
    )
}