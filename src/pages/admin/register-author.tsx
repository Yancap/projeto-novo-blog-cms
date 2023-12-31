import Head from 'next/head'
import { Flex, Text, Box, Stack, Button, Heading, FlexProps, ButtonProps } from '@chakra-ui/react'
import { Input } from '@/components/Input/index'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Main } from '@/components/Main'
import { useForm, SubmitHandler } from "react-hook-form";
import { cms_api } from '@/services/cms_api'

interface RegisterAuthor {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function RegisterAuthor() {
  const container: FlexProps = {
    alignSelf:"center",
    as:"section",
    justify:"center",
    align:"center",
    w:"100%",
    mb:{base:"5rem",sm:"4"},
    py:{base:"0",sm:"4"},
    px:"4"
  }

  const form: FlexProps = {
    as:"form",
    gap:["8","12"],
    direction:"column",
    py:"8",
    borderRadius:8
  }
  const btn: ButtonProps = {
    size:['md','lg'],
    bg:"purple.700",
    fontSize:"xl",
    color:"white",
    _hover:{bgColor: 'purple.800'}
  }

  const { register, handleSubmit, watch, formState } = useForm<RegisterAuthor>()

  const router = useRouter()
  const submit: SubmitHandler<RegisterAuthor> = async (value, event) => {
    const token = sessionStorage.getItem('token')
    
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    }

    const data = {
      name: value.name,
      email: value.email,
      password: value.password
    }
    
    try {
      const response = await cms_api.post('/admin/register', data, config)
      router.back()
    } catch (error){
      console.log(error)
      alert(error)
    }
  }
  return (
    <>
      <Head>
        <title>Register Author | ARTechCMS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Main aside={false}>
        <Flex {...container} onSubmit={handleSubmit(submit)}>
          <Flex {...form}>
            <Heading >Registre um autor</Heading>
            <Stack spacing="5">
              <Flex gap="4" direction={{base: "column", sm: "row"}}>
                <Input type='text' label='Nome' error={formState.errors.name} {...register('name', { required: true })}/>
                <Input type='email' label='E-mail' error={formState.errors.email} {...register('email', { required: true } )}/>
              </Flex>
              <Flex gap="4" direction={{base: "column", sm: "row"}}>
                <Input type='password' label='Senha' error={formState.errors.password} {...register('password', { required: true })}/>
                <Input type='password' label='Confirmar Senha' error={formState.errors.confirm_password} {...register('confirm_password', { required: true, 
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "Suas senhas não combinam";
                  }
                } })}/>
              </Flex>
            </Stack>
            <Button type="submit" {...btn}>
              Registrar
            </Button>
          </Flex>
        </Flex>
      </Main>
      

    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({req, res, params}) => {
  
  let { hierarchy, token } = req.cookies 
  if (!hierarchy || !token || hierarchy !== "admin") {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  return {
    props: {
      
    }
  }
}