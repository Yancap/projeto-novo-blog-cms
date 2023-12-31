import Head from "next/head";
import {  Button,  Flex, Heading, Icon, Text, Spinner, Box, useRadioGroup } from "@chakra-ui/react";
import { Table } from "@/components/Table";
import { Thead } from "@/components/Table/Thead";
import { Tr } from "@/components/Table/Tr";
import { Th } from "@/components/Table/Th";
import { Tbody } from "@/components/Table/Tbody";
import { Td } from "@/components/Table/Td";
import { Pagination } from "@/components/Pagination";
import { RiDeleteBin6Line, RiEdit2Line, RiFilter3Fill } from "react-icons/ri";
import { memo, useEffect, useRef, useState } from "react";
import { Filter } from "../Filter";
import { FilterHeader } from "../Filter/FilterHeader";
import { FilterContent, FilterState } from "../Filter/FilterContent";
import { Checkbox } from "../Filter/Checkbox";
import { Category } from "@/interfaces/_interfaces";
import { filterForArticles } from "../Filter/services/filterForArticles";
import { IArticles, IAuthors } from "@/pages/admin/interfaces";
import { cms_api } from "@/services/cms_api";

interface ArticlesProps {
    articles: IArticles[] | undefined;
    authors: IAuthors[] | undefined;
    categories: Category[] | undefined;
    isLoading?: boolean;
    error?: unknown;
    isRefetching: boolean;
    refetch: any;
}


const Articles = ({articles, authors, categories, isLoading, error, isRefetching, refetch}: ArticlesProps) => {
    
    const [articlesState, setArticlesState] = useState(articles)
    const [modalFilter, setModalFilter] = useState(false)
    const [filter, setFilter] = useState<FilterState | null>(null)

    const [page, setPage ] = useState(1)
    const maxPages = (articlesState) ? Number((articlesState.length / 10).toFixed()) : 0

    const authorsFilterContainer: JSX.Element[] =  [] as JSX.Element[]
    const categoriesFilterContainer: JSX.Element[] =  [] as JSX.Element[]

    
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
                    <Checkbox id={categories[i-1].id} value={categories[i-1].category} name='category'>
                        {categories[i-1].category}
                    </Checkbox>
                    { categories[i] && 
                    <Checkbox id={categories[i].id} value={categories[i].category} name='category'>
                        {categories[i].category}
                    </Checkbox>
                    }
                </Box>
            )
            
        }
    }
    

    async function handleDelete(article_id: string){
        const token = sessionStorage.getItem('token')
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token 
          },
          data: { article_id }
        }
        try{
            await cms_api.delete('admin/delete-articles', config)
            refetch()
        } catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(!filter) {
            setArticlesState(articles)
        }
        if(articlesState && filter && articles){
            return setArticlesState(() => {
                return filterForArticles(filter, articles)
            })
        }
    }, [filter, articles, authors])
    console.log(articles)
    return (
      <>
            <Flex as="header" align="center" justify="space-between">
                <Heading fontFamily="Ubuntu" fontSize="2rem" fontWeight="normal">
                    Artigos totais

                    { isRefetching && <Spinner ml="4"/> }
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
                            <Td minW="10rem">
                                <Text fontSize="sm" color="gray.300">{article.author}</Text>
                            </Td>
                            <Td >
                                <Text fontSize="sm" color="gray.300">{new Date(article.created_at).toLocaleDateString()}</Text>
                            </Td>
                            <Td >
                                <Button onClick={() => handleDelete(article.id)} fontWeight="normal" size="xs" fontSize="xs" colorScheme="red">
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
        <Filter  active={modalFilter} setActive={setModalFilter} setFilter={setFilter}>
            <FilterHeader>
                Autores
            </FilterHeader>
            <FilterContent  value='filter_author' setFilter={setFilter}>
                {authorsFilterContainer}
            </FilterContent>

            <FilterHeader>
                Categoria
            </FilterHeader>
            <FilterContent  value='filter_category' setFilter={setFilter}>
                {categoriesFilterContainer}
            </FilterContent>

            <FilterHeader>
                Data publicação
            </FilterHeader>
            <FilterContent  value='filter_publication' setFilter={setFilter}>
                <Box >
                    <Checkbox id="last-week" value='last-week' name='publication'>
                        Ultima semana
                    </Checkbox>
                    <Checkbox id="last-month" value='last-month' name='publication'>
                        Ultima mês
                    </Checkbox>
                </Box>
                <Box flexGrow="1">
                    <Checkbox id="last-year" value='last-year' name='publication'>
                        Ultima ano
                    </Checkbox>
                </Box>
            </FilterContent>

            <FilterHeader>
                Ordenação
            </FilterHeader>
            <FilterContent  value='order' setFilter={setFilter}>
                <Box >
                    <Checkbox id="data" value='data' name='order'>
                        Data de publicação
                    </Checkbox>
                    <Checkbox id="title" value='title' name='order'>
                        Titulo
                    </Checkbox>
                </Box>
                <Box flexGrow="1">
                    <Checkbox id="authors" value='authors' name='order'>
                        Autores
                    </Checkbox>
                </Box>
            </FilterContent>
        </Filter>
      </>
    )
  }

  export default memo(Articles)