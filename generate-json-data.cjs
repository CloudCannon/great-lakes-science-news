const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

(async () => {
  const collectionName = 'science';

  if (!collectionName) {
    throw new Error('Please provide the collection name to install');
  }

  const collectionDir = path.join('src', 'content', collectionName);
  const destDir = path.join('.', 'json', collectionName);
  await fs.mkdir(destDir, { recursive: true });
  console.log(
    `📝 Formatting ${collectionName} data files now from ${collectionDir}...`
  );
  const files = await fs.readdir(collectionDir);

  const items = await Promise.all(
    files.map(async (fileName) => {
      const dataFilepath = path.join(collectionDir, fileName);
      console.log(`📝 Reading ${dataFilepath} into data file...`);
      const contents = await fs.readFile(dataFilepath);
      return matter(contents);
    })
  );

  const destPath = path.join(destDir, `${collectionName}.json`);
  await fs.unlink(destPath);
  console.log(`Writing to ${destDir}`);
  await fs.writeFile(
    destPath,
    JSON.stringify(items, null, 2),
    'utf-8',
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
})();
