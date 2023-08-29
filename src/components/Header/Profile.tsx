import { useManagement } from '@/context/ManagementContext'
import {  Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'



export const Profile = () => {
  const { profile } = useManagement()
  return (
    <Flex gap={{base: "2", xl:"3"}} align="center">
        {profile.avatar !== "" ? 
        <Avatar size={{base: "sm", xl:"md"}} name={profile.name} src={profile.avatar}/>
        : 
        <Avatar size={{base: "sm", xl:"md"}} bg="transparent" color="purple.700" fill="purple.700" border="2px" />
        }
        <Box display={{base: "none",sm: "block"}}>
            <Text maxW={["10ch","12ch","20ch"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" fontSize={{base: "sm", xl:"md"}}>
                {profile.name}
            </Text>
            <Text maxW={["15ch","15ch","20ch"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" fontSize='xs' color="purple.300">
                {profile.email}
            </Text>
        </Box>
        
    </Flex>
  )
}
