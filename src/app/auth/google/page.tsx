'use client';

import request from '@/utils/axios';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const GoogleAuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const handleAuth = async () => {
      try {
        if (!token) {
          router.push('/');
          return;
        }
        localStorage.setItem('token', `Bearer ${token}`);

        await request.get('/developer-profile');

        router.push('/profile/developer');
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          if (
            error &&
            typeof error === 'object' &&
            'response' in error &&
            error.response?.status === 404
          ) {
            router.push('/profile/developer/create');
          } else {
            console.error('Error fetching developer profile:', error);
            router.push('/');
          }
        }
      }
    };

    handleAuth();
  }, [token, router]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-primaryBlue/10 w-20 h-20 rounded-md shadow-sm animate-spin"></div>
    </div>
  );
};

const SuspendedGoogleAuthPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GoogleAuthPage />
  </Suspense>
);

export default SuspendedGoogleAuthPage;
