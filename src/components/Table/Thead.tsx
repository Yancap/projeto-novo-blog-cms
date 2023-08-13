import { Thead as ChakraThead, TableHeadProps } from '@chakra-ui/react'
import {ReactNode} from 'react'

interface TheadProps extends TableHeadProps{
    children: ReactNode
}

export const Thead = ({children, ...props}: TheadProps) => {
  return (
    <ChakraThead {...props}>
        {children}
    </ChakraThead>
  )
}