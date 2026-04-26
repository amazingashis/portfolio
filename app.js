const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false; // app.js is strictly for the production build
// Fallback to environment variables if provided by the host
const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

// Initialize the Next.js application
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the query portion of the URL
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
