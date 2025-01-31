import { ProviderNodeProps } from "@/constants/Types";
import { createContext, ProviderProps, useRef, useState } from "react";

interface ActionResultContext {
  status: "success" | "failure" | "";
  message: string;
  visible: boolean;
  setFailure: (msg: string) => void;
  setSuccess: (msg: string) => void;
  clearInteractionResult: () => void;
}

export const ActionResult = createContext<ActionResultContext | undefined>(undefined);

export function ActionResultProvider({ children }: ProviderNodeProps) {
  const [status, setStatus] = useState<"success" | "failure" | "">("");
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout>();

  const setFailure = (msg: string) => {
    setStatus("failure");
    setMessage(msg);
    setVisible(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(clearInteractionResult, 3000);
  };
  const setSuccess = (msg: string) => {
    setStatus("success");
    setMessage(msg);
    setVisible(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(clearInteractionResult, 3000);
  };

  const clearInteractionResult = () => {
    setStatus("");
    setMessage("");
    setVisible(false);
    clearTimeout(timeout.current);
  };

  return (
    <ActionResult.Provider value={{ status, message, visible, setFailure, setSuccess, clearInteractionResult }}>
      {children}
    </ActionResult.Provider>
  );
}
