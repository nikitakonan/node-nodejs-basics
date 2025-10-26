import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  return new Promise((resolve, reject) => {
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const stream = createWriteStream(filePath, { encoding: 'utf-8' });

    process.stdin.on('data', (chunk) => {
      stream.write(chunk);
    });
    process.stdin.on('error', (err) => {
      reject(err);
    });
    process.stdin.on('end', () => {
      stream.end();
      resolve();
    });
  });
};

await write();
