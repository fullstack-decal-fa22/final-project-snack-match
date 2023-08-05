import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from './components/buttonStyles';

export const BaseTheme = extendTheme({
    colors: {
        'primary': '#ADD8E6',
        'secondary': '#ECECEC',
        'blocked': '#D4D4D4'
    },
    components: {
        Button,
    }
});

