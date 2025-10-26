import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const filePath = join(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = join(__dirname, 'files', 'archive.gz');

  return new Promise((resolve, reject) => {
    const input = createReadStream(filePath, { encoding: 'utf-8' });
    const gzip = createGzip();
    const out = createWriteStream(outputPath);
    input.pipe(gzip).pipe(out);

    input.on('error', (err) => {
      reject(err);
    });

    input.on('end', () => {
      resolve();
    });
  });
};

await compress();
