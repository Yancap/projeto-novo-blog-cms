import { Box,  Button,  Flex, Icon, Stack} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { RiCloseFill } from 'react-icons/ri'

interface FilterProps {
    children: React.ReactNode
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>
    setFilter: any
}

export const Filter = ({children, active, setActive, setFilter}: FilterProps) => {
  return (
    <Flex bg="#27282B" borderRadius="8" transitionDuration=".5s" transition="all" 
    position="absolute" right={active ? "0" : "-300px"}
    w="460px" justifyContent="space-between" p="2" display={active ? "flex" : "none"}>
        <Stack py="2" pl="2" flexGrow="1">
            {children}
            <Button onClick={() => setFilter(null)} colorScheme='purple'>
                Limpar o filtro
            </Button>
        </Stack>
        <Box as="header" cursor="pointer" onClick={() => setActive(false)}>
            <Icon as={RiCloseFill} fontSize="xl"/>
        </Box>
    </Flex>
  )
}
