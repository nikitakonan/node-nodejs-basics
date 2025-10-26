import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  return new Promise((resolve, reject) => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const stream = createReadStream(filePath, { encoding: 'utf-8' });

    stream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    stream.on('error', (err) => {
      reject(err);
    });
    stream.on('end', () => {
      process.stdout.write('\n');
      resolve();
    });
  });
};

await read();
