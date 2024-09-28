import { Outlet } from '@modern-js/runtime/router';
import './index.css'; // Add entry here, so that every page could use tailwindcss

import {
  Box,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material';
import { BottomNavBar } from '@/components/BottomNavBar';
import theme from '@/config/theme';

export default function Layout() {
  return (
    <CssVarsProvider theme={theme}>
      <Box className="h-screen flex flex-col">
        <Box sx={{ height: 'env(safe-area-inset-top, 0)' }} />
        <Box className="relative flex-1">
          <Box className="left-0 absolute top-0 right-0 bottom-0">
            <Outlet />
          </Box>
        </Box>
        <BottomNavBar />
        <Box sx={{ height: 'env(safe-area-inset-bottom, 0)' }} />
      </Box>
    </CssVarsProvider>
  );
}
