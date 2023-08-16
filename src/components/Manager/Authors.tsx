import Head from "next/head";
import { Admin } from "@/components/Admin";
import {  Avatar, Box, Button,  Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiDeleteBin6Line, RiFilter3Fill, RiMessage3Line } from "react-icons/ri";
import { memo } from "react";

const Authors = () => {
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
                    <Tr>
                        <Td minW="18rem">
                            <Flex gap="4" align="center">
                                {null ? 
                                <Avatar size='md' name='Yan Gabriel' src=''/>
                                : 
                                <Avatar bg="transparent" color="purple.700" fill="purple.700" border="2px" />
                                }
                                <Box display={{base: "none",sm: "block"}}>
                                    <Text>
                                        Yan Gabriel Ferreira
                                    </Text>
                                    <Text fontSize='xs' color="purple.300">
                                        yan@email.com
                                    </Text>
                                </Box>
                                
                            </Flex>
                        </Td>
                        <Td minW="14rem">
                            <Text fontSize="sm" color="gray.300">12 Artigos</Text>
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
                </Tbody>
            </Table>
            <Flex as="footer">
                <Pagination />
            </Flex>
      </>
    )
  }

  export default memo(Authors)