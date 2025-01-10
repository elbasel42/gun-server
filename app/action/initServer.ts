'use server';

import { createServer } from 'http2';
import Gun from 'gun';

export const initServer = async () => {
  const server = createServer((req, res) => {
    res.writeHead(200);
    res.end('GUN server is running');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  });

  // Attach Gun to the server
  const gun = Gun({ web: server });

  // Optionally, log Gun messages for debugging
  gun.on('in', (msg) => {
    console.log('Incoming message:', msg);
  });
  gun.on('out', (msg) => {
    console.log('Outgoing message:', msg);
  });

  // Start the server
  server.listen(3005, () => {
    console.log('Server is listening on http://localhost:3001');
  });
};
