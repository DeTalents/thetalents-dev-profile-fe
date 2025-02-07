import { getProgramInfo } from '@/utils/helpers/programUtils';
import { BasicInfo } from './edit/BasicInfo';
import { Experience } from './edit/Experience';
import { ProfileImage } from './edit/ProfileImage';
import { ProgramInfo } from './edit/ProgramInfo';
import { References } from './edit/References';
import { Skills } from './edit/Skills';

interface UserProfileProps {
  profileData: {
    data: {
      firstName: string;
      secondName: string;
      user: {
        email: string;
      };
      phone: string;
      yearsOfExperience: number;
      summary: string;
      isAndelan: string;
      nonAndelaProgram?: string;
      nonAndelaProgramYear?: string;
      experience: any[];
      skills: string[];
      references: any[];
      isVerified: boolean;
    };
  };
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
          />
        </div>
      </div>

      {programInfo.show && (
        <ProgramInfo
          programName={programInfo.programName ?? ''}
          programYear={programInfo.programYear}
        />
      )}

      <Experience experiences={data.experience} />
      <Skills skills={data.skills} />
      <References references={data.references} />
    </div>
  );
};

export default UserProfile;
