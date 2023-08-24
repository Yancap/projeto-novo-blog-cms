import { useManagement } from '@/context/ManagementContext'
import { Icon, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface AsideLink {
    icon: React.JSXElementConstructor<any>
    text: string
    href: string
}

export const AsideLink = ({icon, text, href}: AsideLink) => {
  const { navigation, useNavigation } = useManagement()
  return (
      <ChakraLink onClick={() => {}} display="flex" gap="3" alignItems="center" 
      color={href === navigation ? "purple.300" : "gray.200" } 
      fontWeight={href === navigation ? "bold" : "normal" } 
      _hover={{color: "purple.300"}}>
            <Icon as={icon} fontSize="24"/>
            {text}
      </ChakraLink>
  )
}
