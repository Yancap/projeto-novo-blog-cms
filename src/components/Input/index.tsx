import React from 'react'
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps{
    label: string;
    type: string;
}

export const Input = ({label, type, ...props}: InputProps) => {
  return (
    <FormControl>
        <FormLabel htmlFor={label} fontSize={['md','lg']} fontWeight="medium">{label}</FormLabel>
        <ChakraInput id={label} name={label} type={type} focusBorderColor='purple.700' _hover={{bgColor: 'gray.800'}}        
        bgColor='gray.800' variant='filled' size={['md','lg']} {...props}/>
    </FormControl>
  )
}
