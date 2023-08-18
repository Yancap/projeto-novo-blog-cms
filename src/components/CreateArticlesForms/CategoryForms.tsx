import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel,  Input, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";


interface CategoryFormsProps {
    setValue: any
}

export const CategoryForms = ({setValue}: CategoryFormsProps) => {

  const { data, isLoading, error } = useQuery('categories', async () => {
    const category = await fetch("http://localhost:3000/api/categories")

    const categoryJson = await category.json()

    const categories = categoryJson
    return { categories }
  })
  const [ addCategory, setAddCategory ] = useState(false) 
  
  return (
    <FormControl w="50%">
        <FormLabel htmlFor="category" fontSize={['md','lg']} fontWeight="medium">
            Categoria
        </FormLabel>

        <Input as="select" id="category" name="category"  
            focusBorderColor='purple.700' _hover={{bgColor: 'gray.800'}}        
            bgColor='gray.800' variant='filled' size={'md'} onChange={(event) => {
            if(event.target.value === "add") {
                return setAddCategory(true)
            }
            setAddCategory(false)
            setValue('category', event.target.value)
            }}
        >
            {isLoading ?  
            <Input as="option" value="" >
                <Spinner />
            </Input> : 
            data?.categories.map((category) => 
                <Input as="option" value="front-end" key={category.id}>{category.category.toLocaleUpperCase()}</Input>
            )}
            <Input as="option" value="add" color="gray.400">Adicionar Categoria</Input>
        </Input>
        
        <Input id="category" name="category" mt="4" 
            focusBorderColor='purple.700' _hover={{bgColor: 'gray.800'}}        
            bgColor='gray.800' variant='filled' size={'md'} 
            onChange={(event) => setValue('category', event.target.value.toLowerCase())}
            placeholder="Adicionar Categoria" display={addCategory ? "block" : "none"}
        />
    </FormControl>
  )
}
