import { Button } from 'antd';
import { Send } from 'lucide-react';

interface ProfileSidebarProps {
  firstName: string;
  secondName: string;
  skills: string[];
  isVerified: boolean;
  yearsOfExperience: number;
}

export const ProfileSidebar = ({
  firstName,
  secondName,
  skills,
  isVerified,
  yearsOfExperience,
}: ProfileSidebarProps) => {
  return (
    <div className="w-80 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        {/* Profile Image & Name */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-indigo-600 font-semibold text-3xl">
              {firstName[0]}
              {secondName[0]}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {firstName} {secondName}
          </h2>
          {isVerified && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-green-50 text-green-700 mt-2">
              Verified Profile
            </span>
          )}
        </div>

        {/* Experience Badge */}
        <div className="bg-indigo-50 rounded-xl p-4 text-center">
          <span className="text-indigo-600 font-medium">
            {yearsOfExperience} Years of Experience
          </span>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-full text-sm border border-indigo-200 bg-indigo-50 text-indigo-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          type="primary"
          size="large"
          icon={<Send className="w-4 h-4" />}
          className="w-full h-12"
        >
          Send Interview Invitation
        </Button>
      </div>
    </div>
  );
};
