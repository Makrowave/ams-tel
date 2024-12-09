import { QueryKeys } from "@/constants/QueryKeys";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { QuerySrc } from "@/constants/QuerySrc";
import { Data, Record } from "@/constants/Types";
import useAuth from "../useAuth";

interface CategoryRecord {
  categoryId: Number;
  categoryName: string;
}

export type FetchHookReturn = {
  categoryData: Data;
  categoryIsPending: boolean;
  categoryIsError: boolean;
  categoryError: Error | null;
  categoryFindByKey: (value: Number | undefined) => string;
  categoryRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
};

export function useCategoriesData(): FetchHookReturn {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.Categories],
    queryFn: async () => {
      console.log("categoriesQueryTest");
      const response = await axiosPrivate.get(QuerySrc.Categories);
      return response.data.map((item: CategoryRecord) => ({ key: item.categoryId, value: item.categoryName }));
    },
    refetchInterval: 60 * 60 * 1000,
    refetchOnMount: false,
    enabled: !(user.token === ""),
  });

  const categoryFindByKey = (key: Number | undefined) => {
    if (key === undefined) return "";
    if (isPending) return "Ładowanie...";
    if (isError) return "Błąd";
    return data?.find((item: Record) => item.key === key)?.value;
  };

  return {
    categoryData: data,
    categoryIsPending: isPending,
    categoryIsError: isError,
    categoryError: error,
    categoryRefetch: refetch,
    categoryFindByKey,
  };
}
