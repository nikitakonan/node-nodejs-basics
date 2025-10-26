import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createUnzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputPath = join(__dirname, 'files', 'archive.gz');
  const outputPath = join(__dirname, 'files', 'fileToCompress.txt');

  return new Promise((resolve, reject) => {
    const input = createReadStream(inputPath);
    const unzip = createUnzip();
    const out = createWriteStream(outputPath);

    input.on('error', (err) => reject(err));
    unzip.on('error', (err) => reject(err));
    out.on('error', (err) => reject(err));
    out.on('finish', () => resolve());

    input.pipe(unzip).pipe(out);
  });
};

await decompress();
