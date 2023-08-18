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
import { memo, useState } from "react";
import { Authors } from "@/pages/admin/index";

interface AuthorsProps {
    authors: Authors[] | undefined;
    isLoading: boolean;
    error: unknown;
}

const Authors = ({authors, isLoading, error}: AuthorsProps) => {
    const [page, setPage ] = useState(1)
    const maxPages = (authors) ? Number((authors.length / 10).toFixed())  : 0
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
                        <Tr>
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
                                    {author.all_articles === 0 ? "N/A" :
                                    author.all_articles === 1 ? '1 Artigo' :
                                    `${author.all_articles} Artigos`
                                    }
                                </Text>
                            </Td>
                            <Td maxW="7.5rem">
                                <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="whiteAlpha">
                                    <Icon as={RiMessage3Line} fontSize="md" mr="1"/>
                                    Mensagem
                                </Button>
                            </Td>
                            <Td>
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

  export default memo(Authors)