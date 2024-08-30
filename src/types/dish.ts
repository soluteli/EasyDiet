enum IDishTag {
  aquatic,
  breakfast,
  meat_dish,
  vegetable_dish,
  staple,
  'semi-finished',
  soup,
  drink,
  dessert, // 甜品
  condiment, // 酱料
}

export interface IDish {
  id: string;
  name: string;
  level: number; // 难度, 0 ~ 5
  tag: IDishTag[];
  createTime: number;
  updateTime: number;
}
