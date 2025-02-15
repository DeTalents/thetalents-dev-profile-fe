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
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {firstName} {secondName}
            </h1>
            <h2 className="text-lg font-medium text-indigo-600 tracking-tight">
              {mainTitle}
            </h2>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <PhoneIcon className="w-4 h-4 mr-2" />
              <span>{phone}</span>
            </div>
          </div>

          <div className="mt-4">
            <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
              {yearsOfExperience} years of experience
            </span>
          </div>
        </div>
        <VerificationBadge isVerified={isVerified} />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
          <button
            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        </div>
        <p className="text-gray-600 leading-relaxed">{summary}</p>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultValues={defaultValues}
      />
    </div>
  );
};
