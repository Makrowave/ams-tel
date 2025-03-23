import ModelSearchPage from "@/components/ModelSearchPage";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function SearchScreen() {

  const insets = useSafeAreaInsets()
  return (
    <ThemedGestureHandlerRootView style={{marginBottom: insets.bottom}}>
      <ModelSearchPage bindMode/>
    </ThemedGestureHandlerRootView>
  );
}
