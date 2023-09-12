import React, { useState } from 'react'
import { Input } from '../Input'
import { useCreateArticles } from '@/hooks/useCreateArticles'
import { UseFormRegister } from "react-hook-form";
import { FormCreateArticles } from '@/interfaces/_interfaces';

interface TitleFormsProps {
  register: UseFormRegister<FormCreateArticles>
}

export const TitleForms = ({register}: TitleFormsProps) => {
  
  return (
    <>
        <Input label="Titulo" type="text" {...register('title')}/>
    </>
  )
}