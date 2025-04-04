'use client';

import { ProfileNotFound } from '@/components/profile/ProfileNotFound';
import {
  ProfileData,
  TalentProfileSection,
} from '@/components/profile/TalentProfile';
import ProfileLoadingSkeleton from '@/components/skeletons/ProfileLoadingSkeleton';
import { useGetDeveloperProfileQuery } from '@/features/api/apiSlice';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

type UserRole = 'client' | 'talent';

export default function ProfilePage() {
  const userRole = useSelector(
    (state: RootState) => state.auth.role
  ) as UserRole;
  const { data, isLoading, error } = useGetDeveloperProfileQuery(undefined, {
    skip: userRole !== 'talent',
  });

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
          error && typeof error === 'object' && 'status' in error
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

  return (
    <TalentProfileSection profileData={data?.data as unknown as ProfileData} />
  );
}
