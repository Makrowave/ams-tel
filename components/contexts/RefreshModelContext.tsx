import { ProviderNodeProps } from "@/constants/Types";
import { createContext, ProviderProps, useState } from "react";

interface RefreshModel {
  refreshModel: boolean;
  setRefreshModel: (value: boolean) => void;
}

export const RefreshModel = createContext<RefreshModel | undefined>(undefined);

export function RefreshModelProvider({ children }: ProviderNodeProps) {
  const [refreshModel, setRefreshModel] = useState<boolean>(false);

  return <RefreshModel.Provider value={{ refreshModel, setRefreshModel }}>{children}</RefreshModel.Provider>;
}
