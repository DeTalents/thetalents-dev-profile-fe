import { getProgramInfo } from '@/utils/helpers/programUtils';
import { AndelaProgram, NonAndelaProgram } from '@/utils/types';
import { motion } from 'framer-motion';
import { ProfileCompletionCard } from '../dashboard/ProfileCompletionCard';
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
  id: string;
  userId: string;
  firstName: string;
  secondName: string;
  mainTitle: string;
  phone: string;
  summary: string;
  experiences: Experience[];
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
}

export const TalentProfileSection = ({
  profileData,
}: {
  profileData: ProfileData;
}) => {
  const programInfo = getProgramInfo(
    profileData.isAndelan,
    profileData.nonAndelaProgram,
    profileData.nonAndelaProgramYear
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-6 px-4"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start gap-6">
          <ProfileImage
            firstName={profileData.firstName}
            secondName={profileData.secondName}
          />
          <div className="flex-grow">
            <BasicInfo
              firstName={profileData.firstName}
              secondName={profileData.secondName}
              email={profileData.user?.email}
              phone={profileData.phone}
              yearsOfExperience={profileData.yearsOfExperience}
              summary={profileData.summary}
              isVerified={profileData.isVerified}
              mainTitle={profileData.mainTitle}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {programInfo.show && (
            <div className="rounded-xl shadow-sm border border-gray-100 p-6">
              <ProgramInfo
                programName={programInfo.programName ?? ''}
                programYear={programInfo.programYear}
                isAndelan={profileData.isAndelan as AndelaProgram}
                nonAndelaProgram={
                  profileData.nonAndelaProgram as NonAndelaProgram
                }
                nonAndelaProgramYear={profileData.nonAndelaProgramYear}
              />
            </div>
          )}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Experience experiences={profileData.experiences} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <References references={profileData.references} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Skills skills={profileData.skills} />
          </div>
          <ProfileCompletionCard profileId={profileData.id} />
        </div>
      </div>
    </motion.div>
  );
};
