import { Tr as ChakraTr} from '@chakra-ui/react'
import {ReactNode} from 'react'

interface TrProps {
    children: ReactNode
}

export const Tr = ({children}: TrProps) => {
  return (
    <ChakraTr>
        {children}
    </ChakraTr>
  )
}