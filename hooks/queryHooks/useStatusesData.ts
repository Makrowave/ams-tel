import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";
import { ColorData, ColorRecord, Data, Record } from "@/constants/Types";
import useAuth from "../useAuth";
import { Statuses } from "@/constants/UtilEnums";

export interface StatusRecord {
  statusId: Number;
  statusName: string;
  hexCode: string;
}

export type FetchHookReturn = {
  statusData: ColorData;
  statusIsPending: boolean;
  statusIsError: boolean;
  statusError: Error | null;
  statusFindNameByKey: (value: Number | undefined) => string;
  statusFindByKey: (value: Number | undefined) => ColorRecord | undefined;
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
      return response.data.map((item: StatusRecord) => ({
        key: item.statusId,
        value: item.statusName,
        color: item.hexCode,
      }));
    },
    refetchInterval: 60 * 60 * 1000,
    enabled: !(user.token === ""),
  });

  const statusFindNameByKey = (key: Number | undefined) => {
    if (key === undefined) return "";
    if (isPending) return "Ładowanie...";
    if (isError) return "Błąd";
    return data?.find((item: ColorRecord) => item.key === key)?.value;
  };

  const statusFindByKey = (key: Number | undefined) => {
    return data?.find((item: ColorRecord) => item.key === key);
  };

  return {
    statusData: data,
    statusIsPending: isPending,
    statusIsError: isError,
    statusError: error,
    statusRefetch: refetch,
    statusFindNameByKey,
    statusFindByKey,
  };
}
