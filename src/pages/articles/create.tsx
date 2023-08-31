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
import {  Category, FormCreateArticles } from "../../interfaces/_interfaces";
import { GetServerSideProps } from "next";
import { cms_api } from "@/services/cms_api";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";



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

  const { register, handleSubmit, setValue, getValues } = useForm<FormCreateArticles>()
  const router = useRouter()

  const Submit: SubmitHandler<FormCreateArticles> = async (value, event) => {
    
    if(event){
      const button: HTMLButtonElement = event.target.querySelector('[data-click]')
      if ('datatype' in button.attributes) {
        if (button.getAttribute('datatype') === "draft") {
          return handleDraft(value)
        }
        return handlePublish(value)
        
      }
      
    }
    return null
  }

  function handleClickButton(event: MouseEvent){
    const buttons = document.querySelectorAll('[data-click]')
    for(let btn of buttons){
      btn.removeAttribute('data-click')
    }
    event.currentTarget.setAttribute('data-click', 'true')
  }
  async function handlePublish(value: FormCreateArticles){
    const state = !value.title || !value.subtitle || !value.text || !value.image || 
    !value.category || !value.tags || !value.credits ? "draft" : "active"
    const data = {
      article: {
        title: value.title ?? '',
        subtitle: value.subtitle ?? '',
        text: value.text ?? '',
        image: value.image ?? '',
        category: value.category ?? 'front-end',
        state: state,
      }, 
      tags: Array.from(value.tags || {}),
      credits: Array.from(value.credits || {}),
    }
    const token = sessionStorage.getItem('token')
    
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    }
    try {
      const response = await cms_api.post('/articles', data, config)
      router.back()
    } catch (error){
      //TODO: respostas de error
      console.log(error)
      alert(error)
    }
    
  }
  async function handleDraft(value: FormCreateArticles){
    
    const data = {
      article: {
        title: value.title ?? '',
        subtitle: value.subtitle ?? '',
        text: value.text ?? '',
        image: value.image ?? '',
        category: value.category ?? 'front-end',
        state: "draft",
      }, 
      tags: value.tags ? Array.from(value.tags) : null,
      credits: value.credits ? Array.from(value.credits) : null,
    }
    
    const token = sessionStorage.getItem('token')
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    }
    
    try {
      const response = await cms_api.patch('/articles', data, config)
      router.back()
    } catch(error){
      //TODO: respostas de error
      alert(error)
    }
    
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
      
          <Stack as="form" onSubmit={handleSubmit(Submit)} >
            <Flex gap="4" alignSelf="flex-end">
              <Button onClick={handleClickButton} type="submit" datatype="draft" fontFamily="Poppins" bg="gray.800" color="gray.300" _hover={{color:"gray.100", bg:"black"}}>
                RASCUNHO
              </Button>
              <Button onClick={handleClickButton} type="submit" datatype="publish" fontFamily="Poppins" bg="purple.300" color="white" _hover={{bg:"purple.700"}}>
                PUBLICAR
              </Button>
            </Flex>
            <Stack spacing="4" >
                  <TitleForms register={register}/>
                  <SubtitleForms register={register}/>
                  <ImageForms setValue={setValue} getValues={getValues}/>
                  <TextForms setValue={setValue} getValues={getValues}/>
                  <CategoryForms setValue={setValue} getValues={getValues} categories={categories} />
                  <TagsForms setValue={setValue} getValues={getValues}/>
                  <CreditsForms setValue={setValue} getValues={getValues}/>
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