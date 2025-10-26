import { existsSync } from 'node:fs';
import { rename as fsRename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const WRONG_FILE_PATH = join(__dirname, 'files', 'wrongFilename.txt');
  const PROPER_FILE_PATH = join(__dirname, 'files', 'properFilename.md');

  if (!existsSync(WRONG_FILE_PATH) || existsSync(PROPER_FILE_PATH)) {
    throw new Error('FS operation failed');
  }

  await fsRename(WRONG_FILE_PATH, PROPER_FILE_PATH);
};

await rename();
