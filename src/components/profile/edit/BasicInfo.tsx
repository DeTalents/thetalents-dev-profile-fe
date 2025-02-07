// components/profile/BasicInfo.tsx
import { Mail, PencilIcon, PhoneIcon } from 'lucide-react';
import { VerificationBadge } from './VerificationBadge';

interface BasicInfoProps {
  firstName: string;
  secondName: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  summary: string;
  isVerified: boolean;
}

export const BasicInfo = ({
  firstName,
  secondName,
  email,
  phone,
  yearsOfExperience,
  summary,
  isVerified,
}: BasicInfoProps) => (
  <div className="flex-grow">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {firstName} {secondName}
        </h1>
        <div className="mt-1 flex items-center text-gray-500">
          <Mail className="w-4 h-4 mr-2" />
          <span>{email}</span>
        </div>
        <div className="mt-1 flex items-center text-gray-500">
          <PhoneIcon className="w-4 h-4 mr-2" />
          <span>{phone}</span>
        </div>
        <div className="mt-2">
          <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
            {yearsOfExperience} years of experience
          </span>
        </div>
      </div>
      <VerificationBadge isVerified={isVerified} />
    </div>
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
        <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>
      <p className="mt-2 text-gray-600">{summary}</p>
    </div>
  </div>
);
