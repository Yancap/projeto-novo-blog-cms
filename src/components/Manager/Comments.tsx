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
import { RiEdit2Line, RiEyeLine } from "react-icons/ri";


export default function Comments() {
    return (
      <>
            <Flex as="header" >
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Comentários
                </Heading>
            </Flex>
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
                    <Tr>
                        <Td maxW="18rem">
                            <Heading fontSize="sm" fontFamily="Ubuntu" maxW="25ch">
                                Titulo do artigo sobre o Front-End e suas tecnologias 
                            </Heading>
                        </Td>
                        <Td>
                            <Text fontSize="sm" color="gray.300">Front-end</Text>
                        </Td>
                        <Td minW="8rem">
                            <Text fontSize="sm" color="gray.300">12 Comentários</Text>
                        </Td>
                        <Td>
                            <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="purple">
                            <Icon as={RiEyeLine} fontSize="xs" mr="1"/>
                                Vizualizar
                            </Button>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td maxW="18rem">
                            <Heading fontSize="sm" fontFamily="Ubuntu" maxW="25ch">
                                Titulo do artigo sobre o Front-End e suas tecnologias 
                            </Heading>
                        </Td>
                        <Td>
                            <Text fontSize="sm" color="gray.300">Front-end</Text>
                        </Td>
                        <Td minW="8rem">
                            <Text fontSize="sm" color="gray.300">12 Comentários</Text>
                        </Td>
                        <Td>
                            <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="purple">
                            <Icon as={RiEyeLine} fontSize="xs" mr="1"/>
                                Vizualizar
                            </Button>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td maxW="18rem">
                            <Heading fontSize="sm" fontFamily="Ubuntu" maxW="25ch">
                                Titulo do artigo sobre o Front-End e suas tecnologias 
                            </Heading>
                        </Td>
                        <Td>
                            <Text fontSize="sm" color="gray.300">Front-end</Text>
                        </Td>
                        <Td minW="8rem">
                            <Text fontSize="sm" color="gray.300">12 Comentários</Text>
                        </Td>
                        <Td>
                            <Button as="a" fontWeight="normal" size="xs" fontSize="xs" colorScheme="purple">
                            <Icon as={RiEyeLine} fontSize="xs" mr="1"/>
                                Vizualizar
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