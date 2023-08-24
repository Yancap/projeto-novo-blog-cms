import React, { useState } from 'react'
import {  FormControl, FormLabel,  Input, Text, Icon } from "@chakra-ui/react";
import { RiAddCircleLine } from "react-icons/ri";

interface ImageFormsProps {
    setValue: any;
  }

export const ImageForms = ({ setValue }: ImageFormsProps) => {
  
  return (
    <FormControl >
        <Text fontSize={['md','lg']} mb="2.5" fontWeight="medium">Imagem</Text>
        <FormLabel  htmlFor="image" display="grid" placeContent="center"
            variant="filled" h="360px" w="full" borderRadius="8" bgColor='gray.800' 
            _hover={{bgColor: 'gray.800'}}
        >
            <Input id="image" name="image" type="file" display="none"
            onChange={(event)=>{
                    let reader = new FileReader();
                    reader.onload = () => {
                        setValue('image', reader.result)
                        
                    }
                    if(event.target.files) {
                        reader.readAsDataURL(event.target.files[0]);
                    }
                    }}/>
            <Icon as={RiAddCircleLine} fontSize="4xl" color="purple.200" />
        </FormLabel>
    </FormControl>
  )
}
