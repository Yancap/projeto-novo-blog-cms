import {useEffect, useState} from 'react'
import { Flex, FormControl, FormLabel, Stack, Input, Text, Icon, Box, Button } from "@chakra-ui/react";
import { RiAddCircleLine, RiCloseCircleLine } from "react-icons/ri";
import { RxTextAlignLeft } from "react-icons/rx";
import { FormCreateArticles } from '@/interfaces/_interfaces';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';

interface CreditsInputForm {
    name: string;
    link: string;
}

interface CreditsFormsProps {
    setValue: UseFormSetValue<FormCreateArticles>
    credits?: CreditsInputForm[]
}

export const CreditsForms = ({setValue, credits}: CreditsFormsProps) => {
  const [ creditsArticle, setCreditsArticle ] = useState<CreditsInputForm[]>(credits ?? [])

  const [ add, setAdd ] = useState(credits?.length ?? 0)
  
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
                borderRadius="0" color="purple.300" px="1" value={ creditsArticle.length > i ? creditsArticle[i].name : undefined}
                onChange={({currentTarget}) => {
                    setCreditsArticle(credits => {
                        credits[add] = { name: currentTarget.value, link: credits[add]?.link ?? ''}
                        return credits
                    })
                    setValue('credits',  creditsArticle )
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
                    borderRadius="0" color="purple.300" px="1" value={creditsArticle.length > i ? creditsArticle[i].link : undefined }
                    onChange={({currentTarget}) => {
                        setCreditsArticle(credits => {
                            credits[add] = { link: currentTarget.value, name: credits[add]?.name ?? ''}
                            return credits
                        })
                        setValue('credits',  creditsArticle)
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
            <Flex gap="2">
            <Icon as={RiAddCircleLine} fontSize="2xl" color="purple.200" onClick={() => setAdd(add+1)}/>
            {add >= 1 && 
            <Icon as={RiCloseCircleLine} fontSize="2xl" color="purple.200" 
                onClick={() => {
                    setAdd(add-1)
                    setCreditsArticle(credits => {
                        try {
                            credits.splice(add, 1)
                            setValue('credits', creditsArticle)
                            return credits
                        } catch {
                            return credits
                        }
                    })
                    
                }}/>
            }
            </Flex>
            
        </Stack>
    </FormControl>
  )
}

