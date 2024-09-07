import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import DishCard from './components/DishCard';
import { IDish } from '@/types/dish';
import dishesData from '@/config/dishesData.json';
import { CategoryNameMap } from '@/config/constants';

export default function DishesPage() {
  const [tag, setTag] = useState('');
  console.log('tag', tag);

  const dishListData = dishesData.dishes.filter(
    d => !tag || d.catogory === tag,
  );

  return (
    <Box sx={{ padding: 2 }} className="flex flex-col h-100%">
      <Tabs
        value={tag}
        onChange={(_e, v) => setTag(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ minHeight: '24px' }}
      >
        {dishesData.catogories.map(c => {
          // @ts-expect-error
          const label = CategoryNameMap[c];
          if (!label) {
            return null;
          }
          return (
            <Tab
              sx={{ padding: 0, minHeight: '24px', minWidth: '60px' }}
              key={c}
              label={label}
              value={c}
            />
          );
        })}
      </Tabs>
      <Box className="flex-1 position-relative mt-2" key={tag}>
        <Box className="pos-absolute left-0 top-0 right-0 bottom-0 overflow-y-auto">
          {dishListData.map(item => {
            return (
              <Box sx={{ mb: 2 }} key={item.name}>
                <DishCard dish={item as IDish} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
