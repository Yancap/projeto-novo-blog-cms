import {  Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'



export const Profile = () => {
  return (
    <Flex gap="4" align="center">
        <Box>
            <Text>
                Yan Gabriel
            </Text>
            <Text fontSize='xs' color="purple.300">
                yan@email.com
            </Text>
        </Box>
        
        {null ? 
        <Avatar size='md' name='Yan Gabriel' src=''/>
        : 
        <Avatar bg="transparent" color="purple.700" fill="purple.700" border="2px" />
        }
        
    </Flex>
  )
}
