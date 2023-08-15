import { LinkBox } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface HeaderLinkProps {
  href: string
  children: React.ReactNode
}

export const HeaderLink = ({children, href}: HeaderLinkProps) => {
  const { asPath } = useRouter()
  return (
    <Link href={href}>
      <LinkBox boxSizing='content-box' py="6" px="2" 
      fontWeight={asPath === href ? "medium" : "light"}
      cursor="pointer" borderBottom={{md:"2px"}} borderTop={{base: "2px", md:"0px"}} transition="ease-in" transitionDuration=".15s"
      borderBottomColor={asPath === href ? { md:"purple.700" } : { md:"gray.800" }} 
      borderTopColor={asPath === href ? "purple.700"  :  "gray.900" } 
      _hover={{ borderBottomColor: "purple.700", borderTopColor: "purple.700"}}>
        {children}
      </LinkBox>
    </Link>
  )
}
