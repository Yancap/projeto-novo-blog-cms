import React, { useEffect, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import {  FormControl, FormLabel } from "@chakra-ui/react";
import {  MdFormatItalic } from 'react-icons/md';
import { FormCreateArticles } from '@/interfaces/_interfaces';
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";


interface TextFormsProps {
  setValue: UseFormSetValue<FormCreateArticles>
  getValues: UseFormGetValues<FormCreateArticles>
}

function TextForms({setValue, getValues}: TextFormsProps){
  const editor = useRef(null)
  const [clientRendered, setClientRendered] = useState(false);
  
  
  useEffect(() => {
    setClientRendered(true);
  }, []);
  const  config = {
      readonly: false,
      height: 280,
      removeButtons: ['hr', 'source', 'underline', 'strikethrough', 
      'eraser', 'font', 'classSpan', 'lineHeight', 'file', 'image', 
      'video', 'print', 'about', 'cut', 'copy', 'paste', 'copyformat',
      'symbols', 'selectall', 'brush', 'indent', 'outdent'],
      placeholder: "Inicie seu texto..."
  }
  
  return (
    
    <FormControl>
      { clientRendered &&
      <>
        <FormLabel htmlFor="text" fontSize={['md','lg']} fontWeight="medium">
            Texto
        </FormLabel>
          <JoditEditor ref={editor} config={config} value={getValues('text')}
          onBlur={(value) => {setValue('text', value)}} />
      </>
      }
    </FormControl>
  )
}

export default TextForms