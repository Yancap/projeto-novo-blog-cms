import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface Tags {
    tag: string;
}

interface Credits{
    name: string;
    link: string;
}

export interface FormCreateArticles{
    title: string;
    subtitle: string;
    image: string | ArrayBuffer | null;
    text: string;
    category: string;
    tags: Tags[];
    credits: Credits[];
}

interface CreateArticlesInfo {
    form: FormCreateArticles;
    setForm: Dispatch<SetStateAction<FormCreateArticles>>;
}

const CreateArticlesContext = createContext({} as CreateArticlesInfo);

interface CreateArticlesProviderProps{
    children: ReactNode
}
export function CreateArticlesProvider({children}: CreateArticlesProviderProps){
    const [form, setForm] = useState<FormCreateArticles>({} as FormCreateArticles)
    
    return (
        <CreateArticlesContext.Provider value={{ form, setForm }}>
            {children}
        </CreateArticlesContext.Provider>
    )
}

export const useCreateArticles = () => useContext(CreateArticlesContext)