import { Alert, Button } from "react-native";

interface ButtonWithInputAlertProps {
  onFinishTyping: (value: string) => void;
  title: string;
}

export default function ButtonWithInputAlert({ onFinishTyping, title }: ButtonWithInputAlertProps) {
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
      "plain-text"
    );
  };

  return <Button title='Wpisz kod' onPress={() => showAlert()} />;
}
