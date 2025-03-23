import ModelSearchPage from "@/components/ModelSearchPage";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ThemedGestureHandlerRootView style={{marginTop: insets.top}}>
      <ModelSearchPage/>
    </ThemedGestureHandlerRootView>
  );
}
