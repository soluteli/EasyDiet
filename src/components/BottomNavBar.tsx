import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useLocation, Link } from '@modern-js/runtime/router';
import { menusData } from '@/config/menu';

export function BottomNavBar() {
  const location = useLocation();

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation showLabels value={location.pathname}>
        {menusData.map(item => {
          const { label, path } = item;
          return (
            <BottomNavigationAction
              key={path}
              value={path}
              icon={<item.icon />}
              label={label}
              to={path}
              component={Link}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
}
