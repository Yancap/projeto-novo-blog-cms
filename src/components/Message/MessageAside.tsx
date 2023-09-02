import { useMessager } from '@/context/MessageContext'
import { cms_api } from '@/services/cms_api'
import { useQuery } from "react-query";
import React from 'react'

export const MessageAside = () => {
    const { data: authors, isLoading, error, isRefetching, refetch } = useQuery('authors', async () => {
        const token = sessionStorage.getItem('token')
        const config = {
            headers: {
            'Authorization': 'Bearer ' + token 
            }
        }
        const { data: {authors} } = await cms_api.get("/admin/get-authors", config)
        

        return authors
    })
    
    const { setUser } = useMessager()
    console.log(authors);
    
    return (
    <div>MessageAside</div>
    )
}
