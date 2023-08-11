import React from 'react'
import { FormControl, FormLabel, Input as ChakraInput } from '@chakra-ui/react'

interface InputProps {
    label: string;
    type: string;
}

export const Input = ({label, type}: InputProps) => {
  return (
    <FormControl>
        <FormLabel htmlFor={type} fontSize="xl" fontWeigth="medium">{label}</FormLabel>
        <ChakraInput name={type} type={type} focusBorderColor='purple.700' _hover={{bgColor: 'gray.800'}}        
        bgColor='gray.800' variant='filled' size='lg' />
    </FormControl>
  )
}
