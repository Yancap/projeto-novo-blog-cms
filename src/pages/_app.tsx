import { theme } from '@/styles/theme'
import "../styles/fonts.css"
import "../styles/scroll.css"
import "../styles/jodit.css"

import type { AppProps } from 'next/app'
import { ChakraProvider } from '../../node_modules/@chakra-ui/react/dist/chakra-provider'
import { QueryClientProvider, QueryClient } from 'react-query'
import { AsideDrawerProvider } from '@/context/AsideDrawerContext'
import { ManagementProvider } from '@/context/ManagementContext'
import { makeServer } from '@/services/miragejs'


if(process.env.NODE_ENV === 'development') {
  makeServer()
}
const client = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <ManagementProvider>
          <AsideDrawerProvider>
            <Component {...pageProps} />
          </AsideDrawerProvider>
        </ManagementProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
