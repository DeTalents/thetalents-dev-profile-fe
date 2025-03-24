import { Badge, Progress } from 'antd';
import { motion } from 'framer-motion';
import { Award, UserIcon } from 'lucide-react';
import ProfileViewsChart from '../profile/ProfileViewsChart';
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
      className="max-w-7xl mx-auto py-4 px-4 sm:px-6"
    >
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Award className="w-5 h-5 text-indigo-600 mr-2" /> Quick Stats
            </h2>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600 mr-2">Experience:</span>
                <Badge
                  color="blue"
                  count={`${profileData.yearsOfExperience} years`}
                />
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600 mr-2">Skills:</span>
                <Badge color="green" count={profileData.skills.length} />
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600 mr-2">References:</span>
                <Badge color="purple" count={profileData.references.length} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold flex items-center">
                <UserIcon className="w-4 h-4 text-indigo-600 mr-1" />
                Profile Status
              </h2>
              <span className="text-sm font-medium text-indigo-600">85%</span>
            </div>
            <Progress
              percent={85}
              strokeColor="#4F46E5"
              showInfo={false}
              size="small"
            />
            <p className="text-xs text-gray-500 mt-1">Almost complete!</p>
          </div>
        </div>
      </div>

      <div>
        <ProfileViewsChart profileId={profileData.id} />
      </div>
    </motion.div>
  );
};
