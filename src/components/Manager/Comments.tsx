import Head from "next/head";
import {  Button,  Flex, Heading, Icon, Spinner, Text } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiEyeLine } from "react-icons/ri";
import { memo, useState } from "react";
import { ArticleComments } from "@/pages/admin";
import Link from "../../../node_modules/next/link";
import { useRouter } from "../../../node_modules/next/router";

interface CommentsProps {
    comments: ArticleComments[] | undefined;
    isLoading: boolean;
    error: unknown;
}

const Comments = ({comments, isLoading, error}: CommentsProps) => {
    const {query} = useRouter()
    console.log(query);
    
    const [page, setPage ] = useState(1)
    const maxPages = (comments) ? Number((comments.length / 10).toFixed())  : 0
    return (
      <>
            <Flex as="header" >
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Comentários
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
                            <Th >Artigo</Th>
                            <Th>Categoria</Th>
                            <Th>Comentários</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {comments && comments.slice((page - 1) * 10, page * 10)
                    .map(data =>
                        <Tr key={data.article.slug}>
                            <Td maxW="18rem">
                                <Heading fontSize="sm" fontFamily="Ubuntu" maxW="25ch">
                                    {data.article.title}
                                </Heading>
                            </Td>
                            <Td>
                                <Text fontSize="sm" color="gray.300">{data.article.category}</Text>
                            </Td>
                            <Td minW="8rem">
                                <Text fontSize="sm" color="gray.300">{
                                    data.comments.length === 0 ? 'Sem comentários' :
                                    data.comments.length === 1 ? '1 Comentário' :
                                    `${data.comments.length} Comentários`
                                }</Text>
                            </Td>
                            <Td>
                                <Link href={`comments/${data.article.slug}`}>
                                    <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="purple">
                                    <Icon as={RiEyeLine} fontSize="xs" mr="1"/>
                                        Vizualizar
                                    </Button>
                                </Link>
                            </Td>
                        </Tr>
                    )}
                    </Tbody>
                </Table>
            </>
            }
            <Flex as="footer">
                <Pagination page={page} setPage={setPage} maxPages={maxPages}/>
            </Flex>
      </>
    )
  }

export default memo(Comments)