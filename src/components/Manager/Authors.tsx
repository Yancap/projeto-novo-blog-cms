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

interface AuthorsProps {
    authors: IAuthors[];
    isLoading?: boolean;
    error?: unknown;
}

const Authors = ({authors, isLoading, error}: AuthorsProps) => {
    const [page, setPage ] = useState(1)
    const [authorsState, setAuthorsState] = useState(authors)
    const maxPages = (authorsState ) ? Number((authorsState .length / 10).toFixed())  : 0
    const [modalFilter, setModalFilter] = useState(false)
    const [filter, setFilter] = useState<FilterState | null>(null)
    const {setMessagerModal, setUser, messagerModal} = useMessager()

    useEffect(() => {
        if(!filter) {
            setAuthorsState(authors)
        }
        if(authorsState && filter && authors){
            console.log(filter);
            
            return setAuthorsState(() => {
                return filterForAuthors(filter, authors)
            })
        }
    }, [filter])
    return (
      <>
            <Flex as="header" align="center" justify="space-between">
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Autores
                </Heading>
                <Button as="a" fontWeight="normal" size="sm" cursor="pointer"
                fontSize="sm" bg="purple.700" color="white" _hover={{bg: "purple.800"}}
                onClick={() => setModalFilter(true)}>
                    Filtrar
                    <Icon as={RiFilter3Fill} fontSize="lg" ml="1"/>
                </Button>
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
                    {authorsState && authorsState.slice((page - 1) * 10, page * 10)
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
                                <Button fontWeight="normal" size="xs" fontSize="xs" colorScheme="red">
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
            <Filter active={modalFilter} setActive={setModalFilter} setFilter={setFilter}>
                <FilterHeader>
                    Ordenação
                </FilterHeader>
                <FilterContent  value='order' setFilter={setFilter}>
                    <Box >
                        <Checkbox id="data" value='authors' name='order'>
                            Autores
                        </Checkbox>
                        <Checkbox id="title" value='articles' name='order'>
                            Quantidade de Artigos
                        </Checkbox>
                    </Box>
                </FilterContent>
            </Filter>
            { messagerModal && <Message />}
      </>
    )
  }

  export default memo(Authors)