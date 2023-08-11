import { theme } from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '../../node_modules/@chakra-ui/react/dist/chakra-provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>

  )
}
