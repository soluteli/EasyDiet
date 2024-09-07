export enum ICategory {
  aquatic = 'aquatic,',
  breakfast = 'breakfast,',
  meat_dish = 'meat_dish,',
  vegetable_dish = 'vegetable_dish,',
  staple = 'staple,',
  'semi-finished' = 'semi-finished',
  soup = 'soup,',
  drink = 'drink,',
  dessert = 'dessert', // 甜品'
  condiment = 'condiment', // 酱料
}

export interface IDish {
  name: string;
  poster?: string;
  level: number;
  desc: string;
  catogory: keyof typeof ICategory;
}
