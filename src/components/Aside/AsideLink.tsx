import { Icon, Link } from '@chakra-ui/react'
import React from 'react'

interface AsideLink {
    icon: React.JSXElementConstructor<any>
    text: string
}

export const AsideLink = ({icon, text}: AsideLink) => {
  return (
    <Link display="flex" gap="3" alignItems="center" color="gray.200" _hover={{color: "purple.300"}}>
        <Icon as={icon} fontSize="24"/>
        {text}
    </Link>
  )
}
