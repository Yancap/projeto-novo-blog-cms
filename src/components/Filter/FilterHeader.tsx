import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

interface FilterHeaderProps {
    children: string
}

export const FilterHeader = ({children}: FilterHeaderProps) => {
  return (
    <Box pb="1">
        <Heading fontSize="lg">
            {children}
        </Heading>
    </Box>
  )
}
