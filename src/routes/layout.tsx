import { Outlet } from '@modern-js/runtime/router';
import 'uno.css';
import '@unocss/reset/tailwind-compat.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  Box,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material';
import { BottomNavBar } from '@/components/BottomNavBar';
import theme from '@/config/theme';

export default function Layout() {
  return (
    <CssVarsProvider theme={theme}>
      <Box className="h-100vh flex flex-col">
        <Box sx={{ height: 'env(safe-area-inset-top, 0)' }} />
        <Box className="flex-1 position-relative">
          <Box className="pos-absolute left-0 top-0 right-0 bottom-0">
            <Outlet />
          </Box>
        </Box>
        <BottomNavBar />
        <Box sx={{ height: 'env(safe-area-inset-bottom, 0)' }} />
      </Box>
    </CssVarsProvider>
  );
}
