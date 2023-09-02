import { useMessager } from '@/context/MessageContext'
import { Box, BoxProps, Flex } from '@chakra-ui/react'
import React, {useEffect} from 'react'
import { MessageAside } from './MessageAside'
import { MessageContainer } from './MessageContainer'
import { useManagement } from '@/context/ManagementContext'

export const Message = () => {

  const box: BoxProps = {
    position:"fixed",
    top:"0",
    left:"0",
    h:"100vh",
    w:"100vw",
    blur:"4px",
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: 'auto',
    backdropBlur: "md",
    zIndex: "60"
  }

  const { asideMessager, setUser } = useMessager()
  const { profile } = useManagement()
  useEffect(() => {
    if(profile.hierarchy === "author") {
      setUser({name: "Yan Gabriel Ferreira", email: "yan@email.com"})
    }
  }, [])
  return (
    <Box  {...box}>
        <Flex>
          {asideMessager && <MessageAside />}
          <MessageContainer /> 
        </Flex>
    </Box>
  )
}
