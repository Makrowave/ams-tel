import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";
import { Data, Record } from "@/constants/Types";
import useAuth from "../useAuth";
import { Statuses } from "@/constants/UtilEnums";

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

export function useStatusesData(excluded: Array<Number> = [Statuses.sold]): FetchHookReturn {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const createQuery = () => {
    if (excluded.length === 0) return "";
    else {
      let result = "?";
      excluded.forEach((status) => (result = `${result}exclude=${status}&`));
      return result.slice(0, -1);
    }
  };
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.Statuses, excluded],
    queryFn: async () => {
      console.log("statusQueryTest");
      const response = await axiosPrivate.get(QuerySrc.Excluded + createQuery());
      return response.data.map((item: PlaceRecord) => ({ key: item.statusId, value: item.statusName }));
    },
    refetchInterval: 60 * 60 * 1000,
    enabled: !(user.token === ""),
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
