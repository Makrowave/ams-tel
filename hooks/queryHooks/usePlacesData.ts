import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";

type Data = Array<Record> | undefined;

interface PlaceRecord {
    placeId: Number,
    placeName: string,
}

interface Record {
    key: Number,
    value: string,
}

type ReturnType = {
    placeData: Data;
    placeIsPending: boolean;
    placeIsError: boolean;
    placeError: Error | null;
    placeFindByKey: (value: Number | undefined) => string;
    placeRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
}

export function usePlacesData(): ReturnType {
    const axiosPrivate = useAxiosPrivate();
    const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.Places],
    queryFn: async () => {
      const response = await axiosPrivate.get(QuerySrc.Places);
      return response.data.map((item: PlaceRecord) => ({key: item.placeId, value: item.placeName}));
    },
    staleTime: 24 * 60 * 60 * 1000,
    enabled: false
    });

    const placeFindByKey = (key: Number| undefined) => {
        if(key === undefined) return "";
        if(isPending) return "Ładowanie...";
        if(isError) return "Błąd";
        return data?.find((item: Record) => item.key === key)?.value
    }
   
  return { placeData: data, placeIsPending: isPending, placeIsError: isError, placeError: error, placeRefetch: refetch, placeFindByKey };
}