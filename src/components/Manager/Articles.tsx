import Head from "next/head";
import {  Button,  Flex, Heading, Icon, Text, Spinner } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiDeleteBin6Line, RiEdit2Line, RiFilter3Fill } from "react-icons/ri";
import { PiPlusBold } from "react-icons/pi";
import { memo, useState } from "react";
import { Article } from "@/pages/admin/index";

interface ArticlesProps {
    articles: Article[] | undefined;
    isLoading: boolean;
    error: unknown;
}

const Articles = ({articles, isLoading, error}: ArticlesProps) => {
    const [page, setPage ] = useState(1)
    const maxPages = (articles) ? Number((articles.length / 10).toFixed())  : 0
    return (
      <>
            <Flex as="header" align="center" justify="space-between">
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Artigos totais
                </Heading>
                <Button as="a" fontWeight="normal" size="sm" cursor="pointer"
                fontSize="sm" bg="purple.700" color="white" _hover={{bg: "purple.800"}}>
                    Filtrar
                    <Icon as={RiFilter3Fill} fontSize="lg" ml="1"/>
                </Button>
            </Flex>
            {   isLoading ? 
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
                            <Th>Autor</Th>
                            <Th>Data de publicação</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {articles && articles.slice((page - 1) * 10, page * 10)
                    .map(article => 
                        <Tr key={article.id}>
                            <Td minW="14rem">
                                <Heading fontSize="sm" fontFamily="Ubuntu" maxW="30ch">
                                    {article.title}
                                </Heading>
                            </Td>
                            <Td>
                                <Text fontSize="sm" color="gray.300">{article.author}</Text>
                            </Td>
                            <Td minW="14rem">
                                <Text fontSize="sm" color="gray.300">{article.created_at}</Text>
                            </Td>
                            <Td >
                                <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="purple">
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

  export default memo(Articles)