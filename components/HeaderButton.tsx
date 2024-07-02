import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


type HeaderButtonProps = {
  facing?: 'left' | 'right';
  title? : string;
  onPress?: any;
}

const HeaderButton = (props: HeaderButtonProps) => {
  return (
    props.facing === 'right' 
    ? 
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Text>{props.title}</Text>
        <Image style={styles.iconSmall} source={require('@/assets/images/chevron.png')}/> 
        </TouchableOpacity>
    : 
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Image style={styles.iconSmallReverse} source={require('@/assets/images/chevron.png')}/>
        <Text>{props.title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconSmall: {
    resizeMode: 'contain',
    height: 25,
    flex: 1,
    flexBasis: 1,
  },
  iconSmallReverse: {
    resizeMode: 'contain',
    height: 25,
    flex: 1,
    flexBasis: 1,
    transform: [
      {scaleX: -1}
    ]
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
})

export default HeaderButton;