import {ReactNode} from 'react'
import { Aside } from "@/components/Aside";
import { AsideLink } from "@/components/Aside/AsideLink";
import { Header } from "@/components/Header";
import { HeaderLink } from "@/components/Header/HeaderLink";
import { Container, Flex, Stack } from "@chakra-ui/react";
import {  RiFileTextLine } from "react-icons/ri";
import {  MdOutlinePeopleAlt } from "react-icons/md";

interface AuthorProps {
    children: ReactNode
}

export const Author = ({children}: AuthorProps) => {
  return (
    <>
         <Header>
            <HeaderLink>Artigos</HeaderLink>
            <HeaderLink>Criar</HeaderLink>
        </Header>
        <Flex as="main" overflow="hidden" 
        align="center" justify="center" 
        py={{base:"16", md:"12"}} maxW="100vw"  px={{base: 4,sm: 8, md: 0}}>
            <Container as="section" display="flex" gap="24" 
              justifyContent="space-between"  w="100%" 
              maxW={{lg: 1024,'2xl': 1124}}>
                <Aside>
                    <AsideLink href='comments' text='Comentários'  icon={RiFileTextLine}/>
                </Aside>
                <Stack as="section" borderRadius={12} w={{base:"100%", md:"55rem"}}
                px="8" py="8" bg="gray.900" spacing='6' maxW="100%" >
                    {children}
                </Stack>
            </Container>
        </Flex>   
    </>

  )
}
