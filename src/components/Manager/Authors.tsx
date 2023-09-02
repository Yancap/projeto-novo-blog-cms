import Head from "next/head";
import {  Avatar, Box, Button,  Flex, Heading, Icon, Spinner, Text } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiDeleteBin6Line, RiFilter3Fill, RiMessage3Line } from "react-icons/ri";
import { memo, useEffect, useRef, useState } from "react";
import { FilterContent, FilterState } from "../Filter/FilterContent";
import { Filter } from "../Filter/index";
import { FilterHeader } from "../Filter/FilterHeader";
import { Checkbox } from "../Filter/Checkbox";
import { filterForAuthors } from "../Filter/services/filterForAuthors";
import { IAuthors } from "@/pages/admin/interfaces";
import { Message } from "../Message";
import { useMessager } from "@/context/MessageContext";
import { cms_api } from "@/services/cms_api";

interface AuthorsProps {
    authors: IAuthors[];
    isLoading?: boolean;
    error?: unknown;
    isRefetching: boolean;
    refetch: any;
}

const Authors = ({authors, isLoading, error, refetch, isRefetching}: AuthorsProps) => {
    const [page, setPage ] = useState(1)
    const maxPages = (authors ) ? Number((authors .length / 10).toFixed())  : 0
    const {setMessagerModal, setUser } = useMessager()

    async function handleDelete(author_id: string){
        const token = sessionStorage.getItem('token')
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token 
          },
          data: { author_id }
        }
        try{
            await cms_api.delete('admin/delete-authors', config)
            refetch()
        } catch(error) {
            console.log(error);
        }
    }
    return (
      <>
            <Flex as="header" align="center" justify="space-between">
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Autores

                    { isRefetching && <Spinner ml="4"/> }
                </Heading>
            </Flex>
            { isLoading && 
            <Flex justify='center'>
                <Spinner />
            </Flex>
            }
            { authors.length === 0 ? 
            <Flex justify='center'>
                <Text> Sem dados </Text>
            </Flex>
            
                : error ? 
            <Flex>
                <Text> Falha ao buscar os dados </Text>
            </Flex> :
            <>
                <Table>
                    <Thead>
                    
                        <Tr>
                            <Th>
                                Autor
                            </Th>
                            <Th>Quantidade de artigos</Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {authors && authors.slice((page - 1) * 10, page * 10)
                    .map(author =>
                        <Tr key={author.id}>
                            <Td minW="18rem">
                                <Flex gap="4" align="center">
                                    {author.avatar ? 
                                    <Avatar size='md' name='Yan Gabriel' src={author.avatar}/>
                                    : 
                                    <Avatar bg="gray.800" name={author.name} color="purple.700" fill="purple.700" border="2px" />
                                    }
                                    <Box display={{base: "none",sm: "block"}}>
                                        <Text>
                                            {author.name}
                                        </Text>
                                        <Text fontSize='xs' color="purple.300">
                                            {author.email}
                                        </Text>
                                    </Box>
                                    
                                </Flex>
                            </Td>
                            <Td minW="14rem">
                                <Text fontSize="sm" color="gray.300">
                                    {author.allArticles === 0 ? "N/A" :
                                    author.allArticles === 1 ? '1 Artigo' :
                                    `${author.allArticles} Artigos`
                                    }
                                </Text>
                            </Td>
                            <Td maxW="7.5rem">
                                <Button fontWeight="normal" size="xs" fontSize="xs" colorScheme="whiteAlpha" 
                                onClick={() => {
                                    setMessagerModal(true)
                                    setUser({name: author.name, email: author.email})
                                }}>
                                    <Icon as={RiMessage3Line} fontSize="md" mr="1"/>
                                    Mensagem
                                </Button>
                            </Td>
                            <Td>
                                <Button onClick={() => handleDelete(author.id)} fontWeight="normal" size="xs" fontSize="xs" colorScheme="red">
                                    <Icon as={RiDeleteBin6Line} fontSize="xs" mr="1"/>
                                    Excluir
                                </Button>
                            </Td>
                        </Tr>
                    )}
                    </Tbody>
                </Table>
                <Flex as="footer">
                    <Pagination page={page} setPage={setPage} maxPages={maxPages}/>
                </Flex>
            </>
            }
      </>
    )
  }

  export default memo(Authors)