import { extendTheme } from "@chakra-ui/react";


//Estendendo e Personalizando
export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#18191F",
            "800": "#1E2027",
            "700": "#",
        }
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    styles: {
        global: {
            body:{
                bg: 'gray.800',
                color: 'gray.50'
            }
        }
    }})
