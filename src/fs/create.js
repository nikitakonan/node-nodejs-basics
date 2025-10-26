import { writeFile, access, constants } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  return new Promise((resolve, reject) => {
    const filePath = join(__dirname, 'files', 'fresh.txt');

    access(filePath, constants.R_OK, (err) => {
      if (!err) {
        // file exists
        return reject(new Error('FS operation failed'));
      }
      const data = 'I am fresh and young';
      writeFile(filePath, data, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
};

await create();
