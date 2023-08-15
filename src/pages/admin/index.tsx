import Head from "next/head";
import { Admin } from "@/components/Admin";
import { useManagement } from "@/context/ManagementContext";
import Publications from "@/components/Settings/Publications";
import Drafts from "@/components/Settings/Drafts";
import Disabled from "@/components/Settings/Disabled";
import Articles from "@/components/Manager/Articles";
import Authors from "@/components/Manager/Authors";
import { GetServerSideProps } from "next";
import { useMemo, useEffect, useState } from "react";
import { useQuery } from "react-query";

export interface Article {
  
  title: string;
  subtitle: string;
  text: string;
  category: string;
  author: string;
  created_at: string;
  state: string;
  
}

export default function Adm() {

    const [ articles, setArticles ] = useState<Article[] | null>(null)
    
    useEffect(() => {
      fetch("/api/articles")
      .then(res => res.json())
      .then(json => setArticles(json.articles))
    }, [])
    
    
    const PublicationsMemo = useMemo(() => <Publications articles={articles}/>, [articles])
    const DraftsMemo = useMemo(() => <Drafts />, [])
    const DisabledMemo = useMemo(() => <Disabled />, [])
    const AuthorsMemo = useMemo(() => <Authors/>, [])
    const ArticlesMemo = useMemo(() => <Articles />, [])
    
  const { navigation } = useManagement()

    return (
      <>
        <Head>
            <title>Admin | ARTechCMS</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Admin>
            {
            navigation === "" ? PublicationsMemo : 
            navigation === "drafts" ? DraftsMemo: 
            navigation === "disabled" ? DisabledMemo: 
            navigation === "authors" ? AuthorsMemo : 
            navigation === "articles" ? ArticlesMemo : null
            }
        </Admin>
      </>
    )
  }

export const getServerSideProps: GetServerSideProps = async ({req, res, params}) => {
  
  let hierarchy = "admin" 
  if (hierarchy !== "admin") {
    return {
      redirect: {
        destination: '/author',
        permanent: true
      }
    }
  }

  return {
    props: {
      
    }
  }
}