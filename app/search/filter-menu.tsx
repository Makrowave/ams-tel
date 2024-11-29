import { ForwardedButton } from "@/components/LabeledButton";
import { Link } from "expo-router";
import { Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function FilterMenu() {
  return (
    <GestureHandlerRootView>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "name" },
        }}
        asChild
      >
        <ForwardedButton text={"Nazwa"} hasChevron type='header' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "manufacturer" },
        }}
        asChild
      >
        <ForwardedButton text={"Producent"} hasChevron type='header' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "category" },
        }}
        asChild
      >
        <ForwardedButton text={"Kategoria"} hasChevron type='header' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "color" },
        }}
        asChild
      >
        <ForwardedButton text={"Kolor"} hasChevron type='header' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "size" },
        }}
        asChild
      >
        <ForwardedButton text={"Rama"} hasChevron type='header' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "wheelSize" },
        }}
        asChild
      >
        <ForwardedButton text={"Koło"} hasChevron type='header' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "price" },
        }}
        asChild
      >
        <ForwardedButton text={"Cena"} hasChevron type='header' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "isElectric" },
        }}
        asChild
      >
        <ForwardedButton text={"Elektryczny"} hasChevron type='header' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "avaible" },
        }}
        asChild
      >
        <ForwardedButton text={"Dostępny"} hasChevron type='body' />
      </Link>
      <Link
        href={{
          pathname: "/search/filter-page",
          params: { criterion: "isKids" },
        }}
        asChild
      >
        <ForwardedButton text={"Dziecięcy"} hasChevron type='footer' />
      </Link>
    </GestureHandlerRootView>
  );
}
