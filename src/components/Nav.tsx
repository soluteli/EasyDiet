import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, Link } from '@modern-js/runtime/router';
import { menusData } from '@/config/menu';

export function BottomNavBar() {
  const location = useLocation();

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={location.pathname}
        aria-label="bottom nav tabs"
        role="navigation"
        variant="fullWidth"
      >
        {menusData.map(item => {
          const { label, path } = item;
          return (
            <Tab
              key={path}
              icon={<item.icon />}
              label={label}
              value={path}
              to={path}
              component={Link}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
