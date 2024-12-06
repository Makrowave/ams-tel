import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";
import useAuth from "../useAuth";

export interface Bike {
  id: Number;
  place: string;
  statusId: Number;
  status: string;
  assembledBy: string;
}

export type BikeData = Array<Bike> | undefined;

export type FetchHookReturn = {
  placeData: BikeData;
  placeIsPending: boolean;
  placeIsError: boolean;
  placeError: Error | null;
  selectFirstMatch: (placeId: Number, statusId: Number) => Number | undefined;
  placeRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export function usePlacesData(id: Number): FetchHookReturn {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.Bikes, id],
    queryFn: async () => {
      console.log("placesQueryTest");
      const response = await axiosPrivate.get(`${QuerySrc.BikesByModel}/${id}`);
      return response.data as BikeData;
    },
    enabled: !(user.token === ""),
  });

  const selectFirstMatch = (placeId: "" | Number, statusId: "" | Number) => {
    //Remember to change placeId comparison when API gets changed
    return data?.find((bike) => {
      bike.statusId === statusId && bike.place == placeId;
    })?.id;
  };

  return {
    placeData: data,
    placeIsPending: isPending,
    placeIsError: isError,
    placeError: error,
    placeRefetch: refetch,
    selectFirstMatch,
  };
}
