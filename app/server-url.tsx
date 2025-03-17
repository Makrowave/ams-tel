import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedText} from "@/components/themed/ThemedText";
import {StyleSheet} from "react-native";
import {ThemedTextInput} from "@/components/themed/ThemedTextInput";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Stack, useNavigation} from "expo-router";
import {ForwardedButton} from "@/components/LabeledButton";

export default function ServerUrl() {
    const [url, setUrl] = useState<string>("");
    const navigation = useNavigation();
    useEffect(() => {
        AsyncStorage.getItem("apiUrl").then((url) => setUrl(url ?? ""));
    }, [])
    const setUrlInStorage = async () => {
        await AsyncStorage.setItem("apiUrl", url);
    }
    return (
    <ThemedGestureHandlerRootView>

            <Stack.Screen
              options={{
                  title: "Adres aplikacji",
                  headerBackTitle: "Wróć",
              }}
            />
            <ThemedView style={styles.screenWrapper}>
                <ThemedText type="subtitle" style={{marginVertical: 10}}>
                    Wpisz adres aplikacji
                </ThemedText>
                <ThemedView style={styles.inputWrapper}>
                    <ThemedText>Adres</ThemedText>
                    <ThemedTextInput
                        style={styles.input}
                        value={url}
                        onChangeText={(text) => setUrl(text)}
                        placeholder={"https://bikes.org"}
                        onEndEditing={setUrlInStorage}
                    />
                </ThemedView>
                    <ForwardedButton style={{borderWidth: 0.5, borderRadius: 10}} size="small" title="Zatwierdź" type="single" onPress={async () => { await AsyncStorage.setItem("apiUrl", url); navigation.goBack()}}/>
            </ThemedView>
    </ThemedGestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    screenWrapper: {
        height: "100%",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 30
    },
    inputWrapper: {
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 0.5,
        width: "100%",
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderTopWidth: 0.2,
    },
    button: {}
});