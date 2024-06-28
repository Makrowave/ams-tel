import ButtonLabel from '@/components/ButtonLabel';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.text}>Zalogowano: Maks</Text>
          <Text style={styles.text}>Sklep: Wojciechowska</Text>
        </View>
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
  
  header: {
    marginHorizontal:'2%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 30,
    backgroundColor: '#78E0FF',
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
  button: {
    height:100,
    marginHorizontal:'2%',
    backgroundColor: '#78E0FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
  text: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    fontSize: 25,
    color: '#FFFFFF'
  }
});
