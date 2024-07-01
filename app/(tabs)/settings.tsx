import ButtonLabel from '@/components/ButtonLabel'
import { Alert, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Settings() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ButtonLabel
            text="Sklep:"
            hasContent='true'
            content='Wojciechowska'
            source={require('@/assets/images/move.png')}
            onPress={() => Alert.alert('Przenieś rower')}
            hasChevron='true'
            type='header'
        />
        <ButtonLabel
            text="Wyloguj"
            textColor="#FF0000"
            source={require('@/assets/images/move.png')}
            onPress={() => Alert.alert('Przenieś rower')}
            type='footer'
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
  header: {

  }
})