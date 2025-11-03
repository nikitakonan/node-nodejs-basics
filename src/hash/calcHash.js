import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  // implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt and logs it into console as hex using Streams API
  const FILE_PATH = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const data = await readFile(FILE_PATH);
  const hash = createHash('sha256').update(data).digest('hex');
  console.log(hash);
};

await calculateHash();
