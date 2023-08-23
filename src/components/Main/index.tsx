import { ReactNode } from 'react'
import { Aside } from "@/components/Aside";
import { AsideLink } from "@/components/Aside/AsideLink";
import { Header } from "@/components/Header";
import { HeaderLink } from "@/components/Header/HeaderLink";
import { Container, Flex, Stack } from "@chakra-ui/react";
import {  RiFileTextLine, RiMessage3Line, RiMessage2Line } from "react-icons/ri";
import {  MdOutlinePeopleAlt } from "react-icons/md";
import {  LiaComment } from "react-icons/lia";
import { useManagement } from '@/context/ManagementContext';

interface AdminProps {
    aside?: boolean;
    children: ReactNode
}

export const Main = ({children, aside=true, ...props}: AdminProps) => {


  const {hierarchy} = useManagement()
  return (
    <>
         <Header>
            <HeaderLink href='/admin'>Gerencia</HeaderLink>
            <HeaderLink href='/create'>Novo artigo</HeaderLink>
            {hierarchy === "admin" &&
            <HeaderLink href='/register-author'>Adicionar autor</HeaderLink>
            }
        </Header>
        <Flex as="main" overflow-x="hidden" pb={{base:"71px", md:"12"}}
         align="start" justify="center" pt={{base:"4", md:"12"}} 
         maxW="100vw" px={{base: 4,sm: 8, md: 0}}
         position="relative" minH="100vh">
            <Container as="section" display="flex" gap="24" 
              justifyContent="space-between"  w="100%" 
              maxW={{lg: 1024,'2xl': 1124}}>
                {aside && 
                <Aside>
                    <AsideLink href='comments' text='Comentários'  icon={RiMessage2Line}/>

                    {hierarchy === "admin" &&
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
    </>

  )
}
