// 演示型零依赖构建：把 src/ 下的源码合并为一个单文件产物，并复制页面
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const banner = '// 由 build.js 生成的演示打包产物：src/ 下全部源码合并为一个文件\n';
const sources = ['src/math.js', 'src/index.js'];

let bundle = banner;
for (const file of sources) {
  const raw = await readFile(join(root, file), 'utf8');
  const code = raw
    .replace(/^import .*$/gm, '') // 演示型打包：合并后去掉 import
    .replace(/^export /gm, '');   // 和 export 前缀
  bundle += `\n// ===== ${file} =====\n${code}\n`;
}

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist', 'bundle.js'), bundle, 'utf8');
await copyFile(join(root, 'index.html'), join(root, 'dist', 'index.html'));
console.log(`build ok: dist/bundle.js + dist/index.html (${Buffer.byteLength(bundle, 'utf8')} bytes)`);