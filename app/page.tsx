'use client';

import { useEffect } from 'react';
import { initServer } from './action/initServer';

const HomePage = () => {
  useEffect(() => {
    initServer();
  }, []);
  return null;
};

export default HomePage;
