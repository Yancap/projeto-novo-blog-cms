import {useEffect, useState} from 'react'
import { Flex, FormControl, FormLabel, Stack, Input, Text, Icon, Box, Button } from "@chakra-ui/react";
import { RiAddCircleLine } from "react-icons/ri";
import { RxTextAlignLeft } from "react-icons/rx";

interface TagsInputForm {
    tag: string;
}

export const TagsForms = () => {
  const [ credits, setCredits ] = useState<TagsInputForm[]>([
    {tag: ""}
  ])

  const [ add, setAdd ] = useState(0)
  
  let elements = []
  for(let i = 0; i < add+1; i++){
    elements.push(
        <Flex gap="10" key={i}>
            <Box w="70%" borderLeft="2px" borderColor="gray.900" px="4" py="2">
                <FormLabel fontSize="sm" color="gray.400">
                    Tag
                </FormLabel>
                <Flex borderBottom="2px" borderColor="gray.400">
                    <Icon as={RxTextAlignLeft} fontSize="2xl" color="purple.200" />
                    <Input type="text" name="tag" variant="unstyled"
                    borderRadius="0" color="purple.300" px="1"
                    onChange={({currentTarget}) => {
                        setCredits(credits => ({...credits, 
                            [add]: { tag: currentTarget.value}}
                        ))
                    }}
                    />
                </Flex>
            </Box>
        </Flex> 
    )
  }
  
  return (
    <FormControl w="50%">
        <Text fontSize={['md','lg']} mb="2.5" fontWeight="medium">
            Tags
        </Text>
        <Stack minH="120px" borderRadius="4" bgColor='gray.800' px="8" py="4">
            
            {...elements}
            <Icon as={RiAddCircleLine} fontSize="2xl" color="purple.200" 
            onClick={() => setAdd(add+1)}/>
        </Stack>
    </FormControl>
  )
}
