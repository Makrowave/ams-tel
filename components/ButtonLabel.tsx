import { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native'
import { TouchableOpacityProps , TouchableOpacity } from 'react-native-gesture-handler';




type LabelProps = TouchableOpacityProps & {
  text?: string;
  content?: string;
  source?: any;
  type?: 'header' | 'body' | 'footer';
  hasIcon?: 'true' | 'false';
  hasContent?: 'true' | 'false';
  hasChevron?: 'true' | 'false';
  textColor?: string;
}
const ButtonLabel = (props: LabelProps) => {
  const [content, setContent] = useState(props.content);

  return (
    <TouchableOpacity style={[
      styles.button,
      props.type === 'header' ? styles.header : undefined,
      props.type === 'footer' ? styles.footer : undefined,
    ]}
    onPress={props.onPress}
    >
      <View style={styles.label}>
        {
          props.hasIcon === 'true' 
          ? <Image style={styles.icon} source={props.source}/> 
          : undefined
        }
        {/*Label - centering*/}
        <Text style={[
          styles.buttonDesc,
        props.hasIcon !== 'true' 
        && props.hasChevron !== 'true' 
        && props.hasContent !== 'true'
          ? styles.centeredText 
          : undefined,
        props.textColor !== undefined
          ? {color: props.textColor}
          : undefined,
        ]}>
          {props.text}
        </Text>
        {/*Content*/}
        {
          props.hasContent === 'true'
          ? <Text style={styles.buttonDesc}>{content}</Text>
          : undefined
        
        }
        {/*Chevron*/}
        {
          props.hasChevron === 'true' 
          ? <Image style={styles.iconSmall} source={require('@/assets/images/chevron.png')}/> 
          : undefined
        }
        
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  buttonDesc: {
    fontSize: 30,
    flex:1,
    color: '#FFFFFF',
    paddingLeft: 20,
  },
  icon: {
    resizeMode: 'contain',
    height: 50,
    flex:1,
  },
  iconSmall: {
    resizeMode: 'contain',
    height: 25,
    flex: 1,
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
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
  footer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomWidth: 0,
  },
  centeredText: {
    textAlign: 'center',
    paddingLeft: 0,
  }
})

export default ButtonLabel;