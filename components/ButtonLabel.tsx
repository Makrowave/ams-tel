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
const ButtonLabel = ({
  text,
  content,
  source,
  type,
  hasIcon,
  hasContent,
  hasChevron,
  textColor,
  lightColor,
  darkColor,
  onPress,
  style,
  ...rest
}: LabelProps) => {
  const [label, setContent] = useState(content);


  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <ThemedView style={[
        styles.button,
        type === 'header' ? styles.header : undefined,
        type === 'footer' ? styles.footer : undefined,
        style,
      ]}>

        <View style={styles.labelContainer}>
          {
            hasIcon === true
              ? <ThemedImage style={styles.icon} source={source} />
              : undefined
          }
          {/*Label - centering*/}
          <ThemedText
            type='subtitle'
            style={[
              styles.label,
              hasIcon !== true
                && hasChevron !== true
                && hasContent !== true
                ? styles.centeredText
                : undefined,
              textColor !== undefined
                ? { color: textColor }
                : undefined,
            ]}>
            {text}
          </ThemedText>
          {/*Content*/}
          {
            hasContent === true
              ? <ThemedText type='subtitle'>{label}</ThemedText>
              : undefined

          }
          {/*Chevron*/}
          {
            hasChevron === true
              ? <ThemedImage style={styles.iconSmall} source={require('@/assets/images/chevron.png')} />
              : undefined
          }

        </View>
      </ThemedView>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  label: {
    flex: 1,
    flexGrow: 3,
    paddingLeft: 20,
    flexBasis: 10,
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
  },
  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 1,
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