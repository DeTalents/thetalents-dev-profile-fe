import { GraduationCapIcon, PencilIcon } from 'lucide-react';

interface ProgramInfoProps {
  programName: string;
  programYear?: string;
}

export const ProgramInfo = ({ programName, programYear }: ProgramInfoProps) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <GraduationCapIcon className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Program Information</h2>
      </div>
      <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
        <PencilIcon className="w-5 h-5" />
      </button>
    </div>
    <div className="space-y-3">
      <div className="flex items-center">
        <span className="text-gray-900">
          {programName}
          {programYear && ` (${programYear})`}
        </span>
      </div>
    </div>
  </div>
);
