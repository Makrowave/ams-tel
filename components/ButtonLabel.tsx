import { useState } from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native'
import { TouchableOpacityProps, TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedImage } from './ThemedImage';




type LabelProps = TouchableOpacityProps & {
  text?: string;
  content?: string;
  source?: any;
  type?: 'header' | 'body' | 'footer';
  hasIcon?: true | false;
  hasContent?: true | false;
  hasChevron?: true | false;
  textColor?: string;
  lightColor?: string;
  darkColor?: string;
}
const ButtonLabel = (props: LabelProps) => {
  const [content, setContent] = useState(props.content);
 

  return (
    <Pressable>
      <ThemedView>
        <TouchableOpacity style={[
          styles.button,
          props.type === 'header' ? styles.header : undefined,
          props.type === 'footer' ? styles.footer : undefined,
        ]}
          onPress={props.onPress}
        >
          <View style={styles.labelContainer}>
            {
              props.hasIcon === true
                ? <ThemedImage style={styles.icon} source={props.source} />
                : undefined
            }
            {/*Label - centering*/}
            <ThemedText
              type='subtitle'
              style={[
                styles.label,
                props.hasIcon !== true
                  && props.hasChevron !== true
                  && props.hasContent !== true
                  ? styles.centeredText
                  : undefined,
                props.textColor !== undefined
                  ? { color: props.textColor }
                  : undefined,
              ]}>
              {props.text}
            </ThemedText>
            {/*Content*/}
            {
              props.hasContent === true
                ? <ThemedText type='subtitle'>{content}</ThemedText>
                : undefined

            }
            {/*Chevron*/}
            {
              props.hasChevron === true
                ? <ThemedImage style={styles.iconSmall} source={require('@/assets/images/chevron.png')} />
                : undefined
            }

          </View>
        </TouchableOpacity>
      </ThemedView>
    </Pressable>
  )
}



const styles = StyleSheet.create({
  label: {
    flex: 1,
    flexGrow: 3,
    paddingLeft: 20,
    flexBasis: 10,
  },
  content: {
    fontSize: 25,
    flex: 1,
    flexGrow: 6,
  },
  icon: {
    resizeMode: 'contain',
    height: 50,
    flex: 1,
    flexBasis: 50,
  },
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