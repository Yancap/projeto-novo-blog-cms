'use client'
import { useManagement } from '@/context/ManagementContext'
import { Icon, Link as ChakraLink } from '@chakra-ui/react'
import React from 'react'

interface AsideLink {
    icon: React.JSXElementConstructor<any>
    text: string
    href: string
}

export const AsideLink = ({icon, text, href}: AsideLink) => {
  const { navigation, setNavigation } = useManagement()
  const link = {
    display:"flex",
    gap:"3",
    alignItems:"center",
    color: href === navigation ? "purple.300" : "gray.200",
    fontWeight: href === navigation ? "bold" : "normal",
    _hover:{color: "purple.300"}
  }
  
  return (
    <ChakraLink onClick={() => setNavigation(href)} {...link}>
      <Icon as={icon} fontSize="24"/>
      {text}
    </ChakraLink>
  )
}
