import BoolFilter from "@/components/filters/BoolFilter";
import FetchSelectFilter from "@/components/filters/FetchSelectFilter";
import NumberFilter from "@/components/filters/NumberFilter";
import RangeFilter from "@/components/filters/RangeFilter";
import TextFilter from "@/components/filters/TextFilter";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import {QueryKeys} from "@/constants/QueryKeys";
import {QuerySrc} from "@/constants/QuerySrc";
import {useFilter} from "@/hooks/contexts/useFilter";
import {useLocalSearchParams, useNavigation} from "expo-router";
import {useEffect} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type Criterion =
  | "name"
  | "manufacturer"
  | "size"
  | "wheelSize"
  | "category"
  | "color"
  | "price"
  | "avaible"
  | "isElectric"
  | "assembled"
  | "isKids"
  | "isWoman";

export default function FilterPage() {
  const {filters} = useFilter();
  const {criterion} = useLocalSearchParams<{ criterion: Criterion }>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({title: getTitleName()});
  }, [navigation]);

  const getTitleName = () => {
    switch (criterion) {
      case "name":
        return "Nazwa";
      case "manufacturer":
        return "Producent";
      case "size":
        return "Rama";
      case "wheelSize":
        return "Koła";
      case "category":
        return "Kategoria";
      case "color":
        return "Kolor";
      case "price":
        return "Cena";
      case "avaible":
        return "Dostępny";
      case "isElectric":
        return "Elektryczny";
      case "isKids":
        return "Dziecięcy";
      case "isWoman":
        return "Typ ramy";
    }
  };

  function FilterComponent() {
    switch (criterion) {
      case "name":
        return <TextFilter title='Nazwa' updateKey='name' defaultValue={filters.name}/>;
      case "manufacturer":
        return (
          <FetchSelectFilter url={QuerySrc.Manufacturers} queryKey={QueryKeys.Manufacturers} updateKey='manufacturer'/>
        );
      case "size":
        return <NumberFilter title='Rama' defaultValue={filters.size} updateKey='size'/>;
      case "wheelSize":
        return <FetchSelectFilter url={QuerySrc.Wheels} queryKey={QueryKeys.WheelSizes} updateKey='wheelSize'/>;
      case "category":
        return <FetchSelectFilter url={QuerySrc.Categories} queryKey={QueryKeys.Categories} updateKey='category'/>;
      case "color":
        return <FetchSelectFilter url={QuerySrc.Colors} queryKey={QueryKeys.Colors} updateKey='color' colored={true}/>;
      case "price":
        return (
          <RangeFilter
            title='Cena'
            minKey='minPrice'
            maxKey='maxPrice'
            minValue={filters.minPrice}
            maxValue={filters.maxPrice}
          />
        );
      case "avaible":
        return <BoolFilter title='Dostępny' value={filters.available} updateKey='available'/>;
      case "isElectric":
        return <BoolFilter title='Elektryczny' value={filters.isElectric} updateKey='isElectric'/>;
      case "isKids":
        return <BoolFilter title='Złożony' value={filters.isKids} updateKey='isKids'/>;
      case "isWoman":
        break;
    }
  }

  return (
    <ThemedGestureHandlerRootView style={{marginBottom: insets.bottom}}>
      <FilterComponent/>
    </ThemedGestureHandlerRootView>
  );
}
