'use client';

import { DeveloperProfile } from '@/utils/types';
import { Award, Briefcase, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

const DeveloperCard = ({ profile }: { profile: DeveloperProfile }) => {
  const topSkills = profile.skills.slice(0, 5);
  const totalCompanies = profile.experiences.length;

  return (
    <Link href={`/dashboard/${profile.id}`} className="block h-full">
      <div className="w-full h-full flex flex-col rounded-lg border border-gray-200 bg-white p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        {/* Header Section */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-medium text-base sm:text-lg">
                  {profile.firstName[0]}
                  {profile.secondName[0]}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {profile.firstName} {profile.secondName}
              </h3>
            </div>
            <ChevronRight className="text-indigo-600 group-hover:translate-x-1 transition-transform duration-300" />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {profile.isVerified && (
              <div className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs sm:text-sm border border-green-200 bg-green-50 text-green-700">
                <Award className="w-3 h-3 mr-1" />
                Verified
              </div>
            )}
            <div className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs sm:text-sm border border-indigo-200 bg-indigo-50 text-indigo-600">
              <Briefcase className="w-3 h-3 mr-1" />
              {totalCompanies} Companies
            </div>
            <div className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs sm:text-sm border border-indigo-200 bg-indigo-50 text-indigo-600">
              <Clock className="w-3 h-3 mr-1" />
              {profile.yearsOfExperience} Years
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow space-y-4 sm:space-y-6">
          <div className="flex-grow">
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2 h-10 sm:h-12">
              {profile.summary}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-medium text-gray-700">
                Top Skills
              </p>
              <span className="text-xs text-indigo-600">
                {profile.skills.length} total
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 min-h-8 sm:min-h-10">
              {topSkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center justify-center px-2.5 sm:px-3 py-1 rounded-md text-xs sm:text-sm border border-indigo-200 bg-indigo-50 text-indigo-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DeveloperCard;
