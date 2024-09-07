import { ICategory } from '@/types/dish';

export const CategoryNameMap: Record<keyof typeof ICategory, string> = {
  aquatic: '水产',
  breakfast: '早餐',
  condiment: '酱料',
  drink: '饮料',
  meat_dish: '荤菜',
  'semi-finished': '预制菜',
  soup: '汤与粥',
  staple: '主食',
  vegetable_dish: '素菜',
  dessert: '甜品',
};
