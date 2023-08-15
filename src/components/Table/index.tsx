import { Table as ChakraTable, TableProps, Box } from '@chakra-ui/react'

export const Table = ({children, ...props}: TableProps) => {
  return (
    <Box  overflowX="scroll" className=''>
      <ChakraTable   colorScheme="whiteAlpha" {...props}>
          {children}
      </ChakraTable>
    </Box>
  )
}
