import { useRouter } from "next/router";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface ManagementsInfo {
    hierarchy: string;
    useHierarchy: Dispatch<SetStateAction<string>>;
    navigation: string;
    useNavigation: Dispatch<SetStateAction<string>>;
}

const ManagementContext = createContext({} as ManagementsInfo);

interface ManagementProviderProps{
    children: ReactNode
}
export function ManagementProvider({children}: ManagementProviderProps){
    const [hierarchy, useHierarchy] = useState("admin")
    const [navigation, useNavigation] = useState("")
    
    return (
        <ManagementContext.Provider value={{hierarchy, useHierarchy, navigation, useNavigation}}>
            {children}
        </ManagementContext.Provider>
    )
}

export const useManagement = () => useContext(ManagementContext)