import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true); // Mulai preloader
    };

    const handleComplete = () => {
      setLoading(false); // Selesai loading
    };

    // Dengarkan perubahan rute
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return loading;
};
