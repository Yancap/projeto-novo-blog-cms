import { Box, Container, Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { Profile } from './Profile'
import { RiMenuLine } from 'react-icons/ri'
import { useAsideDrawer } from '@/context/AsideDrawerContext'

interface HeaderProps {
    children: React.ReactNode
}

export const Header = ({children}: HeaderProps) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })
  const { onOpen } = useAsideDrawer()
  return (
    <Flex as="header" maxW="100vw" px={{base: 4,sm: 8, md: 0}}  align="center" justify="center">
        <Container alignItems="center" justifyContent="space-between" 
        gap="8" display="flex" w="100%" maxW={{lg: 1024,'2xl': 1124}}
        py={{base: "6", md: 0}}>
            {!isWideVersion && (
            <IconButton icon={<Icon as={RiMenuLine}/>}  
                display="grid" placeContent="center"
                fontSize="24" variant="unstyled" aria-label='Open navigation' 
                onClick={onOpen} mr="2">
            </IconButton>
                
            )}
            <Flex justify="space-between" w="100%" maxW="580px" >
                <Image src="/logo.svg" alt='ARTechCMS' width="187" height="28"/>
                <Flex gap="8" left="0" bottom="0" 
                zIndex="10" 
                px={{base: 8, xl: 0,'2xl': 0}} 
                w={{"base": "100vw", "md": "auto"}} 
                bg={{"base": "gray.900", "md": "transparent"}} 
                position={{"base": "fixed", "md": "static"}}>
                    {children}
                </Flex>
            </Flex>
            <Box>
                <Profile />
            </Box>
        </Container>
    </Flex>
  )
}
