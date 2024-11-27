import {FilterContextProvider } from "@/components/contexts/FilterContext";
import { ForwardedButton } from "@/components/LabeledButton";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SearchScreen() {
    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{ flex: 1 }}>
                <Link href='/search/filter-menu' asChild>
                    <ForwardedButton text="Wyszukaj" type='single' hasChevron
                        hasIcon source={require('@/assets/images/search.png')}
                    />
                </Link>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}