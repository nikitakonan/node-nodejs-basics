import { Worker } from 'node:worker_threads';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const promises = Array(os.cpus().length)
    .fill(0)
    .map((_, i) => {
      return new Promise((resolve) => {
        const worker = new Worker(path.join(__dirname, 'worker.js'));
        worker.once('message', (msg) => {
          resolve({
            status: 'resolved',
            data: msg,
          });
          worker.terminate();
        });
        worker.on('error', (err) => {
          console.error(err);
          resolve({
            status: 'error',
            data: null,
          });
          worker.terminate();
        });

        worker.postMessage(10 + i);
      });
    });
  const result = await Promise.all(promises);
  console.log(result);
};

await performCalculations();
