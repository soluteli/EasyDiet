/* eslint-disable node/file-extension-in-import */
import path from 'path/posix';
import fg from 'fast-glob';
import fse from 'fs-extra';
import chalk from 'chalk';
import extractDish from './extractdishItem.mjs';

async function generateDishesList() {
  const dishesMeta = await fg(['HOWTOCOOK/dishes/**/*.md'], {
    objectMode: true,
  });

  const catogorySet = new Set();

  const dishesPromise = dishesMeta.map(async dishMeta => {
    const { path, name: _name } = dishMeta;
    const result = path.match(/dishes\/([^/]+)/);
    const catogory = result ? result[1] : '';

    catogorySet.add(catogory);

    const name = _name.replace('.md', '');
    const posterPath = path.replace('.md', '.+(jpg|jpeg|webp|png)');
    const posters = await fg(posterPath, {
      extglob: true,
    });
    const poster = (Array.isArray(posters) ? posters[0] || '' : '').replace(
      'HOWTOCOOK',
      '',
    );

    const otherProperties = await extractDish(path);

    // 生成 dishes list, 包含主 name，desc，level，category
    return {
      name,
      path: path.replace('HOWTOCOOK', ''),
      catogory,
      poster,
      ...otherProperties,
    };
  });

  const dishes = await Promise.all(dishesPromise);

  return {
    dishes,
    catogories: [...catogorySet],
  };
}

const dishesData = await generateDishesList();
const dishesDataPath = path.join(process.cwd(), 'src/config/dishesData.json');
fse.removeSync(dishesDataPath);
fse.writeFileSync(dishesDataPath, JSON.stringify(dishesData, null, 2));
console.log(chalk.green('✔ Generate dishesData.json successful'));

const sourcePath = path.join(process.cwd(), 'HOWTOCOOK/dishes');
const publicPath = path.join(process.cwd(), 'config/public/dishes');
fse.emptyDirSync(publicPath);
fse.copySync(sourcePath, publicPath, { overwrite: true });
console.log(chalk.green('✔ Move dishes to config/public/dishes successful'));
