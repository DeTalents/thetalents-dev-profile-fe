'use client';

import { ProfileNotFound } from '@/components/profile/ProfileNotFound';
import UserProfile from '@/components/profile/UserProfile';
import ProfileLoadingSkeleton from '@/components/skeletons/ProfileLoadingSkeleton';
import { useGetDeveloperProfileQuery } from '@/features/api/apiSlice';

export default function ProfilePage() {
  const { data, isLoading, error } = useGetDeveloperProfileQuery(undefined);

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  if (error) {
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
    return <ProfileNotFound type="notFound" />;
  }

  return <UserProfile profileData={data.data} />;
}
