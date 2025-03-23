import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";
import {ThemedText} from "../themed/ThemedText";
import {FontAwesome6} from "@expo/vector-icons";
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedFontAwesome6} from "@/components/themed/ThemedIonicons";

export interface BigIconNavigationButtonProps {
  icon: keyof typeof FontAwesome6.glyphMap;
  text: string;
  color: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const BigIconNavigationButton = ({icon, text, color, style, onPress}: BigIconNavigationButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[{display: "flex", flexDirection: 'row', padding: 12, alignItems: 'center'}, style]}>
        <View style={[styles.icon, {backgroundColor: color}]}>
          <FontAwesome6 name={icon} size={30} color={"white"}/>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between'
        }}>
          <ThemedText style={{fontSize: 18}}>
            {text}
          </ThemedText>
          <ThemedText>
            <ThemedFontAwesome6 name={"chevron-right"} size={25}/>
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    borderRadius: 6,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    width: 45,
    height: 45,
  }
});

export default BigIconNavigationButton;
