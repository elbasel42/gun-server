'use client';

import { useEffect } from 'react';
// import { initServer } from './action/initServer';

const HomePage = () => {
  useEffect(() => {
    const eventSource = new EventSource('/api/server');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received:', data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
};

export default HomePage;
