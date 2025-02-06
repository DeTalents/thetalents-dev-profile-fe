'use client';

import FormSkeleton from '@/components/skeletons/form';
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

        // Set the token using document.cookie
        document.cookie = `token=Bearer ${token}; path=/; max-age=${
          7 * 24 * 60 * 60
        }; secure; samesite=strict`;

        await request.get('/developer-profile');
        router.push('/profile/developer');
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
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

  return <FormSkeleton />;
};

const SuspendedGoogleAuthPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GoogleAuthPage />
  </Suspense>
);

export default SuspendedGoogleAuthPage;
