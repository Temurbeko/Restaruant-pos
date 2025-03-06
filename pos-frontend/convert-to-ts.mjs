import { readdirSync, renameSync, statSync } from 'fs';
import { join } from 'path';
import process from 'process';

const convertFiles = (dir) => {
  readdirSync(dir).forEach((file) => {
    const fullPath = join(dir, file);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      convertFiles(fullPath);
    } else if (file.endsWith('.js')) {
      renameSync(fullPath, fullPath.replace(/\.js$/, '.ts'));
      console.log(`Converted: ${fullPath} → ${fullPath.replace(/\.js$/, '.ts')}`);
    } else if (file.endsWith('.jsx')) {
      renameSync(fullPath, fullPath.replace(/\.jsx$/, '.tsx'));
      console.log(`Converted: ${fullPath} → ${fullPath.replace(/\.jsx$/, '.tsx')}`);
    }
  });
};

convertFiles(process.cwd());
console.log('Conversion complete.');
