import { Box, Container, Flex, Icon } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { Profile } from './Profile'

interface HeaderProps {
    children: React.ReactNode
}

export const Header = ({children}: HeaderProps) => {
  return (
    <Flex as="header" w="100vw" px={{base: 8, xl: 0,'2xl': 0}}  align="center" justify="center">
        <Container alignItems="center" justifyContent="space-between" 
        gap="8" display="flex" w="100%" maxW={{lg: 1024,'2xl': 1124}}
        py={{base: "6", md: 0}}>
            <Flex justify="space-between" w="100%" maxW="580px" >
                <Image src="/logo.svg" alt='ARTechCMS' width="187" height="28"/>
                <Flex gap="8" bottom="0" position={{"base": "fixed", "md": "static"}}>
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
