import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native'
import { TouchableOpacityProps, TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type RadioPair = {
  key: Number;
  value: string;
}


type RadioProps = {
  selection?: Number;
  data: Array<RadioPair>;
  onSelect: (arg: Number) => void;
  lightColor?: string,
  darkColor?: string,
}
const SelectableButtonLabel = ({selection, data, onSelect, lightColor, darkColor, ...rest }: RadioProps) => {
  const [selectedOption, setSelectedOption] = useState(selection ? selection : data[0].key);
  const selectedColor = useThemeColor({ light: lightColor, dark: darkColor }, 'selectedColor')

  useEffect(() =>{
    onSelect(selectedOption);
  }, [selectedOption])
  function createOption(data: Array<RadioPair>, style: Array<Object>) {
    return (
      data.map((item) => {
        return (
          <TouchableOpacity
            key={item.key.toString()}
            onPress={() => { setSelectedOption(item.key) }}
          >
            <ThemedView style={[
              style,
              item.key === selectedOption ? { backgroundColor: selectedColor } : {},
            ]}>
              <ThemedText type='subtitle' key={item.key.toString()}>{item.value}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )
      })
    )
  }
  return (
    <View>
      {createOption(data.slice(0, 1), [styles.button, styles.header])}
      {createOption(data.slice(1, data.length - 1), [styles.button])}
      {createOption(data.slice(data.length - 1, data.length), [styles.button, styles.footer])}
    </View>
  )
}


export default SelectableButtonLabel;

const styles = StyleSheet.create({
  iconSmall: {
    resizeMode: 'contain',
    height: 25,
    flex: 1,
    flexBasis: 1,
  },
  labelContainer: {
    textAlignVertical: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 80,
    marginHorizontal: '2%',
    textAlignVertical: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000000'
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
    backgroundColor: '#5a9cb0',
  },
  centeredText: {
    textAlign: 'center',
    paddingLeft: 0,
  }
})
