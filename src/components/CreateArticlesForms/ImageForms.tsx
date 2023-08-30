import React, { useState, useEffect } from 'react'
import Image from '../../../node_modules/next/image';
import {  FormControl, FormLabel,  Input, Text, Icon } from "@chakra-ui/react";
import { RiAddCircleLine } from "react-icons/ri";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FormCreateArticles } from '@/interfaces/_interfaces';

interface ImageFormsProps {
  setValue: UseFormSetValue<FormCreateArticles>
  getValues: UseFormGetValues<FormCreateArticles>
  }

export const ImageForms = ({ setValue, getValues }: ImageFormsProps) => {
  const [ image, setImage ] = useState<string | ArrayBuffer | null>(null)
  useEffect(() => {
    setImage(getValues('image'))
  }, [image])
  return (
    <FormControl >
        <Text fontSize={['md','lg']} mb="2.5" fontWeight="medium">Imagem</Text>
        <FormLabel  htmlFor="image" display="grid" placeContent="center"
            variant="filled" minH="360px" w="full" borderRadius="8" bgColor='gray.800' 
            _hover={{bgColor: 'gray.800'}} overflow="hidden"
        >
          {image && <img  src={image as string} alt="image"/>}
            <Input id="image" name="image" type="file" display="none"
            onChange={(event)=>{
                    let reader = new FileReader();
                    reader.onload = () => {
                        setImage( reader.result )
                        setValue('image', reader.result)
                    }
                    if(event.target.files) {
                      try{
                        reader.readAsDataURL(event.target.files[0]);
                      } catch{

                      }
                        
                    }
                    
              }}/>
          {!image && <Icon as={RiAddCircleLine} fontSize="4xl" color="purple.200" />}
            
        </FormLabel>
    </FormControl>
  )
}
