import React, { useEffect } from 'react';

const useKeyPress = (key: string, action: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === key) {
        action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, action]);
};

export default useKeyPress;