import { BriefcaseIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface ExperienceItem {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience = ({ experiences }: ExperienceProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <SectionHeader title="Experience" canAdd />
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BriefcaseIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} -{' '}
                    {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </p>
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
