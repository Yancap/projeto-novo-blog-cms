import { Box,  Button,  Flex, Icon, Stack, useRadio} from '@chakra-ui/react'
import React, { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { filterProps } from '../../../node_modules/framer-motion/dist/index';

interface FilterProps {
    children: React.ReactNode
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>
    setFilter: any;
}



export const Filter = ({children, active, setActive, setFilter }: FilterProps) => {
  const stack = useRef<HTMLFormElement>(null)
  const filterProps = {
    bg: "#27282B", 
    borderRadius:"8", 
    transitionDuration:".5s", 
    transition:"all", 
    position: "absolute",
    right: "0px",  
    pb:{base:"71px", md:"4"},  
    pt:"2", 
    px:"2",
    w:{base:"80vw", sm:"460px"}, 
    justifyContent:"space-between", 
    display: active ? "flex" : "none"
   }
  return (
    <Flex {...filterProps}>
        <Stack as="form" py="2" pl="2" flexGrow="1" ref={stack}>
            {children}
            <Button onClick={(event) => {
                setFilter(null)
                stack.current?.querySelectorAll("[data-checked]").forEach((item) => {
                    item.removeAttribute("data-checked")
                    const input = item.querySelector("input")
                    if (input) {
                        input.checked = false
                        console.log(input.checked);
                    }
                })
            }} colorScheme='purple'>
                Limpar o filtro
            </Button>
        </Stack>
        <Box as="header" cursor="pointer" onClick={() => setActive(false)}>
            <Icon as={RiCloseFill} fontSize="xl"/>
        </Box>
    </Flex>
  )
}
