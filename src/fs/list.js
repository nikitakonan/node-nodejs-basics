import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  if (!existsSync(join(__dirname, 'files'))) {
    throw new Error('FS operation failed');
  }

  const files = await readdir(join(__dirname, 'files'), {
    withFileTypes: true,
  });
  for (const file of files) {
    console.log(file.name);
  }
};

await list();
