import Head from "next/head";
import dynamic from 'next/dynamic'
import { Main } from "@/components/Main";
import { Button, Flex, Stack} from "@chakra-ui/react";
import { CreditsForms } from "@/components/CreateArticlesForms/CreditsForms";
import { TagsForms } from "@/components/CreateArticlesForms/TagsForms";
//import { TextForms } from "@/components/CreateArticlesForms/TextForms";
import { ImageForms } from "@/components/CreateArticlesForms/ImageForms";
import { SubtitleForms } from "@/components/CreateArticlesForms/SubtitleForms";
import { TitleForms } from "@/components/CreateArticlesForms/TitleForms";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery } from "react-query";
import {  Category, FormCreateArticles } from "../../interfaces/_interfaces";
import { GetServerSideProps } from "next";
import { cms_api } from "@/services/cms_api";



const TextForms = dynamic(() => import("../../components/CreateArticlesForms/TextForms"), {
  ssr: false
})

const CategoryForms = dynamic(() => import("../../components/CreateArticlesForms/CategoryForms"), {
  ssr: false
})

interface CreateProps {
  categories: Category[];
}

export default function Create({categories}: CreateProps) {



  const { register, handleSubmit, setValue   } = useForm<FormCreateArticles>()
  const handleSignIn: SubmitHandler<FormCreateArticles> = (value, event) => {

    const state = !value.title || !value.subtitle || !value.text || !value.image || 
    !value.category || !value.tags || !value.credits ? "draft" : "active"

    const data = {
      article: {
        title: value.title ?? '',
        subtitle: value.subtitle ?? '',
        text: value.text ?? '',
        image: value.image ?? '',
        category: value.category ?? '',
        state: state,
      }, 
      tags: Array.from(value.tags || {}),
      credits: Array.from(value.credits || {}),
    }
    console.log(data);
    
    //const articles = await cms_api.post('/articles', value)
  }
  
  return (
    <>
      <Head>
          <title>Criar | ARTechCMS</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main aside={false}>
      
          <Stack as="form" onSubmit={handleSubmit(handleSignIn)}>
            <Flex gap="4" alignSelf="flex-end">
              <Button fontFamily="Poppins" bg="gray.800" color="gray.300" _hover={{color:"gray.100", bg:"black"}}>
                RASCUNHO
              </Button>
              <Button type="submit" fontFamily="Poppins" bg="purple.300" color="white" _hover={{bg:"purple.700"}}>
                SALVAR
              </Button>
            </Flex>
            <Stack spacing="4" >
                  <TitleForms register={register}/>
                  <SubtitleForms register={register}/>
                  <ImageForms setValue={setValue}/>
                  <TextForms setValue={setValue}/>
                  <CategoryForms setValue={setValue} categories={categories} />
                  <TagsForms setValue={setValue}/>
                  <CreditsForms setValue={setValue}/>
            </Stack>
          </Stack>
          
      </Main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res, params}) => {
  let { hierarchy, token } = req.cookies  

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

  return {
    props: {
      categories
    }
  }
}