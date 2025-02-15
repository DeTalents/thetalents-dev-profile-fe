import { getProgramInfo } from '@/utils/helpers/programUtils';
import { AndelaProgram, NonAndelaProgram } from '@/utils/types';
import { BasicInfo } from './edit/BasicInfo';
import { Experience } from './edit/Experience';
import { ProfileImage } from './edit/ProfileImage';
import { ProgramInfo } from './edit/ProgramInfo';
import { References } from './edit/References';
import { Skills } from './edit/Skills';

export interface Experience {
  id: string;
  role: string;
  company: string;
  endDate?: string;
  startDate: string;
  description: string;
}

export interface Reference {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  relationship: string;
}

export interface ProfileData {
  message: string;
  data: {
    id: string;
    userId: string;
    firstName: string;
    secondName: string;
    mainTitle: string;
    phone: string;
    summary: string;
    experience: Experience[];
    skills: string[];
    isAndelan: string;
    references: Reference[];
    nonAndelaProgram?: string;
    nonAndelaProgramYear?: string;
    yearsOfExperience: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
      email: string;
    };
  };
}

interface UserProfileProps {
  profileData: ProfileData;
}

const UserProfile = ({ profileData }: UserProfileProps) => {
  const { data } = profileData;
  const programInfo = getProgramInfo(
    data.isAndelan,
    data.nonAndelaProgram,
    data.nonAndelaProgramYear
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-6">
          <ProfileImage
            firstName={data.firstName}
            secondName={data.secondName}
          />
          <BasicInfo
            firstName={data.firstName}
            secondName={data.secondName}
            email={data.user?.email}
            phone={data.phone}
            yearsOfExperience={data.yearsOfExperience}
            summary={data.summary}
            isVerified={data.isVerified}
            mainTitle={data.mainTitle}
          />
        </div>
      </div>
      {programInfo.show && (
        <ProgramInfo
          programName={programInfo.programName ?? ''}
          programYear={programInfo.programYear}
          isAndelan={data.isAndelan as AndelaProgram}
          nonAndelaProgram={data.nonAndelaProgram as NonAndelaProgram}
          nonAndelaProgramYear={data.nonAndelaProgramYear}
        />
      )}

      <Experience experiences={data.experience} />
      <Skills skills={data.skills} />
      <References references={data.references} />
    </div>
  );
};

export default UserProfile;
