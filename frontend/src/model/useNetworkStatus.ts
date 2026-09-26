import { useCallback, useEffect, useRef, useState } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [text, setText] = useState('');
  const [clazz, setClazz] = useState<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateStatus = useCallback((text: string, status: boolean) => {
    setIsOnline(status);
    setText(text);
    setClazz('show');

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setClazz('');
    }, 3000);
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      updateStatus('You are offline', false);
    };

    const handleOnline = () => {
      updateStatus('You are online', true);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [updateStatus]);

  return {
    isOnline,
    text,
    clazz,
  };
};
