import { Th as ChakraTh, TableColumnHeaderProps} from '@chakra-ui/react'
import {ReactNode} from 'react'



export const Th = ({children, ...props}: TableColumnHeaderProps) => {
  return (
    <ChakraTh {...props}>
        {children}
    </ChakraTh>
  )
}