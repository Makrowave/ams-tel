import ButtonLabel from '@/components/ButtonLabel';
import { Link } from 'expo-router';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.text}>Zalogowano: Maks</Text>
          <Text style={styles.text}>Sklep: Wojciechowska</Text>
        </View>
        <Link push href='/home/move' asChild>
          <ButtonLabel
            text="Przenieś rower"
            source={require('@/assets/images/move.png')}
            hasIcon='true'
            hasChevron='true'
          />
        </Link>
        <Link push href='/home/assemble' asChild>
          <ButtonLabel
            text="Złóż rower"
            source={require('@/assets/images/unpack.png')}
            hasIcon='true'
            hasChevron='true'
          />
        </Link>
        <Link push href='/home/sell' asChild>
          <ButtonLabel
            text="Sprzedaj rower"
            source={require('@/assets/images/sell.png')}
            hasIcon='true'
            hasChevron='true'
          />
        </Link>
        <Link push href='/home/add' asChild>
          <ButtonLabel
            text="Dodaj rower"
            source={require('@/assets/images/plus.png')}
            hasIcon='true'
            hasChevron='true'
          />
        </Link>
        <Link push href='/home/delivery' asChild>
          <ButtonLabel
            text="Dostawa"
            source={require('@/assets/images/delivery.png')}
            hasIcon='true'
            hasChevron='true'
            type='footer'
          />
        </Link>
      </SafeAreaView>
    </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({

  header: {
    marginHorizontal: '2%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 30,
    backgroundColor: '#78E0FF',
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
  button: {
    height: 100,
    marginHorizontal: '2%',
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
