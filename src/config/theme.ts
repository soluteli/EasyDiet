import { experimental_extendTheme as extendTheme } from '@mui/material';

const theme = extendTheme({
  breakpoints: {
    values: {
      xs: 640,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
