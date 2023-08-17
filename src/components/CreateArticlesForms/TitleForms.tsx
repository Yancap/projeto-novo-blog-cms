import React, { useState } from 'react'
import { Input } from '../Input'
import { useCreateArticles } from '@/hooks/useCreateArticles'
import { FormCreateArticles } from '@/pages/create'
import { UseFormRegister } from "react-hook-form";

interface TitleFormsProps {
  register: UseFormRegister<FormCreateArticles>
}

export const TitleForms = ({register}: TitleFormsProps) => {
  console.log("aaaaaa");
  
  return (
    <>
        <Input label="Titulo" type="text" {...register('title')}/>
    </>
  )
}