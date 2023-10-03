import React, { Dispatch, SetStateAction, useState } from 'react'
import { Flex, Box, Avatar, Button, Input, FormLabel, Icon, FlexProps } from '@chakra-ui/react'
import { RiCloseLine } from 'react-icons/ri'

interface ChangeAvatarProps {
  setModalChangeAvatar: Dispatch<SetStateAction<boolean>>
}

export const ChangeAvatar = ({setModalChangeAvatar}: ChangeAvatarProps) => {
  const section: FlexProps = {
    position:"fixed",
    top:"0",
    left:"0",
    w:"100vw",
    h:"100vh",
    zIndex:"50",
    background:"rgba(30, 32, 39, .2)",
    backdropFilter:'auto',
    backdropBlur:"8px",
    align: "center",
    justify: "center",
  }
  const container: FlexProps = {
    px:"2rem",
    py:"1.75rem",
    background:"gray.900",
    border:"2px solid",
    borderColor:" purple.700",
    borderRadius:"8px",
    maxW: "360px",
    w: "100%",
    h: "400px",
    flexDirection: "column",
    gap: "8",
    position: "relative"
  }
  const btn = {
    flexGrow:"1",
    textTransform:"uppercase",
    color:"white"
  }
  const photoContainer = {
    bg:"gray.800",
    py:"2px",
    w:"100%",
    maxH:"240px",
    overflow:"hidden",
    h:"100%",
    justify:"center",
    align:"center"
  }
  const label = {
    htmlFor:'photo',
    w:"100%",
    h:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    m:"0",
    cursor:"pointer"
  }
  const close = {
    fontSize:"2xl",
    position:"absolute",
    right:"1.5",
    top:"1.5",
    cursor:"pointer"
  }
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);

  function handleChange(event: any){
    
    let reader = new FileReader();
    reader.onload = () => {
      setPhoto( reader.result )
    }
    if(event.target.files) {
      try {
        reader.readAsDataURL(event.target.files[0]);
      } catch{}
    }
  }

  return (
    <Flex as="section" {...section}>
      <Flex {...container}>
        <Icon as={RiCloseLine} {...close} onClick={() => setModalChangeAvatar(false)}/>
        <Flex {...photoContainer}>
          <Box maxW="220px" w="100%" rounded="full">
            <Avatar w="100%" h="auto" src={photo}/>
          </Box>
        </Flex>
        <Flex justify="space-between" gap="2">
          {!photo ? 
            <Button {...btn} bg="purple.500" _hover={{bg: "purple.700"}}>
              <Input type="file" display="none" id="photo" onChange={handleChange}/>
              <FormLabel {...label}>
                Adicionar
              </FormLabel>
            </Button>
          : 
          <>
            <Button {...btn} bg="purple.500" _hover={{bg: "purple.700"}}>
              <Input type="file" display="none" id="photo" onChange={handleChange}/>
              <FormLabel {...label}>
                Trocar
              </FormLabel>
            </Button>
            <Button {...btn} bg="green.500" _hover={{bg: "green.600"}}>
              Enviar
            </Button>
          </>
          }
          
        </Flex>
      </Flex>
    </Flex>
  )
}
