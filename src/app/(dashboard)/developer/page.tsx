'use client';

import { ProfileNotFound } from '@/components/profile/ProfileNotFound';
import UserProfile from '@/components/profile/UserProfile';
import ProfileLoadingSkeleton from '@/components/skeletons/ProfileLoadingSkeleton';
import { useGetDeveloperProfileQuery } from '@/features/api/apiSlice';

export default function ProfilePage() {
  const { data, isLoading, error } = useGetDeveloperProfileQuery(undefined);
  const userRole = data?.data.user.role;

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  if (error) {
    const is404 =
      error &&
      typeof error === 'object' &&
      'status' in error &&
      error.status === 404;

    if (is404) {
      return (
        <ProfileNotFound
          type="notFound"
          userRole={userRole}
          createProfilePath={
            userRole === 'client'
              ? '/create-profile/client'
              : '/create-profile/developer'
          }
        />
      );
    }

    return (
      <ProfileNotFound
        type="error"
        message={
          'status' in error
            ? `Error ${error.status}: Failed to load profile`
            : 'Failed to load profile'
        }
      />
    );
  }

  if (!data) {
    return (
      <ProfileNotFound
        type="notFound"
        userRole={userRole}
        createProfilePath={
          userRole === 'client'
            ? '/create-profile/client'
            : '/create-profile/developer'
        }
      />
    );
  }

  return <UserProfile profileData={data.data} />;
}
