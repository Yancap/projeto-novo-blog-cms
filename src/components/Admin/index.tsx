import {ReactNode} from 'react'
import { Aside } from "@/components/Aside";
import { AsideLink } from "@/components/Aside/AsideLink";
import { Header } from "@/components/Header";
import { HeaderLink } from "@/components/Header/HeaderLink";
import { Container, Flex, Stack } from "@chakra-ui/react";
import {  RiFileTextLine } from "react-icons/ri";
import {  MdOutlinePeopleAlt } from "react-icons/md";

interface AdminProps {
    children: ReactNode
}

export const Admin = ({children}: AdminProps) => {
  return (
    <>
         <Header>
            <HeaderLink>Artigos</HeaderLink>
            <HeaderLink>Criar</HeaderLink>
            <HeaderLink>Adicionar autor</HeaderLink>
        </Header>
        <Flex as="main" py="12" w="100vw"  px={{base: 8, xl: 0, '2xl': 0}}>
            <Container as="section" display="flex" gap="24" justifyContent="space-between" 
            w="100%" maxW={{lg: 1024,'2xl': 1124}}>
                <Aside>
                    <AsideLink text='Artigos'  icon={RiFileTextLine}/>
                    <AsideLink text='Autores'  icon={MdOutlinePeopleAlt}/>
                </Aside>
                <Stack as="section" borderRadius={12} w="55rem"
                px="8" py="8" bg="gray.900" spacing='6' overflow="hidden">
                    {children}
                </Stack>
            </Container>
        </Flex>   
    </>

  )
}
