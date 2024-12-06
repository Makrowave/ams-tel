import { useQuery } from "@tanstack/react-query";
import { Filters, NumberKeys } from "../contexts/FilterContext";
import SelectFilter from "./SelectFilter";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ActivityIndicator, Text, View } from "react-native";
import { Option } from "../RadioGroup";

interface FetchSelectFilterProps {
  url: string;
  queryKey: string;
  updateKey: NumberKeys;
  colored?: boolean;
}

export default function FetchSelectFilter({ url, queryKey, updateKey, colored = false }: FetchSelectFilterProps) {
  const data1 = [
    { key: 1, value: "Gaming", color: "#ff0000" },
    { key: 2, value: "Gaming2", color: "#00ff00" },
    { key: 3, value: "Gaming3", color: "#0000ff" },
  ];
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: async (): Promise<Array<Option>> => {
      const result = await axiosPrivate.get(url);
      //WARNING? I guess be wary of this code - works same at frontend since
      //My backend sends 2 or 3 fields
      console.log(result.data);
      const mappedResult = result.data.map((item: any) => {
        let keys = Object.keys(item);
        let obj = {
          key: item[keys[0]] ?? null,
          value: item[keys[1]] ?? null,
          color: item[keys[2]] ?? null,
        };
        console.log(obj);
        return obj;
      });

      return [{ key: "", value: "Dowolny", color: "#ffffff" }, ...mappedResult];
    },
  });
  if (isError)
    return (
      <View style={{ height: 60, backgroundColor: "#dd0000" }}>
        <Text>Błąd</Text>
      </View>
    );
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return <SelectFilter data={data ?? []} colored={colored} updateKey={updateKey} />;
}
