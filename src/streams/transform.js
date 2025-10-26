import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

const reverseTransform = new Transform({
  transform(chunk, _encoding, callback) {
    callback(null, `${chunk.toString().split('').reverse().join('')}\n`);
  },
});

const transform = async () => {
  await pipeline(process.stdin, reverseTransform, process.stdout, {
    end: false,
  });
};

await transform();
