import { ForwardedButton } from "@/components/LabeledButton";
import { Link } from "expo-router";
import { Button } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function FilterMenu() {
  return (
    <GestureHandlerRootView>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "name" },
          }}
          asChild
        >
          <ForwardedButton text={"Nazwa"} hasChevron size='small' type='header' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "manufacturer" },
          }}
          asChild
        >
          <ForwardedButton text={"Producent"} hasChevron size='small' type='body' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "category" },
          }}
          asChild
        >
          <ForwardedButton text={"Kategoria"} hasChevron size='small' type='body' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "color" },
          }}
          asChild
        >
          <ForwardedButton text={"Kolor"} hasChevron size='small' type='body' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "size" },
          }}
          asChild
        >
          <ForwardedButton text={"Rama"} hasChevron size='small' type='body' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "wheelSize" },
          }}
          asChild
        >
          <ForwardedButton text={"Koło"} hasChevron size='small' type='body' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "price" },
          }}
          asChild
        >
          <ForwardedButton text={"Cena"} hasChevron size='small' type='body' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "isElectric" },
          }}
          asChild
        >
          <ForwardedButton text={"Elektryczny"} hasChevron size='small' type='body' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "avaible" },
          }}
          asChild
        >
          <ForwardedButton text={"Dostępny"} hasChevron size='small' type='body' />
        </Link>
        <Link
          href={{
            pathname: "/search/filter-page",
            params: { criterion: "isKids" },
          }}
          asChild
        >
          <ForwardedButton text={"Dziecięcy"} hasChevron size='small' type='footer' />
        </Link>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
