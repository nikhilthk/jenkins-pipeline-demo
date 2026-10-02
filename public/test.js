const http = require('http');
const app = require('./app');

const server = app.listen(0, () => {
  const port = server.address().port;

  http.get('http://localhost:' + port + '/health', (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      server.close();
      try {
        const data = JSON.parse(body);
        if (res.statusCode === 200 && data.status === 'ok') {
          console.log('Test passed: /health returned ok');
          process.exit(0);
        }
      } catch (e) {}
      console.error('Test failed');
      process.exit(1);
    });
  }).on('error', (err) => {
    server.close();
    console.error('Test failed:', err.message);
    process.exit(1);
  });
});
