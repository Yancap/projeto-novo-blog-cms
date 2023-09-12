import { extendTheme } from "@chakra-ui/react";


//Estendendo e Personalizando
export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#18191F",
            "800": "#1E2027",
            "700": "#404451",
            "600": "#444755",
            "500": "#4A4E5D",
            "400": "#686E82",
            "300": "#919AB7",
            "200": "#AEB8D6",
            "100": "#D0DAFA",
        },
        purple: {
            "900": "#4340FF",
            "800": "#4643F0",
            "700": "#5653F4",
            "300": "#9D9BF2",
            "200": "#868AA8"
        }
    },
    breakpoints: {
        
    },
    fonts: {
        heading: 'Poppins',
        body: 'Ubuntu'
    },
    styles: {
        global: {
            body:{
                bg: 'gray.800',
                color: 'gray.100'
            }
        }
    }})
