import { Button, Flex, Icon, Input } from '@chakra-ui/react'
import React, { ForwardRefRenderFunction, forwardRef } from 'react'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { MessageForm } from './MessageContainer';
import { UseFormSetValue } from 'react-hook-form';

interface MessageInputProps {
    setValue: UseFormSetValue<MessageForm>;
}

const MessageInputBase: ForwardRefRenderFunction<HTMLInputElement> = ({...props}, ref) => {
    return (
        <Flex>
            <Input ref={ref} {...props} border="none" placeholder='Digite sua mensagem...'/>
            <Button type="submit" bg="transparent" p="0" _hover={{bg: "transparent"}}>
                <Icon as={RiSendPlane2Fill} color="purple.300" fontSize="2xl" transition="all .15s" _hover={{color: "purple.700"}}/>
            </Button>
        </Flex>
    )
}

export const MessageInput = forwardRef(MessageInputBase)
