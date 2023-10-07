import { useMessager } from '@/context/MessageContext'
import { cms_api } from '@/services/cms_api'
import { useQuery } from "react-query";
import React, { useEffect, useRef } from 'react'
import { Box, BoxProps, Flex, Icon, Spinner, Stack, StackProps, useBreakpointValue } from '@chakra-ui/react';
import { ProfileMessage } from './ProfileMessage';
import { IAuthors } from '@/pages/admin/interfaces';
import { RiArrowGoForwardFill } from 'react-icons/ri';

export const MessageAside = () => {
    const { navigationMessager, setNavigationMessager } = useMessager()
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })
    const stack: StackProps = {
        bg:"gray.800",
        h:{base: "100vh",md:"460px"},
        w: "100%",
        maxW: {md:"260px"},
        border:"2px",
        borderColor:"gray.400",
        borderRadius:"8px",
        overflow: "hidden",
        display: {base: (navigationMessager ? "flex" : "none"), md:"flex"},
        spacing: "0"
    }

    const { data: authors, isLoading  } = useQuery('authors', async () => {
        const token = sessionStorage.getItem('token')
        const config = {
            headers: {
            'Authorization': 'Bearer ' + token 
            }
        }
        const { data } = await cms_api.get("/admin/get-authors", config)
        
        const authors: IAuthors[] = data.authors
        return authors
    })
    
    
    return (
        <Stack {...stack}>
            {!isWideVersion && 
            <Flex bg="gray.900" py="2" px="4" justifyContent="flex-end">
                <Icon as={RiArrowGoForwardFill} fontSize="2xl" cursor="pointer" transition="all .15s" _hover={{color: "purple.300"}} 
                    onClick={() => setNavigationMessager(false)}/>
            </Flex>
            }
            {isLoading && <Spinner />}
            {authors && authors.map(author => (
                <Chat key={author.email} name={author.name} content={author.email} />
            ))}
            
        </Stack>
    )
}

interface ChatProps{
    name: string;
    content: string;
    avatar?: string;
}

function Chat({name, content, avatar}: ChatProps){
    const box: BoxProps = {
        textAlign:"start",
        overflow:"hidden",
        p:"4",
        cursor:"pointer",
        _hover:{bg:"gray.700"},
        _disabled:{bg:"gray.900"},
        w: "100%"
    }
    const { setNavigationMessager } = useMessager()
    const { setUser, user } = useMessager()
    const button = useRef<HTMLButtonElement>(null)
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })
    function handleActive(event: React.MouseEvent<HTMLButtonElement>){
        const buttons = document.querySelectorAll<HTMLButtonElement>('button[disabled]')
        buttons.forEach(btn => btn.disabled = false)
        event.currentTarget.disabled = !event.currentTarget.disabled
        setUser({email: content, name: name})
        if(!isWideVersion) {
          setNavigationMessager(false)  
        }
        
    }
    useEffect(() => {
        if(user.email === content){
            if(button.current){
                button.current.disabled = true
            }
        }
    }, [user])
    return (
        <Box as="button" ref={button} {...box} onClick={handleActive}>
            <ProfileMessage name={name} content={content} avatar={avatar}/>
        </Box>
    )
}