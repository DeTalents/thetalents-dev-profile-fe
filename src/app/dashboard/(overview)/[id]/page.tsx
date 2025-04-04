'use client';
import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import ProfileLoadingSkeleton from '@/components/skeletons/ProfileLoadingSkeleton';
import DeveloperProfile from '@/components/talents/DeveloperProfile';
import { useGetPublicProfileByIdQuery } from '@/features/api/apiSlice';
import { Alert } from 'antd';
import { useParams } from 'next/navigation';

export default function DeveloperProfilePage() {
  const { id } = useParams();
  const {
    data: profile,
    isLoading,
    error,
  } = useGetPublicProfileByIdQuery(id as string);

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert
          message="Error Loading Profile"
          description="Please try again later"
          type="error"
          showIcon
          style={{ maxWidth: 400 }}
        />
      </div>
    );
  }

  return profile ? (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Talents', href: '/dashboard' },
          {
            label: `${profile.data.firstName} ${profile.data.secondName}`,
            href: `/dashboard/${id}`,
            active: true,
          },
        ]}
      />
      <DeveloperProfile profile={profile.data} />
    </main>
  ) : null;
}
