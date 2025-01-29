import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";
import { Data, Record } from "@/constants/Types";
import useAuth from "../contexts/useAuth";

interface PlaceRecord {
  placeId: Number;
  placeName: string;
}

export type FetchHookReturn = {
  placeData: Data;
  placeIsPending: boolean;
  placeIsError: boolean;
  placeError: Error | null;
  placeFindByKey: (value: Number | undefined) => string;
  placeRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export function usePlacesData(): FetchHookReturn {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.Places],
    queryFn: async () => {
      console.log("placesQueryTest");
      const response = await axiosPrivate.get(QuerySrc.Places);
      return response.data.map((item: PlaceRecord) => ({ key: item.placeId, value: item.placeName }));
    },
    refetchInterval: 60 * 60 * 1000,
    enabled: !(user.token === ""),
  });

  const placeFindByKey = (key: Number | undefined) => {
    if (key === undefined) return "";
    if (isPending) return "Ładowanie...";
    if (isError) return "Błąd";
    return data?.find((item: Record) => item.key === key)?.value;
  };

  return {
    placeData: data,
    placeIsPending: isPending,
    placeIsError: isError,
    placeError: error,
    placeRefetch: refetch,
    placeFindByKey,
  };
}
