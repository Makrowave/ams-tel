import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";
import { Data, Record } from "@/constants/Types";

interface PlaceRecord {
  statusId: Number;
  statusName: string;
}

export type FetchHookReturn = {
  statusData: Data;
  statusIsPending: boolean;
  statusIsError: boolean;
  statusError: Error | null;
  statusFindByKey: (value: Number | undefined) => string;
  statusRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export function useStatusesData(): FetchHookReturn {
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.Statuses],
    queryFn: async () => {
      const response = await axiosPrivate.get(QuerySrc.StatusesNotSold);
      return response.data.map((item: PlaceRecord) => ({ key: item.statusId, value: item.statusName }));
    },
    staleTime: 24 * 60 * 60 * 1000,
    enabled: false,
  });

  const statusFindByKey = (key: Number | undefined) => {
    if (key === undefined) return "";
    if (isPending) return "Ładowanie...";
    if (isError) return "Błąd";
    return data?.find((item: Record) => item.key === key)?.value;
  };

  return {
    statusData: data,
    statusIsPending: isPending,
    statusIsError: isError,
    statusError: error,
    statusRefetch: refetch,
    statusFindByKey,
  };
}
