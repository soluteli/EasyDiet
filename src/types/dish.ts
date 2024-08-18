enum IDishTag {
  meat,
  vegetable,
  aquatic,
  breakfast,
  main,
  pre,
  soup,
  drink,
  dessert,
  sauce,
}

export interface IDish {
  name: string;
  level: number; // 难度, 0 ~ 5
  tag: IDishTag[];
}
