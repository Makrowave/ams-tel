import { ConstantsContext } from "@/components/contexts/ConstantsContext";
import { useContext } from "react";

export function useConstantsContext() {
    const context = useContext(ConstantsContext);
    if(!context) {
        throw new Error('useActionData must be used within within an ConstantsContext');
    }
    return context;
}