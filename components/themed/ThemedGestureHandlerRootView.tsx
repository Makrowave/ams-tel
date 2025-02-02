import { useThemeColor } from "@/hooks/useThemeColor";
import { GestureHandlerRootViewProps } from "react-native-gesture-handler/lib/typescript/components/GestureHandlerRootView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type ThemedGestureHandlerRootView = GestureHandlerRootViewProps & {
  lightColor?: string;
  darkColor?: string;
  borderLightColor?: string;
  borderDarkColor?: string;
};

export function ThemedGestureHandlerRootView({
  style,
  lightColor,
  darkColor,
  borderDarkColor,
  borderLightColor,
  ...otherProps
}: ThemedGestureHandlerRootView) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "secondaryBackground");
  const borderColor = useThemeColor({ light: borderLightColor, dark: borderDarkColor }, "text");

  return <GestureHandlerRootView style={[{ backgroundColor }, { borderColor }, { flex: 1 }, style]} {...otherProps} />;
}
