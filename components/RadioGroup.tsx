import {useState} from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {ThemedView} from "./themed/ThemedView";
import {ThemedText} from "./themed/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

export type Option = {
  key: Number;
  value: string;
  color?: string;
};

type RadioProps = {
  selection?: Number | "";
  data: Array<Option>;
  onSelect: (arg: Number) => void;
  colored?: boolean;
  lightColor?: string;
  darkColor?: string;
  size?: "small" | "large";
};
const SelectableForwardedButton = ({
                                     selection = "",
                                     data,
                                     onSelect,
                                     lightColor,
                                     darkColor,
                                     colored,
                                     size = "large",
                                     ...rest
                                   }: RadioProps) => {
  const [selectedOption, setSelectedOption] = useState(selection ? selection : data[0].key);
  const selectedColor = useThemeColor({light: lightColor, dark: darkColor}, "selectedColor");

  const onPress = (key: Number) => {
    setSelectedOption(key);
    onSelect(key);
  };

  function createOption(data: Array<Option>, style: Array<Object>) {
    return data.map((item) => {
      return (
        <TouchableOpacity key={item.key.toString()} onPress={() => onPress(item.key)}>
          <ThemedView
            style={[
              style,
              size === "large" ? styles.large : styles.small,
              item.key === selectedOption ? {backgroundColor: selectedColor} : {},
            ]}
          >
            {colored && (
              <View
                style={[{backgroundColor: item.color}, styles.colorBox]}
              ></View>
            )}
            <ThemedText type='subtitle' key={item.key.toString()}>
              {item.value}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      );
    });
  }

  return (
    <View>
      {createOption(data.slice(0, 1), [styles.button, styles.header])}
      {createOption(data.slice(1, data.length - 1), [styles.button])}
      {createOption(data.slice(data.length - 1, data.length), [styles.button, styles.footer])}
    </View>
  );
};

export default SelectableForwardedButton;

const styles = StyleSheet.create({
  colorBox: {
    height: 40,
    width: 40,
    borderRadius: 6,
    position: 'absolute',
    left: 12,
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
    marginHorizontal: "2%",
    textAlignVertical: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000000",
  },
  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  footer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomWidth: 0,
  },
  selected: {
    backgroundColor: "#5a9cb0",
  },
  centeredText: {
    textAlign: "center",
    paddingLeft: 0,
  },
  small: {
    height: 60,
  },
  large: {
    height: 80,
  },
});
