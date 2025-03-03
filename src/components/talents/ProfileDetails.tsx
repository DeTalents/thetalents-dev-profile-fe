import type { DeveloperProfile as DeveloperProfileType } from '@/app/(talents)/page';
import { formatDate } from '@/utils/formatDate';
import formatProgramName from '@/utils/formatProgramName';
import { motion } from 'framer-motion';
import { Calendar, Mail, Phone } from 'lucide-react';

interface ProfileDetailsProps {
  profile: DeveloperProfileType;
}

const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  return (
    <div className="md:col-span-2 space-y-8">
      {/* Summary Section */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
      >
        <h3 className="text-xl font-semibold mb-4">About</h3>
        <p className="text-gray-600 leading-relaxed">{profile.summary}</p>
      </motion.div>

      {/* Experience Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Experience</h3>
        <div className="space-y-6">
          {profile.experiences.map((exp, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 pb-8 last:pb-0"
            >
              <div className="absolute left-0 top-0 h-full w-px bg-indigo-200">
                <div className="absolute top-2 -left-2 w-4 h-4 rounded-full bg-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900">{exp.role}</h4>
              <p className="text-indigo-600 text-sm mb-2">{exp.company}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
              </div>
              <p className="text-gray-600">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* References Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Professional References</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {profile.references.map((ref, index: number) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {ref.name[0]}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{ref.name}</h4>
                  <p className="text-sm text-gray-600">{ref.relationship}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{ref.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{ref.phoneNumber}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Professional Coding Bootcamp
          </h3>
          <div className="space-y-2">
            {profile.isAndelan === 'NONE' ? (
              profile.nonAndelaProgram && (
                <p className="text-gray-600">
                  {formatProgramName(profile.nonAndelaProgram)}
                  {profile.nonAndelaProgramYear &&
                    ` (${profile.nonAndelaProgramYear})`}
                </p>
              )
            ) : (
              <p className="text-gray-600">
                {formatProgramName(profile.isAndelan)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
