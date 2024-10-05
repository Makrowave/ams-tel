import ButtonLabel from '@/components/ButtonLabel';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [user, setUser] = useState('Maks')
  const [place, setPlace] = useState('Wojciechowska')
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          <ThemedView style={styles.header}>
            <View style={styles.textContainer}>
              <ThemedText type='subtitle' style={styles.text}>Zalogowano:</ThemedText>
              <ThemedText type='subtitle'>{user}</ThemedText>
            </View>
            <View style={styles.textContainer}>
              <ThemedText type='subtitle' style={styles.text}>Sklep</ThemedText>
              <ThemedText type='subtitle'>{place}</ThemedText>
            </View>
          </ThemedView>
          <Link push href='/home/move' asChild>
            <ButtonLabel
              text="Przenieś rower"
              source={require('@/assets/images/move.png')}
              hasIcon={true}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/assemble' asChild>
            <ButtonLabel
              text="Złóż rower"
              source={require('@/assets/images/unpack.png')}
              hasIcon={true}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/sell' asChild>
            <ButtonLabel
              text="Sprzedaj rower"
              source={require('@/assets/images/sell.png')}
              hasIcon={true}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/add' asChild>
            <ButtonLabel
              text="Dodaj rower"
              source={require('@/assets/images/plus.png')}
              hasIcon={true}
              hasChevron={true}
            />
          </Link>
          <Link push href='/home/delivery' asChild>
            <ButtonLabel
              text="Dostawa"
              source={require('@/assets/images/delivery.png')}
              hasIcon={true}
              hasChevron={true}
              type='footer'
            />
          </Link>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: '2%'
  },
  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 30,
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  text: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  textContainer: {
    paddingHorizontal: '4%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
