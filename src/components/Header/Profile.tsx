import { useManagement } from '@/context/ManagementContext'
import { useMessager } from '@/context/MessageContext'
import {  Avatar, Box, Flex, FlexProps, Icon, Text, TextProps } from '@chakra-ui/react'
import React from 'react'
import { RiMessage3Line } from 'react-icons/ri'



export const Profile = () => {
  const { profile } = useManagement()
  const {setMessagerModal, setUser, messagerModal, setAsideMessager} = useMessager()

  const notification_container: FlexProps = {
    position:"relative",
    align:"center",
    py:"1",
    pr:"3",
    borderRight:"2px",
    borderColor:"gray.900",
    cursor:"pointer",
    transition:"all .15s",
    transform:"auto",
    _hover: {scale: 1.05}
  }
  const notification_span: TextProps = {
    as:"span",
    fontFamily:"Poppins",
    fontWeight:"medium",
    color:"purple.300",
    position:"absolute",
    fontSize:"sm",
    top:"0",
    right:"2"
  }
  return (
    <Flex gap={{base: "2", xl:"3"}} align="center">
        <Flex {...notification_container} 
        onClick={() => {
            setMessagerModal(true)
            if(profile.hierarchy === "admin"){
              setAsideMessager(true)
            }
        }}>
          <Text {...notification_span}>
            3
          </Text>
          <Icon as={RiMessage3Line} fontSize="2xl" color="gray.700" transition="all .15s" />
        </Flex>
        <Box display={{base: "none",md: "block"}} textAlign="end">
            <Text maxW={["8ch","12ch"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" fontSize={{base: "sm", xl:"md"}}>
                {profile.name}
            </Text>
            <Text maxW={["15ch","20ch"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" fontSize='xs' color="purple.300">
                {profile.email}
            </Text>
        </Box>
        {profile.avatar !== "" ? 
        <Avatar size={{base: "md", xl:"md"}} name={profile.name} src={profile.avatar}/>
        : 
        <Avatar size={{base: "md", xl:"md"}} bg="transparent" color="purple.700" fill="purple.700" border="2px" />
        }
    </Flex>
  )
}
