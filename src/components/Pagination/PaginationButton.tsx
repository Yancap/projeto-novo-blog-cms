import { Button } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'

interface PaginationButtonProps {
    number: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

export const PaginationButton = ({ number, page, setPage}: PaginationButtonProps) => {
    const isCurrent = page === number
    if(isCurrent) {
        return (
        <Button size="xs" fontSize="xs" width="4" bg='purple.700' color="white" disabled 
            _hover={{bg: "purple.800", cursor: "pointer"}}
          _disabled={{bgColor: "purple.300", cursor: "default"}}
          
          >
            {number}
        </Button>
        )   
    }
    return (
        <Button size="xs" fontSize="xs" width="4" bg="gray.800" color="gray.900" 
          _hover={{bg: "gray.700", cursor: "default"}}
          onClick={() => setPage(number)}
          >
            {number}
        </Button>
    )
}
