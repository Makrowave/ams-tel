import { StyleSheet, View, Image, Text } from 'react-native'
import { TouchableOpacityProps , TouchableOpacity } from 'react-native-gesture-handler';


type LabelProps = TouchableOpacityProps & {
  text: string;
  source: any;
  type?: 'header' | 'body' | 'footer';
}
const ButtonLabel = (props: LabelProps) => {
  return (
    <TouchableOpacity style={[
      styles.button,
      props.type === 'header' ? styles.header : undefined,
      props.type === 'footer' ? styles.footer : undefined,
    ]}
    onPress={props.onPress}
    >
      <View style={styles.label}>
        <Image style={styles.icon} source={props.source}/>
        <Text style={styles.buttonDesc}>{props.text}</Text>
        <Image style={styles.iconSmall} source={require('@/assets/images/chevron.png')}/>
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  buttonDesc: {
    fontSize: 30,
    flex:4,
    color: '#FFFFFF'
  },
  icon: {
    resizeMode: 'contain',
    height: 50,
    flex:1,
  },
  iconSmall: {
    resizeMode: 'contain',
    height: 25,
    flex:1,
  },
  label: {
    textAlignVertical: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height:100,
    marginHorizontal:'2%',
    backgroundColor: '#78E0FF',
    textAlignVertical: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
  footer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomWidth: 0,
  },
})

export default ButtonLabel;