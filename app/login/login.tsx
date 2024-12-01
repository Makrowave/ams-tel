import axios from "@/api/axios";
import { ForwardedButton } from "@/components/LabeledButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useEnableQueries } from "@/hooks/queryHooks/useEnableQueries";
import useAuth from "@/hooks/useAuth";
import useRefreshUser from "@/hooks/useRefreshUser";
import { AxiosError, isAxiosError } from "axios";
import { Redirect } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const refreshUser = useRefreshUser();
  const { saveRefreshToken, user } = useAuth();
  const _loginUrl = "/MobileAuth/Login";
  const enableQueries = useEnableQueries();

  const handleLogin = () => {
    login();
  };

  const login = () => {
    setError("");
    //I guess this is my now preferred error handling
    axios
      .post(
        _loginUrl,
        { username, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
      .then((response) => {
        saveRefreshToken(response.data)
          .then(() => refreshUser())
          .then((response) => setIsTokenValid(!(response.data === "")))
          .then(() => enableQueries());
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (!axiosError?.response) {
            setError("Brak odpowiedzi serwera");
          } else if (axiosError.response.status === 400) {
            setError("Niepoprawny login lub hasło");
          } else {
            setError("Kod błędu: " + axiosError.response.status);
            //console.log(error.config);
          }
        } else {
          console.log(error);
        }
      });
  };

  if (isTokenValid === true) {
    return <Redirect href='/(tabs)/menu' />;
  }

  return (
    <GestureHandlerRootView>
      <View style={{ marginTop: "20%", marginHorizontal: "auto", paddingHorizontal: 20 }}>
        {!(error === "") && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <ThemedView style={styles.inputWrapper}>
          <ThemedText>Login</ThemedText>
          <ThemedTextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
            textContentType='username'
          />
        </ThemedView>
        <ThemedView style={styles.inputWrapper}>
          <ThemedText>Hasło</ThemedText>
          <ThemedTextInput
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            textContentType='password'
          />
        </ThemedView>
        <ForwardedButton
          style={{ borderWidth: 0.2, borderBottomWidth: 0.2 }}
          type='single'
          text={"Zaloguj się"}
          onPress={() => handleLogin()}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    //backgroundColor: "#404040",
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 0.2,
  },
  errorContainer: {
    backgroundColor: "#ff0000",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderTopWidth: 0.2,
  },
});
