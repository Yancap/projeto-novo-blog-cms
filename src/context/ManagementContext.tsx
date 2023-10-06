import { useRouter } from "next/router";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface Profile {
    name: string;
    email: string;
    hierarchy: string;
    avatar: string;

}

interface ManagementsInfo {
    profile: Profile;
    setProfile: Dispatch<SetStateAction<Profile>>;
    hierarchy: string;
    useHierarchy: Dispatch<SetStateAction<string>>;
    navigation: string;
    setNavigation: Dispatch<SetStateAction<string>>;
}

const ManagementContext = createContext({} as ManagementsInfo);

interface ManagementProviderProps{
    children: ReactNode
}
export function ManagementProvider({children}: ManagementProviderProps){
    const [profile, setProfile] = useState<Profile>({} as Profile)
    const [hierarchy, useHierarchy] = useState("")
    const [navigation, setNavigation] = useState("")
    
    return (
        <ManagementContext.Provider value={{hierarchy, useHierarchy, navigation, setNavigation, profile, setProfile}}>
            {children}
        </ManagementContext.Provider>
    )
}

export const useManagement = () => useContext(ManagementContext)