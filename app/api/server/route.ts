'use server';

import { createServer } from 'http';
import Gun from 'gun';
import { NextRequest, NextResponse } from 'next/server';

let serverRunning = false;

export const initServer = async () => {
  if (serverRunning) {
    console.log('Server is already running');
    return;
  }

  const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(200);
    res.end('GUN server is running');
  });

  // Attach Gun to the server

  // Optionally, log Gun messages for debugging

  // Start the server
  server.listen(3000, () => {
    serverRunning = true;
    console.log('Server is listening on http://localhost:3000');
  });
};

export const dynamic = 'force-dynamic'; // always run dynamically

export const GET = async (req: NextRequest) => {
  const server = await initServer();

  const gun = Gun({ web: server });
  gun.on('in', (msg) => {
    console.log('Incoming message:', msg);
  });
  gun.on('out', (msg) => {
    console.log('Outgoing message:', msg);
  });

  const customReadable = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        // controller.enqueue(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
        gun.get('data').once((data) => {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        });
      }, 1000);

      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new NextResponse(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
};
