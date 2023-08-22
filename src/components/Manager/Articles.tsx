import Head from "next/head";
import {  Button,  Flex, Heading, Icon, Text, Spinner, Box } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiDeleteBin6Line, RiEdit2Line, RiFilter3Fill } from "react-icons/ri";
import { PiPlusBold } from "react-icons/pi";
import { memo, useEffect, useState } from "react";
import { Article, Authors } from "@/pages/admin/index";
import { Filter } from "../Filter";
import { FilterHeader } from "../Filter/FilterHeader";
import { FilterContent } from "../Filter/FilterContent";
import { Checkbox } from "../Filter/Checkbox";
import { Category } from "@/pages/create/_interfaces";

interface ArticlesProps {
    articles: Article[] | undefined;
    authors: Authors[] | undefined;
    categories: Category[] | undefined;
    isLoading: boolean;
    error: unknown;
}

interface FilterState {
    category?: string
    author?: string
}

const Articles = ({articles, authors, categories, isLoading, error}: ArticlesProps) => {
    const [page, setPage ] = useState(1)
    const maxPages = (articles) ? Number((articles.length / 10).toFixed()) : 0

    const [articlesState, setArticlesState] = useState(articles)
    const [modalFilter, setModalFilter] = useState(false)

    const authorsFilterContainer: JSX.Element[] =  [] as JSX.Element[]
    const categoriesFilterContainer: JSX.Element[] =  [] as JSX.Element[]

    const [filter, setFilter] = useState<FilterState>({} as FilterState)
    console.log(filter);
    
    if(authors) {
        for(let i = 1; i <= authors.length; i += 2){
            authorsFilterContainer.push(
                <Box key={authors[i-1].id}>
                    <Checkbox id={authors[i-1].id} value={authors[i-1].name} name='author'>
                        {authors[i-1].name}
                    </Checkbox>
                    { authors[i] && 
                    <Checkbox id={authors[i].id} value={authors[i].name} name='author'>
                        {authors[i].name}
                    </Checkbox>
                    }
                </Box>
            )
            
        }
    }
    if(categories) {
        for(let i = 1; i <= categories.length; i += 2){
            categoriesFilterContainer.push(
                <Box key={categories[i-1].id}>
                    <Checkbox id={categories[i-1].id} value={categories[i-1].category} name='author'>
                        {categories[i-1].category}
                    </Checkbox>
                    { categories[i] && 
                    <Checkbox id={categories[i].id} value={categories[i].category} name='author'>
                        {categories[i].category}
                    </Checkbox>
                    }
                </Box>
            )
            
        }
    }

    useEffect(() => {
        //const aux = articlesState?.filter(article => article.)
    }, [filter])

    return (
      <>
            <Flex as="header" align="center" justify="space-between">
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Artigos totais
                </Heading>
                <Button as="a" fontWeight="normal" size="sm" cursor="pointer"
                fontSize="sm" bg="purple.700" color="white" _hover={{bg: "purple.800"}} 
                onClick={() => setModalFilter(true)}>
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
                    {articlesState && articlesState.slice((page - 1) * 10, page * 10)
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
        <Filter active={modalFilter} setActive={setModalFilter} >
            <FilterHeader>
                Autores
            </FilterHeader>
            <FilterContent value='author' setFilter={setFilter}>
                {authorsFilterContainer}
            </FilterContent>

            <FilterHeader>
                Categoria
            </FilterHeader>
            <FilterContent value='category' setFilter={setFilter}>
                {categoriesFilterContainer}
            </FilterContent>

            <FilterHeader>
                Data publicação
            </FilterHeader>
            <FilterContent value='publication' setFilter={setFilter}>
                <Box >
                    <Checkbox id="last-week" value='last-week' name='category'>
                        Ultima semana
                    </Checkbox>
                    <Checkbox id="last-month" value='last-month' name='category'>
                        Ultima mês
                    </Checkbox>
                </Box>
                <Box flexGrow="1">
                    <Checkbox id="last-year" value='last-year' name='category'>
                        Ultima ano
                    </Checkbox>
                </Box>
            </FilterContent>

            <FilterHeader>
                Ordenação
            </FilterHeader>
            <FilterContent value='order'>
                <Box >
                    <Checkbox id="data" value='data' name='category'>
                        Data de publicação
                    </Checkbox>
                    <Checkbox id="title" value='title' name='category'>
                        Titulo
                    </Checkbox>
                </Box>
                <Box flexGrow="1">
                    <Checkbox id="authors" value='authors' name='category'>
                        Autores
                    </Checkbox>
                </Box>
            </FilterContent>
        </Filter>
      </>
    )
  }

  export default memo(Articles)