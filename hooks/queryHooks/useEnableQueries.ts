import { QueryKeys } from "@/constants/QueryKeys"
import { useQueryClient } from "@tanstack/react-query"
import { usePlacesData } from "./usePlacesData"


export function useEnableQueries() {
    const placeQuery = usePlacesData()
    const enableQueries = () => {
        placeQuery.refetch();
    }


    return enableQueries
}