import { QueryKeys } from "@/constants/QueryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { usePlacesData } from "./usePlacesData";
import { useStatusesData } from "./useStatusesData";

export function useEnableQueries() {
  const { placeRefetch } = usePlacesData();
  const { statusRefetch } = useStatusesData();
  const enableQueries = () => {
    // placeRefetch();
    // statusRefetch();
  };

  return enableQueries;
}
