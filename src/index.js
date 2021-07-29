import fs from 'indexeddb-fs';

import './style.css';

const doActions = async () => {
  await fs.createDirectory('files');
  await fs.createDirectory('/files/private');
  await fs.createDirectory('root/files/public');
};

doActions();
