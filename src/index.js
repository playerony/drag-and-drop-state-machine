import fs from 'indexeddb-fs';

const doActions = async () => {
  await fs.createDirectory('files');
  await fs.createDirectory('/files/private');
  await fs.createDirectory('root/files/public');

  console.log(await fs.isDirectory('root')); // true
  console.log(await fs.isDirectory('files')); // true
  console.log(await fs.isDirectory('/files/private'));
};

doActions();
