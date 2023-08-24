import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps{
    label: string;
    type: string;
    error?: FieldError | null;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
 = ({label, type, error=null, ...props}: InputProps, ref) => {
  const input = {
    id:label,
    name:label, 
    type: type,
    focusBorderColor:'purple.700',
    bgColor:'gray.800',
    variant:'filled',
    size:['md','lg']
  }
  return (
    <FormControl  isInvalid={!!error}>
        <FormLabel htmlFor={label} fontSize={['md','lg']} fontWeight="medium">{label}</FormLabel>
        <ChakraInput _hover={{bgColor: 'gray.800'}} {...input} ref={ref} {...props}/>

        { !!error && 
          <FormErrorMessage >
            {error.message}
          </FormErrorMessage>
        }
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)