import { Badge, Progress } from 'antd';
import { motion } from 'framer-motion';
import { Award, UserIcon } from 'lucide-react';
import { ProfileData } from '../profile/TalentProfile';

export const TalentHomeSection = ({
  profileData,
}: {
  profileData: ProfileData;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-6 px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 text-indigo-600 mr-2" /> Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Experience Level</span>
              <Badge
                color="blue"
                count={`${profileData.yearsOfExperience} years`}
              />
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Skills</span>
              <Badge color="green" count={profileData.skills.length} />
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">References</span>
              <Badge color="purple" count={profileData.references.length} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <UserIcon className="w-5 h-5 text-indigo-600 mr-2" />
            Profile Status
          </h2>
          <Progress
            type="circle"
            percent={85}
            strokeColor="#4F46E5"
            size={120}
          />
          <p className="text-center text-gray-600 mt-4">
            Your profile is almost complete!
          </p>
        </div>
      </div>
    </motion.div>
  );
};
