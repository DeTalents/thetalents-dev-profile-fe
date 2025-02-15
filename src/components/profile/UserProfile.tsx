import { getProgramInfo } from '@/utils/helpers/programUtils';
import { AndelaProgram, NonAndelaProgram } from '@/utils/types';
import { Badge, Button, Progress, Tabs } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Github,
  Globe,
  HomeIcon,
  Linkedin,
  UserIcon,
} from 'lucide-react';
import { useState } from 'react';
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
  };
}

interface UserProfileProps {
  profileData: ProfileData;
}

const UserProfile = ({ profileData }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { data } = profileData;
  const programInfo = getProgramInfo(
    data.isAndelan,
    data.nonAndelaProgram,
    data.nonAndelaProgramYear
  );

  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-6 px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 text-indigo-600 mr-2" />
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Experience Level</span>
              <Badge color="blue" count={`${data.yearsOfExperience} years`} />
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Skills</span>
              <Badge color="green" count={data.skills.length} />
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">References</span>
              <Badge color="purple" count={data.references.length} />
            </div>
          </div>
        </div>

        {/* Profile Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <UserIcon className="w-5 h-5 text-indigo-600 mr-2" />
            Profile Status
          </h2>
          <div className="space-y-4">
            <Progress
              type="circle"
              percent={85}
              strokeColor="#4F46E5"
              size={120}
            />
            <p className="text-center text-gray-600">
              Your profile is almost complete!
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 text-indigo-600 mr-2" />
            Quick Links
          </h2>
          <div className="space-y-3">
            <Button
              type="default"
              icon={<Github className="w-4 h-4" />}
              className="w-full text-left"
            >
              Connect GitHub
            </Button>
            <Button
              type="default"
              icon={<Linkedin className="w-4 h-4" />}
              className="w-full text-left"
            >
              Connect LinkedIn
            </Button>
            <Button
              type="default"
              icon={<Globe className="w-4 h-4" />}
              className="w-full text-left"
            >
              Add Portfolio
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-6 px-4"
    >
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start gap-6">
          <ProfileImage
            firstName={data.firstName}
            secondName={data.secondName}
          />
          <div className="flex-grow">
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
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {programInfo.show && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <ProgramInfo
                programName={programInfo.programName ?? ''}
                programYear={programInfo.programYear}
                isAndelan={data.isAndelan as AndelaProgram}
                nonAndelaProgram={data.nonAndelaProgram as NonAndelaProgram}
                nonAndelaProgramYear={data.nonAndelaProgramYear}
              />
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Experience experiences={data.experiences} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <References references={data.references} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Skills skills={data.skills} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 text-indigo-600 mr-2" />
              Profile Completion
            </h3>
            <div className="space-y-3">
              <Progress percent={85} strokeColor="#4F46E5" />
              <p className="text-sm text-gray-600">
                Complete your profile to increase visibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: 'home',
                label: (
                  <span className="flex items-center">
                    <HomeIcon className="w-4 h-4 mr-2" />
                    Home
                  </span>
                ),
              },
              {
                key: 'profile',
                label: (
                  <span className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Profile
                  </span>
                ),
              },
            ]}
          />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'home' ? renderHome() : renderProfile()}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
