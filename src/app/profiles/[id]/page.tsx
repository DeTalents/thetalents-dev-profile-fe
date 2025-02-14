'use client';
import { mockProfileData } from '@/app/profile/developer/page';
import DeveloperProfile from '@/components/talents/DeveloperProfile';
import { useParams } from 'next/navigation';

// This is just for demo - in production you'd fetch from an API

export default function DeveloperProfilePage() {
  const params = useParams();

  // In production, you'd fetch the profile data based on the ID
  // For now, we'll use the mock data
  const profile = mockProfileData;

  return (
    <main className="min-h-screen bg-gray-50">
      <DeveloperProfile profile={profile} />
    </main>
  );
}
