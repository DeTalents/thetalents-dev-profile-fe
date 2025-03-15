'use client';

import FormSkeleton from '@/components/skeletons/form';
import {
  useGetClientProfileQuery,
  useGetDeveloperProfileQuery,
} from '@/features/api/apiSlice';
import { setGoogleAuth } from '@/features/auth/authSlice';
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
  const userRole = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    if (token) {
      dispatch(setGoogleAuth(token));
    } else {
      router.push('/login');
    }
  }, [token, dispatch, router]);

  useEffect(() => {
    if (userRole === 'admin') {
      router.push('/dashboard');
    }
  }, [userRole, router]);

  const {
    data: developerProfile,
    error: devError,
    isLoading: devLoading,
  } = useGetDeveloperProfileQuery(undefined, { skip: userRole !== 'talent' });

  const {
    data: clientProfile,
    error: clientError,
    isLoading: clientLoading,
  } = useGetClientProfileQuery(undefined, { skip: userRole !== 'client' });

  // We only need to consider loading states for non-admin roles
  const isLoading = userRole === 'admin' ? false : devLoading || clientLoading;
  const profile = userRole === 'talent' ? developerProfile : clientProfile;
  const error = userRole === 'talent' ? devError : clientError;

  const handleRedirect = useCallback(() => {
    if (userRole === 'admin') return;

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
      router.push('/dashboard');
    }
  }, [error, profile, isLoading, userRole, router]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  return <FormSkeleton />;
};

export default GoogleAuthPage;
