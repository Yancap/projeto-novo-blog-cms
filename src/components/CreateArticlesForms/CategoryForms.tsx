import React from 'react'
import { useState, useEffect } from 'react'
import { FormControl, FormLabel,  Input, Spinner } from "@chakra-ui/react";
import { Category, FormCreateArticles } from '@/interfaces/_interfaces';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';


interface CategoryFormsProps {
    setValue: UseFormSetValue<FormCreateArticles>
    getValues: UseFormGetValues<FormCreateArticles>
    categories: Category[] | undefined;
    isLoading?: boolean;
    error?: unknown;
}



export default function CategoryForms ({setValue, categories, isLoading, getValues}: CategoryFormsProps){

  const [ addCategory, setAddCategory ] = useState(false) 
  const [ categoryState, setCategoryState ] = useState<string | null>(null)
  useEffect(() => {
    setCategoryState(getValues("category"))
    setValue('category', categoryState ??  (categories ? categories[0]?.category as string : ''))
  }, [])
  return (
    <FormControl w="50%">
        <FormLabel htmlFor="category" fontSize={['md','lg']} fontWeight="medium">
            Categoria
        </FormLabel>

        <Input as="select" id="category" name="category" defaultValue={categoryState ?? categoryState ??  (categories ? categories[0]?.category as string : '')}
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
                <Input as="option" value={category.category.toLocaleUpperCase()} 
                    key={category.id} selected={categoryState === category.category}
                >
                    {category.category.toLocaleUpperCase()}
                </Input>
            )}
            <Input  as="option" value="add" color="gray.400">Adicionar Categoria</Input>
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
