// hooks/useProfileAccess.ts
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetDeveloperProfileQuery } from '../api/apiSlice';

interface UseProfileAccessOptions {
  redirectIfProfileExists?: boolean;
  redirectTo?: string;
  redirectIfNoProfile?: boolean;
  redirectNoProfileTo?: string;
}

export function useProfileAccess(options: UseProfileAccessOptions = {}) {
  const {
    redirectIfProfileExists = true,
    redirectTo = '/developer',
    redirectIfNoProfile = false,
    redirectNoProfileTo = '/create-profile/developer',
  } = options;

  const router = useRouter();
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetDeveloperProfileQuery(undefined);

  console.log('+++++accessprofile', profile);

  useEffect(() => {
    if (isLoading || isError) return;

    // Redirect if user has a profile but shouldn't access this page
    if (profile && redirectIfProfileExists) {
      router.push(redirectTo);
    }

    // Redirect if user doesn't have a profile but needs one for this page
    if (!profile && redirectIfNoProfile) {
      router.push(redirectNoProfileTo);
    }
  }, [
    profile,
    isLoading,
    isError,
    router,
    redirectIfProfileExists,
    redirectTo,
    redirectIfNoProfile,
    redirectNoProfileTo,
  ]);

  return {
    profile,
    isLoading,
    isError,
    hasProfile: Boolean(profile),
    canAccess:
      (redirectIfProfileExists && !profile) ||
      (redirectIfNoProfile && profile) ||
      (!redirectIfProfileExists && !redirectIfNoProfile),
  };
}
