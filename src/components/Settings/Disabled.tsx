import Head from "next/head";
import { Admin } from "@/components/Admin";
import {  Button,  Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiEdit2Line } from "react-icons/ri";


export default function Disabled() {
    return (
      <>
            <Flex as="header" >
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Desativados
                </Heading>
            </Flex>
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
                    <Tr>
                        <Td minW="14">
                            <Heading fontSize="sm" fontFamily="Ubuntu" maxW="30ch">
                                Titulo do artigo sobre o Front-End e suas tecnologias 
                            </Heading>
                        </Td>
                        <Td>
                            <Text fontSize="sm" color="gray.300">Front-end</Text>
                        </Td>
                        <Td minW="14rem">
                            <Text fontSize="sm" color="gray.300">21 de Julho, 2023</Text>
                        </Td>
                        <Td>
                            <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="green">
                                Publicar
                            </Button>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td minW="14">
                            <Heading fontSize="sm" fontFamily="Ubuntu" maxW="30ch">
                                Titulo do artigo sobre o Front-End e suas tecnologias 
                            </Heading>
                        </Td>
                        <Td>
                            <Text fontSize="sm" color="gray.300">Front-end</Text>
                        </Td>
                        <Td minW="14rem">
                            <Text fontSize="sm" color="gray.300">21 de Julho, 2023</Text>
                        </Td>
                        <Td>
                            <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="green">
                                Publicar
                            </Button>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td minW="14">
                            <Heading fontSize="sm" fontFamily="Ubuntu" maxW="30ch">
                                Titulo do artigo sobre o Front-End e suas tecnologias 
                            </Heading>
                        </Td>
                        <Td>
                            <Text fontSize="sm" color="gray.300">Front-end</Text>
                        </Td>
                        <Td minW="14rem">
                            <Text fontSize="sm" color="gray.300">21 de Julho, 2023</Text>
                        </Td>
                        <Td>
                            <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="green">
                                Publicar
                            </Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <Flex as="footer">
                <Pagination />
            </Flex>
      </>
    )
  }