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
import { IAuthors, IArticles  } from "./interfaces";



interface AdminProps {
  articles: IArticles[];
  hierarchy: string;
  published: IArticles[];
  disabled: IArticles[];
  drafts: IArticles[];
  authors: IAuthors[];
}

export interface Category {
  id: string;
  category: string;
}

export default function Admin({hierarchy,  published, disabled, drafts, authors, articles}: AdminProps) {
  
  const { data, isLoading, error } = useQuery('articles', async () => {
    
    const [articlesResponse, authorsResponse, commentsResponse, categoriesResponse] = await Promise.all([
      fetch("http://localhost:3000/api/articles"),
      fetch("http://localhost:3000/api/authors"),
      fetch("http://localhost:3000/api/comments"),
      fetch("http://localhost:3000/api/categories")
    ])

    const [{articles}, authors, comments, categories] = await Promise.all([
      articlesResponse.json(),
      authorsResponse.json(),
      commentsResponse.json(),
      categoriesResponse.json()
    ])

    const published: Article[] = articles
    .filter((article: Article) => article.state === "active")

    const disabled: Article[] = articles
    .filter((article: Article) => article.state === "inactive")

    const drafts: Article[] = articles
    .filter((article: Article) => article.state === "draft")

    return {
      published, disabled, drafts, 
      articles, authors, comments, categories
    }
  })
  const { navigation, setProfile } = useManagement()
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
            navigation === "" ? <Publications articles={published} /> : 
            navigation === "drafts" ? <Drafts articles={drafts} /> : 
            navigation === "disabled" ? <Disabled articles={disabled} /> : 
            navigation === "comments" ? <Comments comments={data?.comments} isLoading={isLoading} error={error}/>  : 
            navigation === "authors" ? <Authors authors={authors} />  : 
            navigation === "articles" ? <Articles categories={data?.categories} authors={authors} articles={articles}/> : null
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
  
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token 
    }
  }
  const { data: {articles} } = await cms_api.get("/articles", config)
  const { data: {authors} } = await cms_api.get("/admin/get-authors", config)
  const { data: {allArticles} } = await cms_api.get("/admin/get-all-articles", config)
  const { data: {categories} } = await cms_api.get("/admin/get-all-articles", config)

  const published: IArticles[] = articles
  .filter((article: IArticles) => article.state === "active")

  const disabled: IArticles[] = articles
  .filter((article: IArticles) => article.state === "inactive")

  const drafts: IArticles[] = articles
  .filter((article: IArticles) => article.state === "draft")
  
  return {
    props: {
      hierarchy,
      published,
      disabled,
      drafts,
      authors,
      articles: allArticles
    }
  }
}