import { Box, Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { PaginationButton } from './PaginationButton'

export const Pagination = () => {
  return (
    <Stack spacing="6"
     justify="center" align="end" w="100%">
        <Stack direction="row" spacing="2">
            <PaginationButton number={1} isCurrent={true}/>
            <PaginationButton number={2} />
            <PaginationButton number={3} />
            <PaginationButton number={4} />
        </Stack>
    </Stack>
  )
}

   