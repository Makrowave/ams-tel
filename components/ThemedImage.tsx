import { useThemeColor } from "@/hooks/useThemeColor";
import { ImageProps, Image } from "react-native";


type ThemedImageProps = ImageProps & {
    lightColor?: string;
    darkColor?: string;
}

export function ThemedImage({
    lightColor,
    darkColor,
    style,
    ...rest
}: ThemedImageProps)  {
    const tintColor = useThemeColor({light: lightColor, dark: darkColor}, "text");
    return(
        <Image style={[style, {tintColor: tintColor}]} {...rest}/>
    )
}