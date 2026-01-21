'use client';

import { useEffect, useState } from 'react';

export default function OfflineOverlay() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);

    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-2xl font-bold mb-2">You’re Offline</h1>
        <p className="text-gray-600">
          Please check your internet connection.
        </p>
      </div>
    </div>
  );
}
