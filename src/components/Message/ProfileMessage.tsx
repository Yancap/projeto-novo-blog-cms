import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'


interface ProfileMessageProps {
    name: string;
    content: string;
    avatar?: string;
}

export const ProfileMessage = ({name, content, avatar}: ProfileMessageProps) => {
  return (
    <Flex gap="2">
        {avatar && avatar !== ""  ? 
        <Avatar size='md' name={name} src={avatar}/>
        : 
        <Avatar size='md' bg="gray.800" name={name} color="purple.700" fill="purple.700" border="2px" />
        }
        <Box>
            <Text maxW={["15ch","30ch"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" fontSize={{base:'md', xl:'lg'}}>
                {name}
            </Text>
            <Text maxW={["20ch","30ch"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" fontSize={{base:'xs', xl:'sm'}} color="purple.300">
                {content}
            </Text>
        </Box>
    </Flex>
  )
}
