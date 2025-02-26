'use client';

import { TalentHomeSection } from '@/components/dashaboard/talent-home-section';
import ProfileLoadingSkeleton from '@/components/skeletons/ProfileLoadingSkeleton';
import { useGetDeveloperProfileQuery } from '@/features/api/apiSlice';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function Page() {
  const userRole = useSelector((state: RootState) => state.auth.role);
  const { data, isLoading, error } = useGetDeveloperProfileQuery(undefined);

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      {userRole === 'talent' ? (
        <TalentHomeSection profileData={data?.data} />
      ) : (
        <>
          <h1>ClientPage</h1>
        </>
      )}
    </main>
  );
}
