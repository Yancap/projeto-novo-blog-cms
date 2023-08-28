import {useEffect, useState} from 'react'
import { Flex, FormControl, FormLabel, Stack, Input, Text, Icon, Box, Button } from "@chakra-ui/react";
import { RiAddCircleLine } from "react-icons/ri";
import { RxTextAlignLeft } from "react-icons/rx";

interface CreditsInputForm {
    name: string;
    link: string;
}

interface CreditsFormsProps {
    setValue: any
}

export const CreditsForms = ({setValue}: CreditsFormsProps) => {
  const [ credits, setCredits ] = useState<CreditsInputForm[]>([
    {name: "", link: ""}
  ])

  const [ add, setAdd ] = useState(0)

  let elements = []
  for(let i = 0; i < add+1; i++){
    elements.push(
        <Flex gap={{base: "0",md:"10"}} direction={{base: "column",md:"row"}} key={i}
        borderBottom={{base: "2px",md:"0"}} borderColor="gray.900">
            <Box w={{base: "100&",md:"45%"}} borderLeft="2px" borderColor="gray.900" px="4" py="2">
                <FormLabel fontSize="sm" color="gray.400">
                Nome
                </FormLabel>
                <Flex borderBottom="2px" borderColor="gray.400">
                <Icon as={RxTextAlignLeft} fontSize="2xl" color="purple.200" />
                <Input type="text" name="tag" variant="unstyled"
                borderRadius="0" color="purple.300" px="1" 
                onBlur={({currentTarget}) => {
                    setCredits(credits => {
                        credits[add] = { name: currentTarget.value, link: credits[add]?.link ?? ''}
                        return credits
                    })
                    setValue('credits',  credits )
                    
                }}
                />
                </Flex>
            </Box>
            <Box w={{base: "100&",md:"45%"}}  borderLeft="2px" borderColor="gray.900" px="4" py="2">
                <FormLabel fontSize="sm" color="gray.400">
                Link
                </FormLabel>
                <Flex borderBottom="2px" borderColor="gray.400">
                <Icon as={RxTextAlignLeft} fontSize="2xl" color="purple.200" />
                <Input type="text" name="tag" variant="unstyled"
                borderRadius="0" color="purple.300" px="1"
                onChange={({currentTarget}) => {
                    setCredits(credits => {
                        credits[add] = { link: currentTarget.value, name: credits[add]?.name ?? ''}
                        return credits
                    })
                    setValue('credits',  credits)
                }}
                />
                </Flex>
            </Box>
        </Flex> 
    )
  }
  
  return (
    <FormControl w={{base: "100%",md:"80%"}}>
        <Text fontSize={['md','lg']} mb="2.5" fontWeight="medium">
            Créditos
        </Text>
        <Stack minH="120px" borderRadius="4" bgColor='gray.800' px="8" py="4">
            
            {...elements}
            <Icon as={RiAddCircleLine} fontSize="2xl" color="purple.200" onClick={() => setAdd(add+1)}/>
        </Stack>
    </FormControl>
  )
}
