import Head from 'next/head'
import { Flex, Text, Box, Stack, Button } from '@chakra-ui/react'
import { Input } from '@/components/Input/index'


export default function Home() {
  return (
    <>
      <Head>
        <title>Login | ARTechCMS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" justify="center" align="center" w="100vw" h="100vh" p="4">
        <Flex as="form" gap={["8","12"]} direction="column" bg="gray.900" 
          px={["2rem","4rem"]} py="5.25rem" w="100%" maxW="480px" borderRadius={8}>
          <Stack spacing="5">
            <Box >
              <Input type='email' label='E-mail'/>
            </Box>
            <Box >
              <Input type='password' label='Senha'/>
            </Box>
          </Stack>
          <Button size={['md','lg']} bg="purple.700" fontSize="xl" color="white"  _hover={{bgColor: 'purple.800'}}>
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
