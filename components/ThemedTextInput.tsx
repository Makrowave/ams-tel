import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInputProps } from "react-native";
import { NativeViewGestureHandlerProps, TextInput } from "react-native-gesture-handler";

type ThemedImageProps = TextInputProps &
  NativeViewGestureHandlerProps & {
    lightColor?: string;
    darkColor?: string;
  };

export function ThemedTextInput({ lightColor, darkColor, style, ...rest }: ThemedImageProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <TextInput style={[style, { color: color, borderColor: color }]} {...rest} />;
}
