import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const FILE_TO_REMOVE_PATH = join(__dirname, 'files', 'fileToRemove.txt');

  if (!existsSync(FILE_TO_REMOVE_PATH)) {
    throw new Error('FS operation failed');
  }

  await unlink(FILE_TO_REMOVE_PATH);
};

await remove();
