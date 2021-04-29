import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  colors: {
    brand: {
      100: '#1c1d1c', // black
      200: '#FFBA08', // yellow
      300: '#D00000', // red
      400: '#FCF7F8', // snow
    },
  },
  styles: {
    global: {
      body: {
        bg: '#1c1d1c',
        color: '#ffffff',
      },
    },
  },
  initialColorMode: 'dark',
});
