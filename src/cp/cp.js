import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = path.join(__dirname, 'files', 'script.js');
  const proc = spawn('node', [scriptPath, ...args]);
  process.stdin.pipe(proc.stdin);
  proc.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 3, true]);
