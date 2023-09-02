import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { useRouter } from "next/router";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


interface PersonMessager {
    name: string;
    email: string;
}

interface MessagerContextInfo {
    messages: any;
    setMessages: any;
    user: PersonMessager;
    setUser: Dispatch<SetStateAction<PersonMessager>>;
    messagerModal: boolean;
    setMessagerModal: Dispatch<SetStateAction<boolean>>;
    asideMessager: boolean;
    setAsideMessager: Dispatch<SetStateAction<boolean>>;
}

const MessagerContext = createContext({} as MessagerContextInfo);

interface MessagerProviderProps{
    children: ReactNode
}
export function MessagerProvider({children}: MessagerProviderProps){
    const [messages, setMessages] = useState()
    const [user, setUser] = useState<PersonMessager>({
        name: "", email: ""
    })
    const [messagerModal, setMessagerModal] = useState(false)
    const [asideMessager, setAsideMessager] = useState(false)

    return (
        <MessagerContext.Provider value={{
            messages, setMessages,
            user, setUser,
            messagerModal, setMessagerModal,
            asideMessager, setAsideMessager
        }}>
            {children}
        </MessagerContext.Provider>
    )
}

export const useMessager = () => useContext(MessagerContext)