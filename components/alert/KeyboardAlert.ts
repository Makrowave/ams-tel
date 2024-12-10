import { Alert } from "react-native";

export default function showKeyboardAlert(
  title: string,
  onFinishTyping: (value: string) => void,
  keyboardType?: string
) {
  const showAlert = () => {
    Alert.prompt(
      title,
      "",
      [
        {
          text: "Anuluj",
        },
        {
          text: "Zatwierdź",
          onPress: (value) => {
            onFinishTyping(value ?? "");
          },
        },
      ],
      "plain-text",
      "",
      keyboardType
    );
  };
  return showAlert();
}
