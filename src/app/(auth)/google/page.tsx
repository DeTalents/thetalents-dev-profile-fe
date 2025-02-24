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

  useEffect(() => {
    if (token && isInitialCheck) {
      dispatch(setGoogleAuth(token));
      setIsInitialCheck(false);
    } else if (!token) {
      router.push('/login');
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
          const userRole = profile?.data?.user?.role;

          console.log('++++🔥userRole', userRole);

          if (userRole === 'client') {
            router.push('/create-profile/client');
          } else {
            router.push('/create-profile/developer');
          }
        } else {
          console.error('Error fetching profile:', error);
          router.push('/login');
        }
      } else if (profile) {
        const userRole = profile.data?.user?.role;

        if (userRole === 'client') {
          router.push('/profiles');
        } else {
          router.push('/developer');
        }
      }
    }
  }, [error, profile, isLoading, isInitialCheck, router]);

  return <FormSkeleton />;
};

export default GoogleAuthPage;
