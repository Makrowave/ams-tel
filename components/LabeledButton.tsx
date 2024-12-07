import { forwardRef, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TouchableOpacityProps, TouchableOpacity } from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedImage } from "./ThemedImage";

export type LabelProps = TouchableOpacityProps & {
  text?: string;
  content?: string;
  source?: any;
  type?: "header" | "body" | "footer" | "single";
  hasIcon?: true | false;
  hasContent?: true | false;
  hasChevron?: true | false;
  textColor?: string;
  lightColor?: string;
  darkColor?: string;
  iconColor?: string;
  size?: "small" | "big";
};
const LabeledButton = ({
  text,
  content,
  source,
  type = "body",
  hasIcon,
  hasContent,
  hasChevron,
  textColor,
  lightColor,
  darkColor,
  onPress,
  style,
  iconColor,
  size = "big",
  disabled,
  ...rest
}: LabelProps) => {
  const [label, setContent] = useState(content);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <ThemedView
        style={[
          styles.button,
          size === "big" ? styles.big : styles.small,
          type === "header" || type === "single" ? styles.header : undefined,
          type === "footer" || type === "single" ? styles.footer : undefined,
          type === "body" ? styles.body : {},
          style,
        ]}
      >
        <View style={styles.labelContainer}>
          {hasIcon === true ? (
            <View style={{ flex: 1, flexBasis: 50, alignItems: "center" }}>
              <View style={[styles.iconWrapper, { backgroundColor: iconColor }]}>
                <Image style={styles.icon} source={source} />
              </View>
            </View>
          ) : undefined}
          {/*Label - centering*/}
          <ThemedText
            type='subtitle'
            style={[
              styles.label,
              hasIcon !== true && hasChevron !== true && hasContent !== true ? styles.centeredText : undefined,
              textColor !== undefined ? { color: textColor } : undefined,
            ]}
          >
            {text}
          </ThemedText>
          {/*Content*/}
          {hasContent === true ? (
            <ThemedText ellipsizeMode='tail' numberOfLines={1} type='default' style={styles.contentText}>
              {label}
            </ThemedText>
          ) : undefined}
          {/*Chevron*/}
          {hasChevron === true ? (
            <ThemedImage style={[styles.iconSmall]} source={require("@/assets/images/chevron.png")} />
          ) : undefined}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    flex: 1,
    flexGrow: 3,
    paddingLeft: 20,
    flexBasis: 10,
  },
  contentText: {
    width: "60%",
    textAlign: "right",
    paddingRight: 20,
    fontSize: 20,
  },
  icon: {
    resizeMode: "contain",
    height: 40,
  },
  iconWrapper: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconSmall: {
    resizeMode: "contain",
    height: 25,
    flex: 1,
    flexBasis: 1,
  },
  labelContainer: {
    textAlignVertical: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    textAlignVertical: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 1,
  },
  footer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  body: {
    borderBottomWidth: 1,
  },
  centeredText: {
    textAlign: "center",
    paddingLeft: 0,
  },
  small: {
    height: 60,
  },
  big: {
    height: 80,
  },
});

//Don't even use refs, this one strictly to not get console error
export const ForwardedButton = forwardRef<HTMLButtonElement, LabelProps>((props, ref) => (
  <LabeledButton {...props}>{props.children}</LabeledButton>
));
