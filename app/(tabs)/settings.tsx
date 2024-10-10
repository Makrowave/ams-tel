import ButtonLabel from '@/components/ButtonLabel'
import { useActionData } from '@/hooks/useActionData'
import { Link, Stack } from 'expo-router'
import { useEffect } from 'react'
import { Alert, Button, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Settings() {
  const { defaultUserLocation, placeList } = useActionData();
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <Stack.Screen name=""
          options={{
            title: "Przenieś rower", headerBackTitle: "Wróć",
            headerRight: () => <Button title="Wpisz kod" />
          }}
        />
        <Link asChild href={{
          pathname: "/home/select-screen",
          params: { datastring: JSON.stringify(placeList), selection: 'defaultUserLocation' }
        }}>
          <ButtonLabel
            text="Sklep:"
            hasContent={true}
            content={placeList.find(item => item.key === defaultUserLocation)?.value.toString()}
            key={defaultUserLocation?.toString()}
            source={require('@/assets/images/move.png')}
            hasChevron={true}
            type='header'
          />
        </Link>
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