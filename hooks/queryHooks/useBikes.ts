import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";
import useAuth from "../contexts/useAuth";

export interface Bike {
  id: Number;
  place: Number;
  statusId: Number;
  status: string;
  assembledBy: string;
}

export type BikeData = Array<Bike> | undefined;

export type FetchHookReturn = {
  bikeData: BikeData;
  bikeIsPending: boolean;
  bikeIsError: boolean;
  bikeError: Error | null;
  selectFirstMatch: (placeId: Number, statusId: Number) => Number | undefined;
  bikeRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export function useBikes(id: Number): FetchHookReturn {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.Bikes, id],
    queryFn: async () => {
      console.log("bikeQueryTest");
      console.log(`${QuerySrc.BikesByModel}/${id}`);
      const response = await axiosPrivate.get(`${QuerySrc.BikesByModel}/${id}`);
      console.log(response.data);
      return response.data as BikeData;
    },
    enabled: !(user.token === "" || id === 0),
  });

  const selectFirstMatch = (placeId: "" | Number, statusId: "" | Number) => {
    //Remember to change placeId comparison when API gets changed
    return data?.find((bike) => {
      return bike.statusId === statusId && bike.place == placeId;
    })?.id;
  };

  return {
    bikeData: data,
    bikeIsPending: isPending,
    bikeIsError: isError,
    bikeError: error,
    bikeRefetch: refetch,
    selectFirstMatch,
  };
}
