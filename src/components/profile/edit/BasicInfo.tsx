import { BasicDetails, UpdateBasicDetails } from '@/utils/types';
import { Mail, PencilIcon, PhoneIcon } from 'lucide-react';
import { useState } from 'react';
import EditProfileModal from './Model/EditProfileModal';
import { VerificationBadge } from './VerificationBadge';

export const BasicInfo = ({
  firstName,
  secondName,
  phone,
  email,
  yearsOfExperience,
  summary,
  isVerified,
  mainTitle,
}: BasicDetails) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValues: UpdateBasicDetails = {
    firstName,
    secondName,
    phone,
    yearsOfExperience,
    summary,
    mainTitle,
  };

  return (
    <div className="flex-grow w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
        <div className="w-full sm:w-auto">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
              {firstName} {secondName}
            </h1>
            <h2 className="text-base sm:text-lg font-medium text-indigo-600 tracking-tight break-words">
              {mainTitle}
            </h2>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600 text-sm sm:text-base break-all">
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{email}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm sm:text-base">
              <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{phone}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-center sm:justify-start">
            <span className="text-xs sm:text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
              {yearsOfExperience} years of experience
            </span>
          </div>
        </div>
        <div className="flex justify-center sm:justify-start">
          <VerificationBadge isVerified={isVerified} />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Summary
          </h2>
          <button
            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <PencilIcon className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
          {summary}
        </p>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultValues={defaultValues}
      />
    </div>
  );
};
