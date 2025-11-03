import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILES_FOLDER = join(__dirname, 'files');
const FILES_COPY_FOLDER = join(__dirname, 'files_copy');

const copy = async () => {
  if (!existsSync(FILES_FOLDER) || existsSync(FILES_COPY_FOLDER)) {
    throw new Error('FS operation failed');
  }

  await mkdir(FILES_COPY_FOLDER);
  await copyDirectory(FILES_FOLDER, FILES_COPY_FOLDER);
};

await copy();

async function copyDirectory(source, target) {
  const files = await readdir(source, { withFileTypes: true });
  for (const file of files) {
    const sourcePath = join(source, file.name);
    const targetPath = join(target, file.name);
    if (file.isDirectory()) {
      await mkdir(targetPath);
      await copyDirectory(sourcePath, targetPath);
    } else {
      await copyFile(sourcePath, targetPath);
    }
  }
}
