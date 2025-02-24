'use client';

import { Form } from '@/components/profile/form';
import { useProfileAccess } from '@/features/hooks/useProfileAccess';
import { NextPage } from 'next';

const CreateProfile: NextPage = () => {
  const { isLoading, hasProfile } = useProfileAccess({
    redirectIfProfileExists: true,
    redirectTo: '/developer', // When user has a profile, redirect here
  });

  if (isLoading) return <div>Loading...</div>;

  // If hasProfile is true, the useEffect in the hook will handle the redirect
  // We only render the form if the user doesn't have a profile
  if (!hasProfile) {
    return <Form />;
  }

  return <div>Redirecting...</div>;
};

export default CreateProfile;
