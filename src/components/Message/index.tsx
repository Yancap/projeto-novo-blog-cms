import { useMessager } from '@/context/MessageContext'
import { Box, BoxProps, Flex } from '@chakra-ui/react'
import React from 'react'
import { MessageAside } from './MessageAside'
import { MessageContainer } from './MessageContainer'

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

  const { asideMessager } = useMessager()

  return (
    <Box  {...box}>
        <Flex>
          {asideMessager && <MessageAside />}
          <MessageContainer /> 
        </Flex>
    </Box>
  )
}
