import { Heading,  Stack } from '@chakra-ui/react'
import {  RiFileEditLine } from "react-icons/ri";
import { MdCloudOff } from 'react-icons/md'
import {  BsGlobe2 } from "react-icons/bs";
import React from 'react'
import { AsideLink } from './AsideLink';

interface AsideProps {
    children: React.ReactNode
}

export const Aside = ({children}: AsideProps) => {
  return (
    <Stack as="aside" py="8" spacing="12">
        <Stack spacing="3">
            <Heading as="h4" marginBottom="2" fontSize="12px" fontWeight="extrabold" color="gray.400">
                Configurações
            </Heading>
            <AsideLink text='Publicações'  icon={BsGlobe2}/>
            <AsideLink text='Rascunhos'  icon={RiFileEditLine}/>
            <AsideLink text='Desativados'  icon={MdCloudOff}/>
        </Stack>
        <Stack spacing="3">
            <Heading as="h4" marginBottom="2" fontSize="12px" fontWeight="extrabold" color="gray.400">
                Gerenciar
            </Heading>
            {children}
        </Stack>
    </Stack>
  )
}
