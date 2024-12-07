import { ForwardedButton } from "@/components/LabeledButton";
import LinkButton from "@/components/LinkButton";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useStatusesData } from "@/hooks/queryHooks/useStatusesData";
import { useFilter } from "@/hooks/useFilter";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function FilterMenu() {
  const { filters, resetFilters } = useFilter();
  // const {} = useManucturers();
  // const {} = useColors();
  const { placeFindByKey } = usePlacesData();
  const { statusFindByKey } = useStatusesData();
  return (
    <GestureHandlerRootView>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
        <LinkButton
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "name" },
          }}
          asChild
          text={"Nazwa"}
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
          text={"Producent"}
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
          text={"Kategoria"}
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
          text={"Kolor"}
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
          text={"Rama"}
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
          text={"Koło"}
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
          text={"Cena"}
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
          text={"Elektryczny"}
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
          text={"Dostępny"}
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
          text={"Dziecięcy"}
          hasChevron
          size='small'
          type='body'
          hasContent
          content={filters.isKids.toString()}
          key={`Kids-${filters.isKids}`}
        />
        <ForwardedButton key='Reset-button' text='Reset' type='footer' size='small' onPress={() => resetFilters()} />
      </ScrollView>
    </GestureHandlerRootView>
  );
}
