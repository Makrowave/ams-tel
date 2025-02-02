import { ForwardedButton } from "@/components/LabeledButton";
import LinkButton from "@/components/LinkButton";
import { useFilter } from "@/hooks/contexts/useFilter";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedGestureHandlerRootView } from "@/components/themed/ThemedGestureHandlerRootView";

export default function FilterMenu() {
  const { filters, resetFilters } = useFilter();
  return (
    <ThemedGestureHandlerRootView>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "name" },
          }}
          asChild
          title={"Nazwa"}
          hasChevron
          size='small'
          type='header'
          hasContent
          content={filters.name}
          key={`Name-${filters.name}`}
        />
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "manufacturer" },
          }}
          asChild
          title={"Producent"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.manufacturer.toString()}
          key={`Manufacturer-${filters.manufacturer}`}
        />
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "category" },
          }}
          asChild
          title={"Kategoria"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.category.toString()}
          key={`Category-${filters.category}`}
        />
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "color" },
          }}
          asChild
          title={"Kolor"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.color.toString()}
          key={`Color-${filters.color}`}
        />
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "size" },
          }}
          asChild
          title={"Rama"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.size.toString()}
          key={`Frame-${filters.size}`}
        />
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "wheelSize" },
          }}
          asChild
          title={"Koło"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.wheelSize.toString()}
          key={`Wheel-${filters.wheelSize}`}
        />
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "price" },
          }}
          asChild
          title={"Cena"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={`${filters.minPrice}-${filters.maxPrice}`}
          key={`Price-${filters.minPrice}-${filters.maxPrice}`}
        />

        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "isElectric" },
          }}
          asChild
          title={"Elektryczny"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.isElectric.toString()}
          key={`Electric-${filters.isElectric}`}
        />
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "avaible" },
          }}
          asChild
          title={"Dostępny"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.avaible.toString()}
          key={`Avaible-${filters.avaible}`}
        />
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "isKids" },
          }}
          asChild
          title={"Dziecięcy"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.isKids.toString()}
          key={`Kids-${filters.isKids}`}
        />
        <ForwardedButton key='Reset-button' title='Reset' type='footer' size='big' onPress={() => resetFilters()} />
      </ScrollView>
    </ThemedGestureHandlerRootView>
  );
}
