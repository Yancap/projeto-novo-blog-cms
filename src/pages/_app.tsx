import { theme } from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '../../node_modules/@chakra-ui/react/dist/chakra-provider'
import "../styles/fonts.css"
import "../styles/scroll.css"

import { AsideDrawerProvider } from '@/context/AsideDrawerContext'
import { ManagementProvider } from '@/context/ManagementContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ManagementProvider>
        <AsideDrawerProvider>
          <Component {...pageProps} />
        </AsideDrawerProvider>
      </ManagementProvider>
    </ChakraProvider>

  )
}
