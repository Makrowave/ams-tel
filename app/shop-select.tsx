import SelectableButtonLabel from "@/components/RadioGroup"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"


export default function ShopSelect() {
  const data = [
    {id: 0, value: 'Wojciechowska'},
    {id: 1, value: 'Gęsia'},
    {id: 2, value: 'Gala'},
  ]
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        {/*<SelectableButtonLabel data={data}/>*/}
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}