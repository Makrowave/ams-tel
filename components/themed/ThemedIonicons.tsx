import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { ComponentProps } from "react";

type ThemedIoniconsProps = IconProps<ComponentProps<typeof Ionicons>["name"]> & {
  lightColor?: string;
  darkColor?: string;
};
export default function ThemedIonicons({ lightColor, darkColor, ...rest }: ThemedIoniconsProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <Ionicons color={color} {...rest} />;
}
