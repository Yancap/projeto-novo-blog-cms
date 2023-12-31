import {useEffect, useState} from 'react'
import { Flex, FormControl, FormLabel, Stack, Input, Text, Icon, Box, Button } from "@chakra-ui/react";
import { RiAddCircleLine, RiCloseCircleLine } from "react-icons/ri";
import { RxTextAlignLeft } from "react-icons/rx";
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { FormCreateArticles } from '@/interfaces/_interfaces';


interface TagsInputForm {
    name: string;
}

interface TagsFormsProps {
    setValue: UseFormSetValue<FormCreateArticles>
    tags?: TagsInputForm[] 
}

export const TagsForms = ({setValue, tags}: TagsFormsProps) => {
  const [ tagsArticle, setTagsArticle ] = useState<TagsInputForm[]>(tags ?? [])
  const [ add, setAdd ] = useState(tags?.length ?? 0)
  let elements = []
  for(let i = 0; i < add+1; i++){
    elements.push(
        <Flex gap="10" key={i} borderBottom={{base: "2px",md:"0"}} borderColor="gray.900">
            <Box w={{base: "100%",md:"70%"}} borderLeft="2px" borderColor="gray.900" px="4" py="2">
                <FormLabel fontSize="sm" color="gray.400">
                    Tag
                </FormLabel>
                <Flex borderBottom="2px" borderColor="gray.400">
                    <Icon as={RxTextAlignLeft} fontSize="2xl" color="purple.200" />
                    <Input type="text" name="tag" variant="unstyled"
                    borderRadius="0" color="purple.300" px="1" value={ tagsArticle.length > i ? tagsArticle[i].name : undefined}
                    onChange={({currentTarget}) => {
                        setTagsArticle(tags => {
                            tags[add] = { name: currentTarget.value }
                            return tags
                        })
                        setValue('tags', tagsArticle)
                        
                    }}
                    />
                </Flex>
            </Box>
        </Flex> 
    )
  }
  
  return (
    <FormControl w={{base: "100%",md:"50%"}}>
        <Text fontSize={['md','lg']} mb="2.5" fontWeight="medium">
            Tags
        </Text>
        <Stack minH="120px" borderRadius="4" bgColor='gray.800' px="8" py="4">
            
            {...elements}
            <Flex gap='2'>
                <Icon as={RiAddCircleLine} fontSize="2xl" color="purple.200" 
                onClick={() => setAdd(add+1)}/>
                { add >= 1 &&
                <Icon as={RiCloseCircleLine} fontSize="2xl" color="purple.200" 
                onClick={() => {
                    setAdd(add-1)
                    setTagsArticle(tag => {
                        try {
                            tag.splice(add, 1)
                            setValue('tags', tagsArticle)
                            return tag
                        } catch {
                            return tag
                        }
                    })
                }}/>
                }
            </Flex>
            
        </Stack>
    </FormControl>
  )
}
