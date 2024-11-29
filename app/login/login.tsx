import axios from "@/api/axios";
import { ForwardedButton } from "@/components/LabeledButton";
import { ThemedView } from "@/components/ThemedView";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useRefreshUser from "@/hooks/useRefreshUser";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const refreshUser = useRefreshUser();
  const { saveRefreshToken } = useAuth();
  const _loginUrl = "/MobileAuth/Login";
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
        saveRefreshToken(response.data).then(() => refreshUser());
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

  return (
    <GestureHandlerRootView>
      <ThemedView>
        {!(error === "") && (
          <View style={{ backgroundColor: "#ff0000" }}>
            <Text>{error}</Text>
          </View>
        )}
        <TextInput
          style={{ backgroundColor: "#ffffff", height: 30 }}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={{ backgroundColor: "#ffffff", height: 30 }}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <ForwardedButton text={"Zaloguj się"} onPress={() => handleLogin()} />
      </ThemedView>
    </GestureHandlerRootView>
  );
}
