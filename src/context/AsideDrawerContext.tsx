import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

const AsideDrawerContext = createContext({} as UseDisclosureReturn);

interface AsideDrawerProviderProps{
    children: ReactNode
}
export function AsideDrawerProvider({children}: AsideDrawerProviderProps){
    const disclosure = useDisclosure()
    const router = useRouter()
    useEffect(() => {
        disclosure.onClose()
    }, [router.asPath])
    return (
        <AsideDrawerContext.Provider value={disclosure}>
            {children}
        </AsideDrawerContext.Provider>
    )
}

export const useAsideDrawer = () => useContext(AsideDrawerContext)