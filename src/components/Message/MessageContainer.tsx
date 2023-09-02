import { Box, BoxProps, Container, Flex, FlexProps, HStack, Icon, Spinner, Stack, StackProps, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { ProfileMessage } from './ProfileMessage'
import { RiCloseFill } from 'react-icons/ri'
import { MessageInput } from './MessageInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMessager } from '@/context/MessageContext'
import { buildChat, firebase_api, paginationMessagesInDatas } from '@/services/firebase_messager'
import { useManagement } from '@/context/ManagementContext'
import { useQuery } from 'react-query'

export interface MessageForm{
    message: string;
}

interface MessagesRequest {
    name: string;
    email: string;
    createdAt: string | string;
    message: string;
    date: string;
}
interface MessagesWithDatas {
    date: string;
    messages: MessagesRequest[]
}

export const MessageContainer = () => {
  const container: BoxProps = {
    bg:"black",
    w:"600px",
    border:"2px",
    borderRadius:"8px",
    borderColor:"gray.400"
  }
  const header: StackProps = {
    as:"header",
    w:"100%",
    justify:"space-between",
    px:"6",
    py:"3",
    borderBottom:"4px",
    borderColor:"purple.700"
  }
  const message_stack: StackProps = {
    px:"6",
    py:"3",
    h: "400px",
    spacing: "1",
    overflowY: "auto",
  }

  const { register, handleSubmit, resetField } = useForm<MessageForm>()
  const { setMessagerModal, user } = useMessager()
  const { profile } = useManagement()
  const messageStackRef = useRef<HTMLDivElement>(null)

  const { data, isRefetching, refetch   } = useQuery('chat', async () => {
    if(user.email !== "" && user.name !== "") {
        let adminEmail = ""
        let authorEmail = ""
        if(profile.hierarchy === "admin"){
            adminEmail = profile.email
            authorEmail = user.email
        } else {
            adminEmail = user.email
            authorEmail = profile.email
        }
        const chat = buildChat({ adminMail: adminEmail, authorMail: authorEmail })
        const { data } = await firebase_api.post<MessagesRequest[]>('get-chat', {chat})
        
        const messages = data.map( message => ({
            ...message,
            createdAt: `${new Date(message.createdAt).toLocaleString([], {  hour: '2-digit', minute: '2-digit' })}`
        }))
        
        const datas = paginationMessagesInDatas(messages)
        console.log(datas);
        
        return datas
    }
    return null
  })
  const Submit: SubmitHandler<MessageForm> = async (value, event) => {
    let adminEmail = ""
    let authorEmail = ""
    if(profile.hierarchy === "admin"){
        adminEmail = profile.email
        authorEmail = user.email
    } else {
        adminEmail = user.email
        authorEmail = profile.email
    }
    const chat = buildChat({ adminMail: adminEmail, authorMail: authorEmail })
    const send = {
        name: profile.name,
        email: profile.email,
        message: value.message,
        chat,
    }
    try{
        await firebase_api.post('send', send)
        resetField("message")
        refetch()
    } catch (error) {
        console.log(error);
    }
    
  }

  useEffect(()=>{
    refetch()
    if(messageStackRef.current){
        messageStackRef.current.scrollTo({
            top: messageStackRef.current.scrollHeight
        })
    }
  }, [user, data])
  
  return (
    <Box {...container}>
        <HStack {...header}>
            { user.email === "" && user.name === "" ? 
            <>
            <Text borderRadius="full" bg="gray.800" px="4" py="1">
                Selecione um chat
            </Text>
            </> :
            <ProfileMessage name={user.name} content={user.email}/>
            }
            <Icon as={RiCloseFill} fontSize="3xl" cursor="pointer" transition="all .15s" _hover={{color: "purple.300"}} 
                onClick={() =>{
                    setMessagerModal(false)
                }}/>
        </HStack>
        <Stack {...message_stack} ref={messageStackRef}>
            {isRefetching && <Spinner />}
            {data && data.map( item => (
                <>
                <DateMessage date={item.date}/>
                {item.messages.map( message => (
                    <MessageBox content={message.message} hour={message.createdAt} my={ profile.email === message.email}/>
                ))}
                
                </>
            ))}
        </Stack>
        <Box as="form" bg="gray.800" px="6" py="3" onSubmit={handleSubmit(Submit)}>
            <MessageInput {...register('message')} />
        </Box>
    </Box>
  )
}


interface MessageBoxProps {
    content: string;
    hour: string | number;
    my: boolean | false
}

function MessageBox({content, hour, my}: MessageBoxProps){
    const message_box: FlexProps = {
        borderRadius:"8px",
        gap:"2",
        bg: my ? 'purple.700' : 'gray.800',
        w:"fit-content",
        py: "2",
        px: "4",
        alignSelf: my ? 'flex-end' : 'stretch',
    }
    return (
        <Flex {...message_box}>
            <Text color="gray.100">
                {content}
            </Text>
            <Text fontSize="xs" color="purple.300" alignSelf="flex-end">
                {hour}
            </Text>
        </Flex>
    )
}
interface DateMessageProps {
    date: string;
}
function DateMessage({date}: DateMessageProps){
    const message_box: FlexProps = {
        borderRadius:"full",
        bg: 'purple.700',
        w:"fit-content",
        pb: "1",
        pt: "1.5",
        px: "6",
        alignSelf: 'center',
        alignItems: 'center',
        justify: 'center',
        my: "4",
    }
    return (
        <Flex {...message_box}>
            <Text color="gray.100" fontSize="sm" fontFamily="Poppins" fontWeight="bold">
                {date}
            </Text>
        </Flex>
    )
}