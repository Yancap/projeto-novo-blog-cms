import Head from "next/head";
import {  Button,  Flex, Heading, Icon, Text, Spinner } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { PiPlusBold } from "react-icons/pi";
import { memo, useState } from "react";
import { IArticles } from "@/pages/admin/interfaces";
import { useRouter } from "next/router";
import Link from "next/link";
import { cms_api } from "@/services/cms_api";

interface DraftsProps {
    articles?: IArticles[];
    isLoading?: boolean;
    error?: unknown;
    isRefetching?: boolean;
    refetch?: any
}

const Drafts = ({articles, isLoading, error,  isRefetching, refetch}: DraftsProps) => {
    const [page, setPage ] = useState(1)
    const maxPages = (articles) ? Number((articles.length / 10).toFixed())  : 0
    const router = useRouter()

    async function handleDelete(id: string){
        const token = sessionStorage.getItem('token')
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token 
          },
          data: { id }
        }

        try {
            const response = await cms_api.delete('/articles',  config)
            refetch()
        } catch (error){
            console.log(error);
        }
    }
    return (
        <>
            <Flex as="header" align="center" justify="space-between">
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Rascunhos
                    { isRefetching && <Spinner ml="4"/> }
                </Heading>
                <Link href='/articles/create'>
                    <Button as="button" fontWeight="normal" size="sm" cursor="pointer"
                    fontSize="sm" bg="purple.700" color="white" _hover={{bg: "purple.800"}}>
                        <Icon as={PiPlusBold} fontSize="sm" mr="1"/>
                        Criar novo
                    </Button>
                </Link>
            </Flex>
            { isLoading && 
                <Flex justify='center'>
                    <Spinner />
                </Flex>
            }
          { articles && articles.length === 0 ? 
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
                            Titulo
                        </Th>
                        <Th>Categoria</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                {articles && articles.slice((page - 1) * 10, page * 10)
                    .map(article => 
                    <Tr key={article.id}>
                        <Td minW="56" w='50%'>
                            <Heading fontSize="sm" fontFamily="Ubuntu" maxW="30ch">
                                {article.title} 
                            </Heading>
                        </Td>
                        <Td w='30%'>
                            <Text fontSize="sm" color="gray.300">{article.category}</Text>
                        </Td>
                        <Td>
                            <Flex gap='2'>
                                <Link href={`/articles/edit/${article.slug}`}>
                                    <Button fontWeight="normal" size="xs" fontSize="xs" colorScheme="purple">
                                        <Icon as={RiEdit2Line} fontSize="xs" mr="1"/>
                                        Editar
                                    </Button>
                                </Link>
                                <Button onClick={() => handleDelete(article.id)} fontWeight="normal" size="xs" fontSize="xs" colorScheme="red">
                                    <Icon as={RiDeleteBin6Line} fontSize="xs" mr="1"/>
                                    Excluir
                                </Button> 
                            </Flex>
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

export default memo(Drafts)