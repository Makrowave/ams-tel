import { StyleSheet, Text, View } from 'react-native'
import HeaderButton from "./HeaderButton";

type HeaderProps = {
  title?: string;
  onPressLeft?: any;
  onPressRight?: any;
  buttons?: 'left' | 'right' | 'both' | 'none';
  titleLeft?: string;
  titleRight?: string;
}

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerButtonLeft}>
        {
          props.buttons === 'left' || props.buttons === 'both'
          ? <HeaderButton facing="left" title={props.titleLeft} onPress={props.onPressLeft}/>
          : undefined
        }
      </View>
      <Text style={styles.headerText}>
        {props.title}
      </Text>
      <View style={styles.headerButtonRight}>
        {
          props.buttons === 'right' || props.buttons === 'both'
          ? <HeaderButton facing="right" title={props.titleRight} onPress={props.onPressRight}/>
          : undefined
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerButtonLeft : {
    flex:1,
    alignContent: 'flex-start'
  },
  headerButtonRight : {
    flex:1,
    alignContent: 'flex-end'
  },
  headerText : {
    flex:1,
    flexGrow: 3,
    textAlign: 'center'
  },
})
export default Header;