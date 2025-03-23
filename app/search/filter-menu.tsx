import {useFilter} from "@/hooks/contexts/useFilter";
import {ScrollView} from "react-native-gesture-handler";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import {ContentNavButton, ContentNavButtonProps} from "@/components/buttons/ContentHolderButton";
import {Filters} from "@/components/contexts/FilterContext";
import {Stack} from "expo-router";
import {Button} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ThemedView} from "@/components/themed/ThemedView";

export default function FilterMenu() {
  const insets = useSafeAreaInsets()
  const {filters, resetFilters} = useFilter();
  const contentNavButtons = getContentNavButtons(filters);
  return (
    <ThemedGestureHandlerRootView>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title='Reset'
              onPress={() => resetFilters()}
            />
          ),
        }}
      />
      <ThemedView style={{marginBottom: insets.bottom, borderRadius: 20}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            contentNavButtons.map((button, index) => (
              <ContentNavButton {...button}
                                style={index !== 0 ? {
                                  borderTopWidth: 1,
                                  backgroundColor: "transparent"
                                } : {backgroundColor: "transparent"}}/>
            ))
          }
        </ScrollView>
      </ThemedView>
    </ThemedGestureHandlerRootView>
  );
}

const getContentNavButtons = (filters: Filters): ContentNavButtonProps[] => [
  {
    href: {pathname: "/search/filter-page", params: {criterion: "name"}},
    title: "Nazwa",
    content: filters.name,
    hasChevron: true,
    icon: "font",
    placeholder: "Nazwa"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "manufacturer"}},
    title: "Producent",
    content: filters.manufacturer.name,
    hasChevron: true,
    icon: "industry"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "category"}},
    title: "Kategoria",
    content: filters.category.name,
    hasChevron: true,
    icon: "list"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "color"}},
    title: "Kolor",
    content: filters.color.name,
    hasChevron: true,
    icon: "palette"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "size"}},
    title: "Rama",
    content: filters.size.toString(),
    hasChevron: true,
    icon: "up-right-and-down-left-from-center",
    placeholder: "Rozmiar ramy"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "wheelSize"}},
    title: "Koło",
    content: filters.wheelSize.id.toString(),
    hasChevron: true,
    icon: "circle",
    placeholder: "Rozmiar koła"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "price"}},
    title: "Cena",
    content: `${filters.minPrice}-${filters.maxPrice}`,
    hasChevron: true,
    icon: "money-bill"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "isElectric"}},
    title: "Elektryczny",
    content: filters.isElectric ? "Tak" : "Nie",
    hasChevron: true,
    icon: "bolt"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "avaible"}},
    title: "Dostępny",
    content: filters.available ? "Tak" : "Nie",
    hasChevron: true,
    icon: "check"
  },
  {
    href: {pathname: "/search/filter-page", params: {criterion: "isKids"}},
    title: "Dziecięcy",
    content: filters.isKids ? "Tak" : "Nie",
    hasChevron: true,
    icon: "child"
  }
];
