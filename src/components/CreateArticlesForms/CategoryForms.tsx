import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel,  Input, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Category, FormCreateArticles } from '@/interfaces/_interfaces';
import { UseFormSetValue } from 'react-hook-form';


interface CategoryFormsProps {
    setValue: UseFormSetValue<FormCreateArticles>
    categories: Category[] | undefined;
    isLoading?: boolean;
    error?: unknown;
}



export default function CategoryForms ({setValue, categories, isLoading, error}: CategoryFormsProps){

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
           categories && categories.map((category) => 
                <Input as="option" value="front-end" key={category.id}>{category.category.toLocaleUpperCase()}</Input>
            )}
            <Input required as="option" value="add" color="gray.400">Adicionar Categoria</Input>
        </Input>
        
        <Input id="category" name="category" mt="4" required
            focusBorderColor='purple.700' _hover={{bgColor: 'gray.800'}}        
            bgColor='gray.800' variant='filled' size={'md'} 
            onChange={(event) => setValue('category', event.target.value.toLowerCase())}
            placeholder="Adicionar Categoria" display={addCategory ? "block" : "none"}
        />
    </FormControl>
  )
}
