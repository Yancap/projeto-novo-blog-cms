import { Td as ChakraTd, TableCellProps} from '@chakra-ui/react'
import {ReactNode} from 'react'



export const Td = ({children, ...props}: TableCellProps) => {
  return (
    <ChakraTd {...props} py="6">
        {children}
    </ChakraTd>
  )
}