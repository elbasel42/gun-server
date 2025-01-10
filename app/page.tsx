'use client';

import { useEffect } from 'react';
import { initServer } from './action/initServer';

const HomePage = () => {
  useEffect(() => {
    initServer();
  }, []);
};
export default HomePage;
