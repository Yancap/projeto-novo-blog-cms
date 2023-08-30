import Head from "next/head";
import {  Button,  Flex, Heading, Icon, Text, Spinner } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiEdit2Line } from "react-icons/ri";
import { memo, useState } from "react";
import { IArticles } from "@/pages/admin/interfaces";
import { useRouter } from "next/router";
import { cms_api } from "@/services/cms_api";

interface DisabledProps {
    articles: IArticles[];
    isLoading?: boolean;
    error?: unknown;
}

const Disabled = ({articles, isLoading, error}: DisabledProps) => {
    const [page, setPage ] = useState(1)
    const maxPages = (articles) ? Number((articles.length / 10).toFixed())  : 0
    const router = useRouter()

    async function handleActive(id: string){
        const token = sessionStorage.getItem('token')
    
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token 
          }
        }

        const response = await cms_api.patch('/articles/active', { id }, config)
        console.log(response);
        router.reload()
    }
    return (
      <>
            <Flex as="header" >
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Desativados
                </Heading>
            </Flex>
            { articles.length === 0 ? 
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
                    { articles && articles
                        .slice((page - 1) * 10, page * 10)
                        .map( article => 
                        <Tr key={article.id}>
                            <Td minW="56" w='50%'>
                                <Heading fontSize="sm" fontFamily="Ubuntu" maxW="40ch">
                                    {article.title}
                                </Heading>
                            </Td>
                            <Td w='30%'>
                                <Text fontSize="sm" color="gray.300">{article.category}</Text>
                            </Td>
                            <Td>
                                <Flex gap='2'>
                                    <Button as="a" onClick={() => handleActive(article.id)} fontWeight="normal" size="xs" fontSize="xs" colorScheme="green">
                                        Publicar
                                    </Button>
                                    <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="purple" onClick={() => router.push(`/articles/edit/${article.slug}`)}>
                                        <Icon as={RiEdit2Line} fontSize="xs" mr="1"/>
                                        Editar
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

  export default memo(Disabled)