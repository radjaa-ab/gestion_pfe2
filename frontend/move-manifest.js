import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../backend/public/build/.vite');
const targetDir = path.join(__dirname, '../backend/public/build');

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Move the manifest file
fs.copyFileSync(
  path.join(sourceDir, 'manifest.json'),
  path.join(targetDir, 'manifest.json')
);

console.log('Manifest file moved successfully.');

