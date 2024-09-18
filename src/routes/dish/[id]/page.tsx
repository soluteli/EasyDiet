import { useParams } from '@modern-js/runtime/router';
import { Box, Link } from '@mui/material';
import { useLoader } from '@modern-js/runtime';
import Markdown from 'markdown-to-jsx';
import path from 'path-browserify';
import dishesData from '@/config/dishesData.json';

export default function DishDetail() {
  const params = useParams();
  console.log('🚀 ~ DishDetail ~ params:', params);

  const dishItem = dishesData.dishes.find(item => item.name === params.id);
  const { data } = useLoader(
    async (context, params) => {
      const response = await fetch(params);
      const blobData = await response.blob();
      return blobData.text();
    },
    {
      params: dishItem?.path,
    },
  );

  const Image = (props: { src: string }) => {
    const basePathErr = dishItem?.path.split('/');
    basePathErr?.pop();
    console.log('🚀 ~ Image ~ dishItem?.path:', dishItem?.path);
    const src = path.join('/', ...(basePathErr || []), props.src);
    console.log('🚀 ~ Image ~ src:', src);
    return <img {...props} src={src} />;
  };

  return (
    <Box sx={{ padding: 2 }} className="flex flex-col h-100%">
      <Box
        component="article"
        className="overflow-y-auto text-base prose prose-truegray xl:text-xl"
      >
        <Markdown
          options={{
            overrides: {
              a: {
                component: Link,
              },
              img: {
                component: Image,
              },
            },
          }}
        >
          {data}
        </Markdown>
      </Box>
    </Box>
  );
}
