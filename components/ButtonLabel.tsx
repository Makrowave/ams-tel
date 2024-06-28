import { StyleSheet, View, Image, Text } from 'react-native'


type LabelProps = {
  text: string;
  source: any;
}
const ButtonLabel = (props: LabelProps) => {
  return (
    <View style={styles.label}>
      <Image style={styles.icon} source={props.source}/>
      <Text style={styles.buttonDesc}>{props.text}</Text>
      <Image style={styles.icon} source={require('@/assets/images/chevron.png')}/>
    </View>
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
  label: {
    textAlignVertical: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ButtonLabel;