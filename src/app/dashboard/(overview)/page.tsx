'use client';

import { TalentHomeSection } from '@/components/dashboard/talent-home-section';
import { ProfileData } from '@/components/profile/TalentProfile';
import ProfileLoadingSkeleton from '@/components/skeletons/ProfileLoadingSkeleton';
import { useGetDeveloperProfileQuery } from '@/features/api/apiSlice';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import DeveloperInformation from '../../../components/talents/DeveloperInformation';

export default function Page() {
  const userRole = useSelector((state: RootState) => state.auth.role);
  const { data, isLoading } = useGetDeveloperProfileQuery(undefined, {
    skip: userRole !== 'talent',
  });

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      {userRole === 'admin' ? (
        <h1>Welcome to the Admin Page</h1>
      ) : userRole === 'talent' ? (
        <TalentHomeSection profileData={data?.data as unknown as ProfileData} />
      ) : userRole === 'client' ? (
        <DeveloperInformation />
      ) : (
        <h1>Unauthorized Access</h1>
      )}
    </main>
  );
}
