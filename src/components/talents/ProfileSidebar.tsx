import type { DeveloperProfile as DeveloperProfileType } from '@/app/(talents)/page';
import { Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { Award, Clock, Mail, Phone, Send, ShoppingCart } from 'lucide-react';

interface ProfileSidebarProps {
  profile: DeveloperProfileType;
  onAddToCart: () => void;
  isLoading: boolean;
}

const ProfileSidebar = ({
  profile,
  onAddToCart,
  isLoading,
}: ProfileSidebarProps) => {
  return (
    <div className="md:col-span-1 space-y-6">
      {/* Card Component */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            {/* Avatar with Verified Badge */}
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-3xl font-medium">
                  {profile.firstName[0]}
                  {profile.secondName[0]}
                </span>
              </div>
              <Tooltip
                title={
                  profile.isVerified ? 'Verified Profile' : 'Unverified Profile'
                }
                placement="right"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-4 bottom-4 bg-white rounded-full p-1 shadow-md cursor-help"
                >
                  <Award
                    className={`w-5 h-5 ${
                      profile.isVerified ? 'text-green-600' : 'text-red-500'
                    }`}
                  />
                </motion.div>
              </Tooltip>
            </div>

            {/* Name and Role */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.firstName} {profile.secondName}
              </h2>
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full">
                Senior Software Engineer
              </span>
            </div>

            {/* Experience Badge */}
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="text-indigo-600 font-medium">
                  {profile.yearsOfExperience} Years of Experience
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">{profile.user.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">{profile.phone}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm border border-indigo-200 bg-indigo-50 text-indigo-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <button
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md flex items-center justify-center"
            onClick={onAddToCart}
            disabled={isLoading}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add To Cart'}
          </button>

          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-md flex items-center justify-center cursor-not-allowed border border-gray-300 opacity-75"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Interview Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
