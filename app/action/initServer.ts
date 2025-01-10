'use server';

import { createServer } from 'http';
import Gun from 'gun';

let serverRunning = false;

export const initServer = async () => {
  if (serverRunning) {
    console.log('Server is already running');
    return;
  }

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
  server.listen(3000, () => {
    serverRunning = true;
    console.log('Server is listening on http://localhost:3000');
  });
};
