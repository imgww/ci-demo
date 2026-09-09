// 容器运行时静态服务器：服务 dist/ 构建产物（Docker 化部署专用入口）
// 从服务器原 server.js 迁移而来，转为 ESM 以融入仓库（.mjs 后缀）
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, sep } from 'node:path';

const port = Number(process.env.PORT) || 3000;
const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};

http.createServer(async (req, res) => {
  const urlPath = req.url === '/' ? 'index.html' : req.url.replace(/^\/+/, '');
  const file = join(dist, urlPath);

  // 防目录穿越：请求必须落在 dist/ 内
  if (file !== dist && !file.startsWith(dist + sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'text/plain' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not Found: ' + req.url);
  }
}).listen(port, () => {
  console.log(`ci-demo container on http://0.0.0.0:${port}`);
});