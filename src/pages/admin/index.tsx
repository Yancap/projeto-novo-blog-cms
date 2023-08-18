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

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  category: string;
  author: string;
  created_at: string;
  state: string;
  
}
export interface Authors {
  id: string;
  name: string;
  email: string;
  avatar: string | null | undefined;
  all_articles: number;
}
type Comments = {
  id: string;
  text: string;
  created_at: string;
  user_name: string;
}

export interface ArticleComments {
  comments: Comments[],
  article: {
      slug: string;
      title: string;
      category: string;
  }
}

interface AdminProps {
  articles: Article[];
}

export default function Admin({}: AdminProps) {

  const { data, isLoading, error } = useQuery('articles', async () => {
    
    const [articlesResponse, authorsResponse, commentsResponse] = await Promise.all([
      fetch("http://localhost:3000/api/articles"),
      fetch("http://localhost:3000/api/authors"),
      fetch("http://localhost:3000/api/comments")
    ])

    const [{articles}, authors, comments] = await Promise.all([
      articlesResponse.json(),
      authorsResponse.json(),
      commentsResponse.json()
    ])

    const published: Article[] = articles
    .filter((article: Article) => article.state === "active")

    const disabled: Article[] = articles
    .filter((article: Article) => article.state === "inactive")

    const drafts: Article[] = articles
    .filter((article: Article) => article.state === "draft")

    return {
      published, disabled, drafts, 
      articles, authors, comments
    }
  })
    
    
  console.log(data?.comments);
  
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
            navigation === "" ? <Publications articles={data?.published} isLoading={isLoading} error={error}/> : 
            navigation === "drafts" ? <Drafts articles={data?.drafts} isLoading={isLoading} error={error}/> : 
            navigation === "disabled" ? <Disabled articles={data?.disabled} isLoading={isLoading} error={error}/> : 
            navigation === "comments" ? <Comments comments={data?.comments} isLoading={isLoading} error={error}/>  : 
            navigation === "authors" ? <Authors authors={data?.authors} isLoading={isLoading} error={error}/>  : 
            navigation === "articles" ? <Articles articles={data?.articles} isLoading={isLoading} error={error}/> : null
            }
        </Main>
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
      //articles
    }
  }
}