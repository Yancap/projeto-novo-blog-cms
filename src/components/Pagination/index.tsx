import { Box, Button, Stack, Text } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { PaginationButton } from './PaginationButton'

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPages: number;
}

export const Pagination = ({page, setPage, maxPages}: PaginationProps) => {
  let paginationButtons = []
  for(var i = 0; i < maxPages; i++) {
    paginationButtons.push(<PaginationButton page={page} setPage={setPage} number={i+1}/>)
  }
  return (
    <Stack spacing="6"
     justify="center" align="end" w="100%">
        <Stack direction="row" spacing="2">
            {page > 2 && paginationButtons[0]}
            {page > 3 && 
              <Text>
              ...
              </Text>
            }
            {paginationButtons
            .slice(page === 1 ? page - 1  : page - 2, page === 20 ? page : page + 1)
            }
            {page < maxPages - 2 && 
              <Text>
              ...
              </Text>
            }
            
            {page < maxPages - 1 && paginationButtons[maxPages-1]}
        </Stack>
    </Stack>
  )
}

   