import { useConstantsContext } from "@/hooks/useConstants";
import { useState } from "react"
import { ThemedView } from "../ThemedView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedText } from "../ThemedText";
import { StyleSheet } from "react-native";


export function Header() {
    const [selectedPlace, setSelectedPlace] = useState(0);
    const { placeList } = useConstantsContext()

    function generateButtons() {
        
    }


    return (
        <ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 4,
    },
})