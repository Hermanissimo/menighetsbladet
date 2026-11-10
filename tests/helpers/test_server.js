const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown; charset=utf-8'
};

function createTestServer(options = {}) {
  const rootDir = options.rootDir || path.resolve(__dirname, '..', '..');
  const customDataPath = options.customDataPath || null;

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const parsedUrl = new URL(req.url, 'http://localhost');
      let reqPath = decodeURIComponent(parsedUrl.pathname);

      // 1. API Endpoint: /api/save
      if (reqPath === '/api/save' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            if (options.onSave) {
              options.onSave(body);
            }
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ ok: false, error: err.message }));
          }
        });
        return;
      }

      // 2. Custom test data override for /data/source.json
      if (customDataPath && (reqPath === '/data/source.json' || reqPath === '/standalonePS/data/source.json')) {
        if (fs.existsSync(customDataPath)) {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          fs.createReadStream(customDataPath).pipe(res);
          return;
        }
      }

      // 3. Static file serving
      if (reqPath === '/' || reqPath === '') reqPath = '/web/index.html';
      let filePath = path.join(rootDir, reqPath);

      fs.stat(filePath, (err, stats) => {
        if (!err && stats.isDirectory()) {
          filePath = path.join(filePath, 'index.html');
        }
        fs.stat(filePath, (err2, stats2) => {
          if (err2 || !stats2.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found: ' + reqPath);
            return;
          }

          const ext = path.extname(filePath).toLowerCase();
          const contentType = mimeTypes[ext] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': contentType });
          fs.createReadStream(filePath).pipe(res);
        });
      });
    });

    const targetPort = options.port || 0; // 0 chooses a random free port
    server.listen(targetPort, () => {
      const port = server.address().port;
      resolve({
        server,
        port,
        url: `http://localhost:${port}/web/`,
        close: () => new Promise(r => server.close(r))
      });
    });
    server.on('error', reject);
  });
}

module.exports = { createTestServer };

