'use client';

import UserProfile from '@/components/profile/UserProfile';
import {
  ProfileResponseData,
  useGetDeveloperProfileQuery,
} from '@/features/api/apiSlice';

const ProfilePage = () => {
  const {
    data: profileResponseData,
    isLoading,
    error,
  } = useGetDeveloperProfileQuery<ProfileResponseData>(undefined);

  console.log('+++++', profileResponseData);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    const errorMessage =
      'status' in error
        ? `Error ${error.status}: Failed to load profile`
        : 'Failed to load profile';
    return <div>{errorMessage}</div>;
  }

  if (!profileResponseData) {
    return <div>No profile data available</div>;
  }

  // Pass the entire profileResponseData (which includes the message and data)
  return <UserProfile profileData={profileResponseData} />;
};

export default ProfilePage;

export const mockProfileData = {
  message: 'Developer Profile found',
  data: {
    id: 'mock-profile-123',
    userId: 'mock-user-456',
    firstName: 'John',
    secondName: 'Doe',
    phone: '(123) 456-7890',
    summary:
      'Experienced full-stack developer with a passion for building scalable web applications. Specialized in React, Node.js, and cloud technologies. Strong focus on writing clean, maintainable code and implementing best practices.',
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'Tech Solutions Inc',
        endDate: '2025-02-07',
        startDate: '2023-01-15',
        description:
          'Led a team of 5 developers in building a microservices-based e-commerce platform. Implemented CI/CD pipelines and reduced deployment time by 60%.',
      },
      {
        role: 'Full Stack Developer',
        company: 'Digital Innovations',
        endDate: '2022-12-31',
        startDate: '2021-06-01',
        description:
          'Developed and maintained multiple client-facing web applications using React and Node.js. Improved application performance by 40% through code optimization.',
      },
      {
        role: 'Frontend Developer',
        company: 'StartUp Hub',
        endDate: '2021-05-30',
        startDate: '2020-03-15',
        description:
          'Built responsive user interfaces using React and TypeScript. Collaborated with UX team to implement modern design patterns.',
      },
    ],
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Python',
      'AWS',
      'Docker',
      'GraphQL',
      'MongoDB',
      'PostgreSQL',
    ],
    isAndelan: 'NONE',
    references: [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techsolutions.com',
        phoneNumber: '123-456-7890',
        relationship: 'Technical Director',
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@digitalinnovations.com',
        phoneNumber: '098-765-4321',
        relationship: 'Former Team Lead',
      },
      {
        name: 'Alex sun',
        email: 'alex.sun@digitalinnovations.com',
        phoneNumber: '098-765-4321',
        relationship: 'Former Team Lead',
      },
    ],
    nonAndelaProgram: 'AmaliTech',
    nonAndelaProgramYear: '2020',
    yearsOfExperience: 5,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-02-07T00:00:00.000Z',
    user: {
      email: 'john.doe@example.com',
    },
  },
};
