import { Tbody as ChakraTbody, TableBodyProps} from '@chakra-ui/react'
import {ReactNode} from 'react'



export const Tbody = ({children, ...props}: TableBodyProps) => {
  return (
    <ChakraTbody {...props}>
        {children}
    </ChakraTbody>
  )
}