import { Box, Container, ContainerProps, Flex, FlexProps, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import { Profile } from './Profile'
import { RiMenuLine } from 'react-icons/ri'
import { useAsideDrawer } from '@/context/AsideDrawerContext'
import { useRouter } from 'next/router'

interface HeaderProps {
    children: React.ReactNode
}


export const Header = ({children}: HeaderProps) => {

  const { asPath } = useRouter() 
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  const { onOpen } = useAsideDrawer()

  const header: FlexProps = {
    as:"header",
    maxW:"100vw",
    px:{base:4,sm:8,md:10,lg:0},
    align:"center",
    justify:"center"
  }
  const container: ContainerProps = {
    alignItems:"center",
    justifyContent:"space-between",
    gap:"8",
    display:"flex",
    w:"100%",
    maxW:{lg:992,'2xl':1024},
    py:{base: "6", md: 0},
    pt:{base: 2, md: 2}
  }
  const nav: FlexProps = {
    as:"nav",
    gap:{base:"2",sm:"4"},
    left:"0",
    bottom:"0",
    zIndex:"10",
    px:{base:8,xl:0,'2xl':0},
    w:{base:"100vw",md:"auto"},
    bg:{base:"gray.900",md:"transparent"},
    position:{base:"fixed",md:"static"}
  }
  return (
    <Flex {...header}>
        <Container {...container}>
            {(!isWideVersion && (asPath === "/admin" || asPath === "/author"))&& (
            <IconButton icon={<Icon as={RiMenuLine}/>}  
                display="grid" placeContent="center"
                fontSize="24" variant="unstyled" aria-label='Open navigation' 
                onClick={onOpen} mr="2">
            </IconButton>
                
            )}
            <Flex gap="8"  >
                <Image src="/logo.svg" alt='ARTechCMS' width="187" height="28"/>
                <Flex {...nav}>
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
