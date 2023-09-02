import { useMessager } from '@/context/MessageContext'
import { cms_api } from '@/services/cms_api'
import { useQuery } from "react-query";
import React, { useEffect, useRef } from 'react'
import { Box, HStack, Spinner, Stack, StackProps } from '@chakra-ui/react';
import { ProfileMessage } from './ProfileMessage';
import { query } from 'firebase/database';
import { IAuthors } from '@/pages/admin/interfaces';

export const MessageAside = () => {
    const stack: StackProps = {
        bg:"gray.800",
        h:"460px",
        border:"2px",
        borderColor:"gray.400",
        borderRadius:"8px",
        overflow: "hidden"
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
    const { setUser, user } = useMessager()
    const button = useRef<HTMLButtonElement>(null)

    function handleActive(event: React.MouseEvent<HTMLButtonElement>){
        const buttons = document.querySelectorAll<HTMLButtonElement>('button[disabled]')
        buttons.forEach(btn => btn.disabled = false)
        event.currentTarget.disabled = !event.currentTarget.disabled
        setUser({email: content, name: name})
    }
    useEffect(() => {
        if(user.email === content){
            if(button.current){
                button.current.disabled = true
            }
            
        }
    }, [])
    return (
        <Box as="button" ref={button} textAlign="start" p="4" cursor="pointer" _hover={{bg: "gray.700"}} 
        onClick={handleActive} _disabled={{bg: "gray.700"}}>
            <ProfileMessage name={name} content={content} avatar={avatar}/>
        </Box>
    )
}