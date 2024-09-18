import { ChangeEvent, useState } from 'react';
import { Box, Tab, Tabs, OutlinedInput, InputAdornment } from '@mui/material';
import { Search, HighlightOffOutlined } from '@mui/icons-material';
import { useNavigate } from '@modern-js/runtime/router';
import DishCard from './components/DishCard';
import { IDish } from '@/types/dish';
import dishesData from '@/config/dishesData.json';
import { CategoryNameMap } from '@/config/constants';

export default function DishesPage() {
  const navigate = useNavigate();
  const [tag, setTag] = useState('');
  const [keyword, setKeyword] = useState('');

  const dishListData = dishesData.dishes
    .filter(d => !tag || d.catogory === tag)
    .filter(d =>
      d.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
    );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTag('');
    setKeyword((e.target.value || '').trim());
  };

  const handleClear = () => {
    setKeyword('');
  };

  const handleClick = (dish: IDish) => {
    navigate(`/dish/${dish.name}`);
  };

  return (
    <Box sx={{ padding: 2 }} className="flex flex-col h-100%">
      <Box>
        <OutlinedInput
          fullWidth
          placeholder="搜索菜谱"
          value={keyword}
          onChange={handleSearch}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          endAdornment={
            keyword.trim() ? (
              <InputAdornment position="end">
                <HighlightOffOutlined onClick={handleClear} />
              </InputAdornment>
            ) : null
          }
        />
      </Box>
      <Tabs
        value={tag}
        onChange={(_e, v) => setTag(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ minHeight: '24px', my: 2 }}
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
      <Box className="flex-1 position-relative" key={tag}>
        <Box className="pos-absolute left-0 top-0 right-0 bottom-0 overflow-y-auto">
          {dishListData.map(item => {
            return (
              <Box sx={{ mb: 2 }} key={item.name}>
                <DishCard dish={item as IDish} onClick={handleClick} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
