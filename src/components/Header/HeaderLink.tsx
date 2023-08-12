import { LinkBox } from '@chakra-ui/react'
import React from 'react'

interface HeaderLinkProps {
    children: React.ReactNode
}

export const HeaderLink = ({children}: HeaderLinkProps) => {
  return (
    <LinkBox boxSizing='content-box' py="6" px="2" 
    cursor="pointer" borderBottom={{md:"2px"}} borderTop={{base: "2px",md:"0px"}} transition="ease-in" transitionDuration=".15s"
    borderBottomColor={{md:"gray.800" }} borderTopColor={{base:"gray.800" }}
    _hover={{ borderBottomColor: "purple.700", borderTopColor: "purple.700"}}>
      {children}
    </LinkBox>
  )
}
