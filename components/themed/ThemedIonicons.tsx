import {useThemeColor} from "@/hooks/useThemeColor";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import {IconProps} from "@expo/vector-icons/build/createIconSet";
import {ComponentProps} from "react";

type ThemedIoniconsProps = IconProps<ComponentProps<typeof Ionicons>["name"]> & {
  lightColor?: string;
  darkColor?: string;
};

type ThemedFontAwesome6Props = IconProps<ComponentProps<typeof FontAwesome6>["name"]> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIonicons({lightColor, darkColor, ...rest}: ThemedIoniconsProps) {
  const color = useThemeColor({light: lightColor, dark: darkColor}, "text");
  return <Ionicons color={color} {...rest} />;
}

export function ThemedFontAwesome6({lightColor, darkColor, ...rest}: ThemedFontAwesome6Props) {
  const color = useThemeColor({light: lightColor, dark: darkColor}, "text");
  return <FontAwesome6 color={color} {...rest} />;
}
