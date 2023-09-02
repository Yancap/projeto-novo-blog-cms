import { ReactNode, useEffect } from 'react'
import { Aside } from "@/components/Aside";
import { AsideLink } from "@/components/Aside/AsideLink";
import { Header } from "@/components/Header";
import { HeaderLink } from "@/components/Header/HeaderLink";
import { Container, ContainerProps, Flex, FlexProps, Stack, StackProps } from "@chakra-ui/react";
import {  RiFileTextLine, RiMessage3Line, RiMessage2Line } from "react-icons/ri";
import {  MdOutlinePeopleAlt } from "react-icons/md";
import {  LiaComment } from "react-icons/lia";
import { useManagement } from '@/context/ManagementContext';
import { useRouter } from 'next/router';
import { Message } from '../Message';
import { useMessager } from '@/context/MessageContext';

interface AdminProps extends StackProps{
    aside?: boolean;
    children: ReactNode
}

const main: FlexProps = {
  as:"main",
  overflowX:"hidden",
  pb:{base:"71px", md:"12"},
  align:"start",
  justify:"center",
  pt:{base:"4",md:"12"},
  maxW:"100vw",
  px:{base:4,sm:8,md:10, lg:0},
  position:"relative",
  minH:"100vh"
}

const container: ContainerProps = {
  as:"section",
  display:"flex",
  gap:"24",
  justifyContent:"space-between",
  w:"100%",
  maxW:{lg: 992,'2xl': 1124}
}

export const Main = ({children, aside=true, ...props}: AdminProps) => {

  const router = useRouter()
  const {profile, setProfile} = useManagement()
  const { messagerModal } = useMessager()

  useEffect(() => {
    const hierarchy = sessionStorage.getItem('hierarchy')
    const name = sessionStorage.getItem('name')
    const email = sessionStorage.getItem('email')
    const avatar = sessionStorage.getItem('avatar')
    if (hierarchy && name && email ) {

      setProfile({...profile, 
        ['hierarchy']: hierarchy,
        ['email']: email,
        ['name']: name,
        ['avatar']: avatar as string,
      })

    } else {
      router.push("/")
    } 
  }, [])
  return (
    <>
        <Header>
          <HeaderLink href='/admin'>Gerencia</HeaderLink>
          <HeaderLink href='/articles/create'>Novo artigo</HeaderLink>
          {profile.hierarchy === "admin" &&
          <HeaderLink href='/register-author'>Adicionar autor</HeaderLink>
          }
        </Header>
        <Flex {...main}>
            <Container {...container}>
                {aside && 
                <Aside>
                  <AsideLink href='comments' text='Comentários'  icon={RiMessage2Line}/>
                  {profile.hierarchy === "admin" &&
                    <>
                      <AsideLink href='articles' text='Artigos'  icon={RiFileTextLine}/>
                      <AsideLink href='authors'  text='Autores'  icon={MdOutlinePeopleAlt}/>
                    </>
                  }
                </Aside>
                }
                <Stack as="section" borderRadius={12} w={{base:"100%"}}
                px={["4", "8"]} py="8" bg="gray.900" spacing='6'  maxW="100%" {...props}>
                    {children}
                </Stack>
            </Container>
        </Flex>  
        
        { messagerModal && <Message />} 
    </>

  )
}
