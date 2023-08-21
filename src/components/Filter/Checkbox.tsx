import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FormControl, FormLabel, Radio, RadioProps} from '@chakra-ui/react'

interface CheckboxProps extends RadioProps{
    id: string;
    value: string;
    name: string;
}   

const CheckboxBase: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps>
 = ({children, id, name, value, ...props}: CheckboxProps, ref) => {
  return (
    <>
        <FormLabel display="flex" gap="1" htmlFor={id} fontSize="sm" fontWeight="medium">
            <Radio value={value} name={name} colorScheme='purple' size="md" ref={ref} {...props} />
            {children}
        </FormLabel>
    </>
        
  )
}

export const Checkbox = forwardRef(CheckboxBase)