import Head from "next/head";
import { useManagement } from "@/context/ManagementContext";
import Publications from "@/components/Settings/Publications";
import Drafts from "@/components/Settings/Drafts";
import Disabled from "@/components/Settings/Disabled";
import Articles from "@/components/Manager/Articles";
import Authors from "@/components/Manager/Authors";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { Main } from "@/components/Main";
import Comments from "@/components/Manager/Comments";
import { cms_api } from "@/services/cms_api";
import { IAuthors, IArticles, Category,  ArticleComments  } from "./interfaces";



interface AdminProps {
  hierarchy: string;
}



export default function Admin() {
  const { data: temp, isLoading, error, isRefetching, refetch } = useQuery('admin', async () => {
    const token = sessionStorage.getItem('token')
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    }
    const { data: {articles} } = await cms_api.get("/articles", config)
    const { data: {authors} } = await cms_api.get("/admin/get-authors", config)
    const { data: {articles: allArticles} } = await cms_api.get("/admin/get-all-articles", config)
    const { data: {categories} } = await cms_api.get("/categories", config)
    const comments = []

    for(let article of articles){
      const { data } = await cms_api.get(`/comments/from-articles?article_id=${article.id}`, config)
      if(data){
        comments.push(data);
      }
    }
    
    const published: IArticles[] = articles
    .filter((article: IArticles) => article.state === "active")

    const disabled: IArticles[] = articles
    .filter((article: IArticles) => article.state === "inactive")

    const drafts: IArticles[] = articles
    .filter((article: IArticles) => article.state === "draft")

    return {
      published,
      disabled,
      drafts,
      authors,
      articles: allArticles ?? null,
      categories,
      comments
    }
  })

  const { navigation } = useManagement()
  return (
      <>
        <Head>
            <title>Admin | ARTechCMS</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Main>
            {
            navigation === "" ? <Publications articles={temp?.published} isLoading={isLoading}/> : 
            navigation === "drafts" ? <Drafts articles={temp?.drafts} isLoading={isLoading} isRefetching={isRefetching} refetch={refetch}/> : 
            navigation === "disabled" ? <Disabled articles={temp?.disabled} isLoading={isLoading} isRefetching={isRefetching} refetch={refetch}/> : 
            navigation === "comments" ? <Comments comments={temp?.comments} isLoading={isLoading}/>  : 
            navigation === "authors" ? <Authors authors={temp?.authors} isLoading={isLoading} isRefetching={isRefetching} refetch={refetch}/>  : 
            navigation === "articles" ? <Articles categories={temp?.categories} authors={temp?.authors} articles={temp?.articles} isRefetching={isRefetching} refetch={refetch}/> : null
            }
        </Main>
      </>
    )
  }

export const getServerSideProps: GetServerSideProps = async ({req, res, params}) => {
  
  let { hierarchy, token } = req.cookies 
  if (!hierarchy || !token || hierarchy !== "admin") {
    return {
      redirect: {
        destination: '/author',
        permanent: true
      }
    }
  }

  return {
    props: {
      hierarchy
    }
  }
}