import { Table as ChakraTable, TableProps } from '@chakra-ui/react'
import {ReactNode} from 'react'



export const Table = ({children, ...props}: TableProps) => {
  return (
    <ChakraTable colorScheme="whiteAlpha" {...props}>
        {children}
    </ChakraTable>
  )
}
