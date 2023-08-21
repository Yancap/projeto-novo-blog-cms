import { Box,  Flex, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { FilterHeader } from './FilterHeader'
import { FilterContent } from './FilterContent'
import { Checkbox } from './Checkbox'

export const Filter = () => {
  return (
    <Flex bg="#27282B" borderRadius="8" position="absolute" right="0"
    w="400px" justifyContent="space-between" p="2" >
        <Stack py="2" pl="2">
            <FilterHeader>
                Autores
            </FilterHeader>
            <FilterContent value='author'>
                <Box>
                    <Checkbox id="yan-gabriel" value='yan gabriel' name='author'>
                        Yan Gabriel
                    </Checkbox>
                    <Checkbox id="jonh-doe" value='jonh doe' name='author'>
                        Jonh Doe
                    </Checkbox>
                </Box>
                <Box>
                    <Checkbox id="yan-gabriel" value='yan gabriel' name='author'>
                        Yan Gabriel
                    </Checkbox>
                    <Checkbox id="jonh-doe" value='jonh doe' name='author'>
                        Jonh Doe
                    </Checkbox>
                </Box>
                <Box>
                    <Checkbox id="yan-gabriel" value='yan gabriel' name='author'>
                        Yan Gabriel
                    </Checkbox>
                    <Checkbox id="jonh-doe" value='jonh doe' name='author'>
                        Jonh Doe
                    </Checkbox>
                </Box>
            </FilterContent>
        </Stack>
        <Box as="header" cursor="pointer">
            <Icon as={RiCloseFill} fontSize="xl"/>
        </Box>
    </Flex>
  )
}
