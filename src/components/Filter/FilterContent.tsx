import {  RadioGroup, SimpleGrid, Flex, useRadioGroup } from '@chakra-ui/react'
import React, { Dispatch, RefObject, SetStateAction, useState } from 'react'
import { Checkbox } from './Checkbox'
export interface FilterState {
  filter_category?: string
  filter_author?: string
  filter_publication?: string;
  order?: string;
}

interface FilterContentProps {
    value: string;
    setFilter: Dispatch<SetStateAction<FilterState | null>>
    children: React.ReactNode
}   


export const FilterContent = ({value, children, setFilter}:FilterContentProps) => {
  //const {} = useRadioGroup()
  const [ test, setTest] = useState(false)
  return (
    <RadioGroup pb="2" mb="4" borderBottom="4px" borderBottomColor="gray.800" 
    as="form" defaultValue={value} 
    onChange={(content: string) => { 
      setFilter(filter => ({ ...filter, [value]: content}))
    }}>
        <Flex align="start" justify="space-between" flexWrap="wrap" gap="1">
          
           {children} 
        </Flex>
    </RadioGroup >
  )
}
