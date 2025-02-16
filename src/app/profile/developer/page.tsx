'use client';

import UserProfile from '@/components/profile/UserProfile';
import { useGetDeveloperProfileQuery } from '@/features/api/apiSlice';

export default function ProfilePage() {
  const { data, isLoading, error } = useGetDeveloperProfileQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    const errorMessage =
      'status' in error
        ? `Error ${error.status}: Failed to load profile`
        : 'Failed to load profile';
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No profile data available
        </div>
      </div>
    );
  }

  return <UserProfile profileData={data.data} />;
}
