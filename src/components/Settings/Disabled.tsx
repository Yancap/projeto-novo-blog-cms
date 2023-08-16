import Head from "next/head";
import { Admin } from "@/components/Admin";
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
import { Article } from "@/pages/admin/index";

interface DisabledProps {
    articles: Article[] | undefined;
    isLoading: boolean;
    error: unknown;
}

const Disabled = ({articles, isLoading, error}: DisabledProps) => {
    const [page, setPage ] = useState(1)
    const maxPages = (articles) ? Number((articles.length / 10).toFixed())  : 0

    return (
      <>
            <Flex as="header" >
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Desativados
                </Heading>
            </Flex>
            { isLoading ? 
            <Flex justify='center'>
                <Spinner />
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
                            <Th>Data de publicação</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    { articles && articles
                        .slice((page - 1) * 10, page * 10)
                        .map( article => 
                        <Tr key={article.id}>
                            <Td minW="14">
                                <Heading fontSize="sm" fontFamily="Ubuntu" maxW="30ch">
                                    {article.title}
                                </Heading>
                            </Td>
                            <Td>
                                <Text fontSize="sm" color="gray.300">{article.category}</Text>
                            </Td>
                            <Td minW="14rem">
                                <Text fontSize="sm" color="gray.300">{article.created_at}</Text>
                            </Td>
                            <Td>
                                <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="green">
                                    Publicar
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

  export default memo(Disabled)