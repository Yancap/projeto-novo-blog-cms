import React, { useState, useEffect } from 'react'
import Image from '../../../node_modules/next/image';
import {  FormControl, FormLabel,  Input, Text, Icon, useRadioGroup, HStack, Box, useRadio } from "@chakra-ui/react";
import { RiAddCircleLine } from "react-icons/ri";
import { FormCreateArticles } from '@/interfaces/_interfaces';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';

interface StateFormsProps {
    setValue: UseFormSetValue<FormCreateArticles>
    state: string
}

export const StateForms = ({ setValue, state }: StateFormsProps) => {
    const [ stateArt, setStateArt ] = useState<string | undefined>(state)
    
    const { getRootProps, getRadioProps, setValue: setRadioValue } = useRadioGroup({
        name: 'state',
        defaultValue: state,
        onChange: (stateChange) => {
            setStateArt(stateChange)
            setValue('state', stateChange)
        },
    })
    const group = getRootProps()
    
    useEffect(() => {
        setRadioValue(state as string);
    }, [])
    
    return (
        <HStack {...group}>
            <RadioCard key={'active'} radio={getRadioProps({ value: 'active' }) as any} value={stateArt}>
                Ativar
            </RadioCard>
            <RadioCard key={'inactive'} radio={getRadioProps({ value: 'inactive' }) as any} value={stateArt}>
                Desativar
            </RadioCard>
            <RadioCard key={'draft'} radio={getRadioProps({ value: 'draft' }) as any} value={stateArt}>
                Rascunho
            </RadioCard>
        </HStack>
    )
  }
  

interface RadioCardProps {
    radio: any;
    value: string | undefined;
    children: string;
}

function RadioCard({radio, children, value}: RadioCardProps) {
const { getInputProps, getRadioProps, state } = useRadio(radio)

const input = getInputProps()
const checkbox = getRadioProps()

const box = {
    cursor:'pointer',
    borderRadius:'md',
    boxShadow:'md',
    bg: 'gray.800',
    fontFamily: 'Poppins',
    _focus:{
        boxShadow: 'none',
    },
    fontSize:{base: "12px", md:"16px"},
    px:{base: 2, md:5},
    py:{base: 2, md:3}
}
return (
    <Box as='label'>
    <input {...input} />
    <Box {...checkbox} {...box}
        _checked={{
        fontWeight: 'bold',

        bg: value === "active" ? "green.800" : 
        value === "draft" ? "yellow.500" : 
        "red.800" ,

        color: 'white',

        borderColor: value === "active" ? "green.800" : 
        value === "draft" ? "yellow.500" : 
        "red.800",
        }}
    >
        {children.toUpperCase()}
    </Box>
    </Box>
)
}