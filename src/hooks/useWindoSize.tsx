'use clinet'
import { useEffect, useState } from 'react';

export const useWindowSize = (): number => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    let timeOutId: number | NodeJS.Timeout = 0
    const updateSize = (): void => {
      if (timeOutId) return;
      if (window.innerWidth !== windowSize) {
        timeOutId = setTimeout(() => {
          timeOutId = 0
          setWindowSize(window.innerWidth);
        }, 500)
      }
    };
    window.addEventListener('resize', updateSize);
  }, []);

  return windowSize;
};