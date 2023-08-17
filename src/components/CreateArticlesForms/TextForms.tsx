import React, { useRef, useState } from 'react'
import { Flex, FormControl, FormLabel,  Input, Text, Icon,  Button } from "@chakra-ui/react";
import { MdFormatBold, MdFormatItalic } from 'react-icons/md';
import JoditEditor, { IJoditEditorProps } from 'jodit-react'

export const TextForms = () => {
  const editor = useRef(null)
  const [text, setText] = useState('')
  console.log(text);
  
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
        <FormLabel htmlFor="text" fontSize={['md','lg']} fontWeight="medium">
            Texto
        </FormLabel>
        <Flex display="none" bg="gray.500" h="6" borderTopRadius="4" px="8"> 
            <Button bg="gray.700" h="full" w="0" borderRadius="0" 
              _hover={{bgColor: 'gray.800'}} border="1px" 
              borderColor="purple.700"
            >
                <Icon as={MdFormatBold} fontSize="md" color="gray.100" />
            </Button>

            <Button bg="gray.700" h="full" w="0" borderRadius="0" 
              _hover={{bgColor: 'gray.800'}}  
            >
                <Icon as={MdFormatItalic} fontSize="md" color="gray.100" />
            </Button>

            <Button bg="gray.700" h="full" w="0" borderRadius="0" 
              _hover={{bgColor: 'gray.800'}}  
            >
                <Text fontSize="md" color="gray.100">
                    H2
                </Text>
            </Button>

            <Button bg="gray.700" h="full" w="0" borderRadius="0" 
              _hover={{bgColor: 'gray.800'}}  
            >
                <Text fontSize="xs" color="gray.100">
                    H3
                </Text>
            </Button>

        </Flex>
        <Input display="none" as="textarea" id="text" name="text" type="text" 
            h="280px" borderTopRadius="0"
            focusBorderColor='purple.700' _hover={{bgColor: 'gray.800'}}        
            bgColor='gray.800' variant='filled' size='sm' onFocus={(event) => console.log(event)
            }/>
          <JoditEditor ref={editor} value={text} config={config} 
          onBlur={(value) => {setText(value);}}/>
    </FormControl>
  )
}
