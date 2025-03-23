import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {ThemedText} from "../themed/ThemedText";
import {FontAwesome6} from "@expo/vector-icons";
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedFontAwesome6} from "@/components/themed/ThemedIonicons";
import {Href, Link} from "expo-router";
import {placeholder} from "@babel/types";

export interface ContentHolderButtonProps {
  icon: keyof typeof FontAwesome6.glyphMap;
  title: string;
  content: string;
  hasChevron?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export interface ContentNavButtonProps extends ContentHolderButtonProps {
  href: Href
}

export const ContentHolderButton = ({
                                      icon,
                                      title,
                                      content,
                                      style,
                                      onPress,
                                      hasChevron,
                                      disabled,
                                      placeholder,
                                    }: ContentHolderButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <ThemedView style={[styles.wrapper, style]}>
        <View>
          <ThemedView style={styles.header}>
            <ThemedFontAwesome6 name={icon} size={14} style={{marginRight: 6}}/>
            <ThemedText>{title}</ThemedText>
          </ThemedView>
          <View style={styles.content}>
            {
              content === ""
                ?
                <Text style={{fontSize: 20, lineHeight: 22, height: 22, color: "#888888"}}>
                  {placeholder}
                </Text>
                :
                <ThemedText style={{fontSize: 20, lineHeight: 22, height: 22}}>
                  {content}
                </ThemedText>

            }
          </View>
        </View>
        {hasChevron &&
          <ThemedText>
            <ThemedFontAwesome6 name={"chevron-right"} size={25}/>
          </ThemedText>
        }
      </ThemedView>
    </TouchableOpacity>
  );
};

export const ContentNavButton = (props: ContentNavButtonProps) => {
  return (
    <Link href={props.href} asChild push>
      <ContentHolderButton {...props} />
    </Link>
  )
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    borderBottomWidth: 0.7,
    backgroundColor: 'transparent',
    marginRight: 'auto',
    marginBottom: 6
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  wrapper: {
    display: "flex",
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

