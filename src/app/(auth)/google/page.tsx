'use client';

import FormSkeleton from '@/components/skeletons/form';
import { useGetDeveloperProfileQuery } from '@/features/api/apiSlice';
import { setGoogleAuth } from '@/features/auth/authSlice';
import { useDecodeToken } from '@/features/hooks/useDecodeToken';
import { RootState } from '@/store/store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GoogleAuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams.get('token');
  const stateToken = useSelector((state: RootState) => state.auth.token);

  // Decode user role from token
  const userRole = useDecodeToken(stateToken);

  // Dispatch token if available
  useEffect(() => {
    if (token) {
      dispatch(setGoogleAuth(token));
    } else {
      router.push('/login');
    }
  }, [token, dispatch, router]);

  // Fetch user profile
  const {
    data: profile,
    error,
    isLoading,
  } = useGetDeveloperProfileQuery(undefined, {
    skip: !token,
  });

  const handleRedirect = useCallback(() => {
    if (isLoading) return;

    if (error) {
      if ((error as FetchBaseQueryError)?.status === 404) {
        router.push(
          userRole === 'client'
            ? '/create-profile/client'
            : '/create-profile/developer'
        );
      } else {
        console.error('Error fetching profile:', error);
        router.push('/login');
      }
    } else if (profile) {
      router.push(userRole === 'client' ? '/profiles' : '/developer');
    }
  }, [error, profile, isLoading, userRole, router]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  return <FormSkeleton />;
};

export default GoogleAuthPage;
