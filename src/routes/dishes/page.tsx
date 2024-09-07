import { Box } from '@mui/material';
import DishCard from './components/DishCard';
import { IDish } from '@/types/dish';
import dishesData from '@/config/dishesData.json';

export default function DishesPage() {
  console.log('alldishes', dishesData.dishes);

  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}
    >
      {dishesData.dishes.map(dish => {
        return (
          <Box key={dish.name} sx={{ gridColumn: 'span 6' }}>
            <DishCard dish={dish as IDish} />
          </Box>
        );
      })}
    </Box>
  );
}
