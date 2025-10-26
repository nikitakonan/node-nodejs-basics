import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const FILE_TO_READ_PATH = join(__dirname, 'files', 'fileToRead.txt');

  if (!existsSync(FILE_TO_READ_PATH)) {
    throw new Error('FS operation failed');
  }

  const file = await readFile(FILE_TO_READ_PATH);
  console.log(file.toString());
};

await read();
