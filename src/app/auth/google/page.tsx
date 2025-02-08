// app/auth/google/page.tsx
'use client';

import FormSkeleton from '@/components/skeletons/form';
import { useGetDeveloperProfileQuery } from '@/features/api/apiSlice';
import { setGoogleAuth } from '@/features/auth/authSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const GoogleAuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams.get('token');
  const [isInitialCheck, setIsInitialCheck] = useState(true);

  // Initialize auth first
  useEffect(() => {
    if (token && isInitialCheck) {
      dispatch(setGoogleAuth(token));
      setIsInitialCheck(false);
    } else if (!token) {
      router.push('/');
    }
  }, [token, dispatch, isInitialCheck, router]);

  const {
    data: profile,
    error,
    isLoading,
  } = useGetDeveloperProfileQuery(undefined, {
    skip: isInitialCheck || !token,
  });

  useEffect(() => {
    if (!isInitialCheck && !isLoading) {
      if (error) {
        if (
          error &&
          typeof error === 'object' &&
          'status' in error &&
          (error as FetchBaseQueryError).status === 404
        ) {
          router.push('/profile/developer/create');
        } else {
          console.error('Error fetching developer profile:', error);
          router.push('/');
        }
      } else if (profile) {
        router.push('/profile/developer');
      }
    }
  }, [error, profile, isLoading, isInitialCheck, router]);

  return <FormSkeleton />;
};

export default GoogleAuthPage;
