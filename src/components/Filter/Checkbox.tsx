import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FormControl, FormLabel, Radio, RadioProps, useRadio} from '@chakra-ui/react'

interface CheckboxProps extends RadioProps{
    id: string;
    value: string;
    name: string;
}   

export const Checkbox = ({children, id, name, value, ...props}: CheckboxProps) => {
  
  return (
    <>
        <FormLabel display="flex" gap="1" htmlFor={id} fontSize="sm" fontWeight="medium">
            <Radio id={id} defaultChecked={true} value={value} name={name} colorScheme='purple' size="md" {...props} />
            {children}
        </FormLabel>
    </>
        
  )
}

//export const Checkbox = forwardRef(CheckboxBase)