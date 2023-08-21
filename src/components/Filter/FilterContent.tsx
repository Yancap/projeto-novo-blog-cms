import {  RadioGroup, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Input } from '../Input'
import { Checkbox } from './Checkbox'

interface FilterContentProps {
    value: string;
    children: React.ReactNode
}   


export const FilterContent = ({value, children}:FilterContentProps) => {
  return (
    <RadioGroup 
    //display="grid" gridTemplateColumns="1fr 1fr 1fr" 
    as="form" defaultValue={value}>
        <SimpleGrid columns={3} spacing="1">
           {children} 
        </SimpleGrid>
    </RadioGroup >
  )
}
