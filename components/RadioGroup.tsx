import { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native'
import { TouchableOpacityProps , TouchableOpacity } from 'react-native-gesture-handler';

type RadioPair = {
  id: number;
  value: string;
}


type RadioProps = {
  data: Array<RadioPair>;
}
const SelectableButtonLabel = (props: RadioProps) => {
  const [selectedOption, setSelectedOption] = useState(props.data[0].id);

  function createOption(data: Array<RadioPair>, style: Array<Object>) {
    return (
      data.map((item) => {
        return (
          <TouchableOpacity 
            style={[
              style, 
              item.id === selectedOption ? styles.selected : styles.unselected,
            ]} 
            onPress={() => {setSelectedOption(item.id)}}
          >
            <Text key={item.id} style={{color: '#FFFFFF'}}>{item.value}</Text>
          </TouchableOpacity>
      )})
    )
  }
  return (
    <View>
      
      {createOption(props.data.slice(0, 1), [styles.button, styles.header])}
      {createOption(props.data.slice(1, props.data.length-1), [styles.button])}
      {createOption(props.data.slice(props.data.length-1, props.data.length), [styles.button, styles.footer])}
      <Text style={{color: "#FFFFFF"}}>Selected option: {selectedOption}</Text>
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
    height:100,
    marginHorizontal:'2%',
    backgroundColor: '#78E0FF',
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
  unselected: {
    backgroundColor: '#78E0FF',
  },
  centeredText: {
    textAlign: 'center',
    paddingLeft: 0,
  }
})
