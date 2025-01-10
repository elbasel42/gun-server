export const dynamic = 'force-dynamic'; // always run dynamically

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const customReadable = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        controller.enqueue(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
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
