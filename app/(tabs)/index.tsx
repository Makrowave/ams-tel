import ButtonLabel from '@/components/ButtonLabel';
import { StyleSheet, Text, Alert, Image } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Przenieś rower')}
        >
          <ButtonLabel
            text="Przenieś rower"
            source={require('@/assets/images/move.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Złóż rower')}
        >
          <ButtonLabel
            text="Złóż rower"
            source={require('@/assets/images/unpack.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Sprzedaj rower')}
        >
          <ButtonLabel
            text="Sprzedaj rower"
            source={require('@/assets/images/sell.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Dodaj rower')}
        >
          <ButtonLabel
            text="Dodaj rower"
            source={require('@/assets/images/plus.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Dostawa')}
        >
          <ButtonLabel
            text="Dostawa"
            source={require('@/assets/images/delivery.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
  button: {
    height:100,
    backgroundColor: '#78E0FF',
    textAlignVertical: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
