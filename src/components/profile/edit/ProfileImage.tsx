import { PencilIcon } from 'lucide-react';

interface ProfileImageProps {
  firstName: string;
  secondName: string;
}

export const ProfileImage = ({ firstName, secondName }: ProfileImageProps) => (
  <div className="relative group">
    <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
      <span className="text-4xl text-indigo-600 font-semibold">
        {firstName.charAt(0)}
        {secondName.charAt(0)}
      </span>
    </div>
    <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
      <PencilIcon className="w-4 h-4" />
    </button>
  </div>
);
