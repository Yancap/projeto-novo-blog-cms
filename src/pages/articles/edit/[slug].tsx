import Head from "next/head";
import dynamic from 'next/dynamic'
import { MouseEvent, useEffect } from "react";
import { Main } from "@/components/Main";
import { Button, Flex, HStack, Stack} from "@chakra-ui/react";
import { CreditsForms } from "@/components/CreateArticlesForms/CreditsForms";
import { TagsForms } from "@/components/CreateArticlesForms/TagsForms";
import { ImageForms } from "@/components/CreateArticlesForms/ImageForms";
import { SubtitleForms } from "@/components/CreateArticlesForms/SubtitleForms";
import { TitleForms } from "@/components/CreateArticlesForms/TitleForms";
import { useForm, SubmitHandler, UseFormGetValues } from "react-hook-form";
import {  Category, Credits, FormCreateArticles, Tags } from "../../../interfaces/_interfaces";
import { GetServerSideProps, GetStaticPaths } from "next";
import { cms_api } from "@/services/cms_api";
import { Article, IArticles } from "@/pages/admin/interfaces";
import { StateForms } from "@/components/CreateArticlesForms/StateForms";
import { useRouter } from "next/router";



const TextForms = dynamic(() => import("../../../components/CreateArticlesForms/TextForms"), {
  ssr: false
})

const CategoryForms = dynamic(() => import("../../../components/CreateArticlesForms/CategoryForms"), {
  ssr: false
})

interface CreateProps {
  categories: Category[];
  article: Article;
  credits: Credits[];
  tags: Tags[];
}

export default function Create({categories, article, credits, tags}: CreateProps) {

  const { register, handleSubmit, setValue, getValues   } = useForm<FormCreateArticles>()
  const router = useRouter()
  const Submit: SubmitHandler<FormCreateArticles> = async (value, event) => {
    const data = {
      article: {
        id: article.id,
        title: value.title ?? '',
        subtitle: value.subtitle ?? '',
        text: value.text ?? '',
        image: value.image ?? '',
        category: value.category ?? 'front-end',
        state: value.state ?? "inactive",
      }, 
      tags: Array.from(value.tags || {}),
      credits: Array.from(value.credits || {}),
    }
    const token = sessionStorage.getItem('token')
    const hierarchy = sessionStorage.getItem('hierarchy')
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    }
    
    try {
      const response = await cms_api.put('/articles', data, config)
      router.push(`/${hierarchy}`)
    } catch (error) {
      alert(error)
    }
    

  }
  
  
  useEffect(() => {
    setValue("title", article.title)
    setValue("subtitle", article.subtitle)
    setValue("image", article.image)
    setValue("text", article.text)
    setValue("category", article.category.category)
    setValue("state", article.state)
    if(credits.length !== 0){
      setValue("credits", credits)
    }
    if(tags.length !== 0){
      setValue("tags", tags)
    }
    
    
  }, [])
  return (
    <>
      <Head>
          <title>Editar | ARTechCMS</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main aside={false}>
      
          <Stack as="form" onSubmit={handleSubmit(Submit)} >
            <Flex gap="4" justifyContent="space-between">
                <StateForms setValue={setValue} getValues={getValues}/>
                <Button onClick={() => router.back()} type="submit" fontFamily="Poppins" bg="purple.300" color="white" _hover={{bg:"purple.700"}}>
                  ATUALIZAR
                </Button>
            </Flex>
            <Stack spacing="4" >
                  <TitleForms register={register}/>
                  <SubtitleForms register={register}/>
                  <ImageForms setValue={setValue} getValues={getValues}/>
                  <TextForms setValue={setValue} getValues={getValues}/>
                  <CategoryForms setValue={setValue} getValues={getValues} categories={categories} />
                  <TagsForms setValue={setValue} getValues={getValues}/>
                  <CreditsForms setValue={setValue} getValues={getValues} />
            </Stack>
          </Stack>
          
      </Main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req, res, params}) => {
  let { hierarchy, token } = req.cookies  
  const slug = params?.slug ?? '';

  
  if (!hierarchy || !token) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token 
    }
  }

  const { data: {categories} } = await cms_api.get("/categories", config)
  const { data: {article} } = await cms_api.post("articles/get", { slug }, config)
  const article_id = await article.id
  
  const { data: {credits}} = await cms_api.post("credits", { article_id } )
  const { data: {tags}} = await cms_api.post("tags", { article_id } )
  
  return {
    props: {
      categories,
      article,
      credits,
      tags
    }
  }
}