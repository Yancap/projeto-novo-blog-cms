import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading,  Stack, useBreakpointValue } from '@chakra-ui/react'
import {  RiFileEditLine } from "react-icons/ri";
import { MdCloudOff } from 'react-icons/md'
import {  BsGlobe2 } from "react-icons/bs";
import React from 'react'
import { AsideLink } from './AsideLink';
import { useAsideDrawer } from '@/context/AsideDrawerContext';

interface AsideProps {
    children: React.ReactNode
}

export const Aside = ({children}: AsideProps) => {

  const { isOpen, onClose } = useAsideDrawer()

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })
  
  
  if(isDrawerSidebar){
    return (
        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent bg="gray.800" p="4">
                    <DrawerCloseButton mt="6"/>
                    <DrawerHeader>
                        Navegação
                    </DrawerHeader>
                    <DrawerBody>
                    <Stack as="aside" py="8" spacing="12">
                        <Stack spacing="3">
                            <Heading as="h4" marginBottom="2" fontSize="12px" fontWeight="extrabold" color="gray.400">
                                Configurações
                            </Heading>
                            <AsideLink href='/settings/publications' text='Publicações'  icon={BsGlobe2}/>
                            <AsideLink href='/settings/drafts' text='Rascunhos'  icon={RiFileEditLine}/>
                            <AsideLink href='/settings/disabled' text='Desativados'  icon={MdCloudOff}/>
                        </Stack>
                        <Stack spacing="3">
                            <Heading as="h4" marginBottom="2" fontSize="12px" fontWeight="extrabold" color="gray.400">
                                Gerenciar
                            </Heading>
                            {children}
                        </Stack>
                    </Stack>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
  }
  return (
    <Stack as="aside" py="8" spacing="12" w="8rem">
        <Stack spacing="3">
            <Heading as="h4" marginBottom="2" fontSize="12px" fontWeight="extrabold" color="gray.400">
                Configurações
            </Heading>
            <AsideLink href='' text='Publicações'  icon={BsGlobe2}/>
            <AsideLink href='drafts' text='Rascunhos'  icon={RiFileEditLine}/>
            <AsideLink href='disabled' text='Desativados'  icon={MdCloudOff}/>
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
