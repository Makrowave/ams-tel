import SelectableForwardedButton from "@/components/RadioGroup";
import { useActionData } from "@/hooks/useActionData";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SelectScreen() {

    const {
        userLocationKey,
        actionLocationKey,
        price,
        statusKey,
        defaultUserLocation,
        setUserLocationKey,
        setActionLocationKey,
        setPrice,
        setStatusKey,
        setDefaultUserLocation,
    } = useActionData();

    const onSelect = () => {
        switch(selection) {
            case 'userLocation': return setUserLocationKey;
            case 'actionLocation': return setActionLocationKey;
            case 'price': return setPrice;
            case 'status': return setStatusKey;
            case 'defaultUserLocation': return setDefaultUserLocation;

            default: return () => {}
        }
    }

    const defaultSelection = () => {
        switch(selection) {
            case 'userLocation': return userLocationKey;
            case 'actionLocation': return actionLocationKey;
            case 'price': return price;
            case 'status': return statusKey;
            case 'defaultUserLocation': return defaultUserLocation;
            default: return undefined;
        }
    }

    const { datastring, selection } = useLocalSearchParams<{datastring: string, selection: string}>();
    const optionsList = datastring ? JSON.parse(datastring) : [];
    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <SelectableForwardedButton data={optionsList} 
                onSelect={onSelect()}
                selection={defaultSelection()}
                />
            </SafeAreaView>
        </GestureHandlerRootView>

    )
}