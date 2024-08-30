import fg from 'fast-glob';
import extractDish from './extractdish';

async function startConvert() {
  const dishesMeta = await fg(['HOWTOCOOK/dishes/**/*.md'], {
    objectMode: true,
  });

  const catogorySet = new Set();

  const dishes = dishesMeta.map(dishMeta => {
    const { path, name } = dishMeta;
    const result = path.match(/dishes\/([^/]+)/);
    const catogory = result ? result[1] : '';

    catogorySet.add(catogory);

    return {
      name: name.replace('.md', ''),
      path,
      catogory,
    };
  });

  extractDish(dishes[0].path);
}

startConvert();
