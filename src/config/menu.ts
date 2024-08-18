import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const menusData = [
  {
    path: '/weekly',
    label: '本周',
    icon: LocalDiningIcon,
  },
  {
    path: '/favourites',
    label: '喜欢',
    icon: FavoriteIcon,
  },
  {
    path: '/dishes',
    label: '菜谱',
    icon: MenuBookIcon,
  },
  {
    path: '/my',
    label: '我的',
    icon: AccountCircleIcon,
  },
];
