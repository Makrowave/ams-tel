import { Alert, Button } from "react-native";

interface ButtonWithInputAlertProps {
  onFinishTyping: (value: string) => void;
  disabled?: boolean;
  title: string;
}

export default function ButtonWithInputAlert({ onFinishTyping, title, disabled = false }: ButtonWithInputAlertProps) {
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

  return <Button title='Wpisz kod' disabled={disabled} onPress={() => showAlert()} />;
}
