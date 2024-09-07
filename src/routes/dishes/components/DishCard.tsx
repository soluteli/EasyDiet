import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IDish } from '@/types/dish';
import { CategoryNameMap } from '@/config/constants';

interface IDishCardProps {
  dish: IDish;
}

export default function DishCard(props: IDishCardProps) {
  const {
    dish: { name, poster, desc, catogory },
  } = props;
  return (
    <Card>
      {poster ? (
        <CardMedia component="img" height="194" image={poster} alt={name} />
      ) : null}

      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {CategoryNameMap[catogory]}
        </Typography>
        {/* <Typography sx={{ color: 'text.secondary' }}>{level}</Typography> */}
        <Typography variant="body2" component="div">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton sx={{ marginLeft: 'auto' }} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
