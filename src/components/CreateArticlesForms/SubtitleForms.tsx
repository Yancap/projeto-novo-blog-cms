import React, { useState } from 'react'
import { Input } from '../Input'
import { useCreateArticles } from '@/hooks/useCreateArticles'


import { UseFormRegister } from "react-hook-form";
import { FormCreateArticles } from '@/interfaces/_interfaces';

interface SubtitleFormsProps {
  register: UseFormRegister<FormCreateArticles>
}


export const SubtitleForms = ({register}: SubtitleFormsProps) => {
  
  
  return (
    <>
        <Input label="Subtitulo" type="text" {...register('subtitle')}/>
    </>
  )
}
