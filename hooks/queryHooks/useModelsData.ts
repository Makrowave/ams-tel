import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";
import { ModelData, ModelRecordData } from "@/constants/Types";
import useAuth from "../contexts/useAuth";

export type FetchHookReturn = {
  modelData: ModelData;
  modelIsPending: boolean;
  modelIsError: boolean;
  modelError: Error | null;
  modelFindByEan: (value: String) => ModelRecordData | undefined;
  modelRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export function useModelsData(queryString: string): FetchHookReturn {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.Models, queryString],
    queryFn: async () => {
      const response = await axiosPrivate.get(QuerySrc.Models + queryString);
      return response.data;
    },
    refetchInterval: 5 * 1000,
    enabled: !(user.token === ""),
  });

  const modelFindByEan = (ean: String): ModelRecordData | undefined => {
    return data?.find((item: ModelRecordData) => item.eanCode === ean);
  };

  return {
    modelData: data,
    modelIsPending: isPending,
    modelIsError: isError,
    modelError: error,
    modelRefetch: refetch,
    modelFindByEan,
  };
}
