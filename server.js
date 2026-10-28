const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const REMOTE_BASE = 'https://files.gamezhero.com/game/905/1d1/9051d1173be765fb/data';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.unityweb': 'application/octet-stream',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  // CORS & Permissions headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  let reqPath = req.url.split('?')[0];
  if (reqPath === '/log') {
    const query = new URL('http://localhost' + req.url).searchParams;
    const msg = query.get('msg') || '';
    console.log('[BROWSER]', msg);
    fs.appendFileSync(path.join(__dirname, 'browser_debug.log'), msg + '\n');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }

  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const localPath = path.join(__dirname, reqPath);

  // If file exists locally on disk, serve it
  if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
    const ext = path.extname(localPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(localPath).pipe(res);
    return;
  }

  // Otherwise, proxy from remote Subway Surfers asset host
  const remoteUrl = REMOTE_BASE + reqPath;
  const proxyReq = https.get(remoteUrl, {
    headers: {
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
      'Referer': 'https://files.gamezhero.com/'
    }
  }, (proxyRes) => {
    // If successful, cache to disk for fast subsequent loads
    if (proxyRes.statusCode === 200) {
      const dir = path.dirname(localPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const fileStream = fs.createWriteStream(localPath);
      proxyRes.pipe(fileStream);
    }

    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error for', reqPath, err.message);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('502 Bad Gateway');
  });
});

server.listen(PORT, () => {
  console.log(`Subway Runner Proxy Server running at http://localhost:${PORT}`);
});
