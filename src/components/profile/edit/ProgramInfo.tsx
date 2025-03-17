import { formatProgramName } from '@/utils/formatProgramName';
import { AndelaProgram, NonAndelaProgram } from '@/utils/types';
import { GraduationCapIcon, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import EditProgramModal from './Model/EditProgramModal';

interface ProgramInfoProps {
  programName: string;
  programYear?: string;
  isAndelan: AndelaProgram;
  nonAndelaProgram?: NonAndelaProgram;
  nonAndelaProgramYear?: string;
}
export const ProgramInfo = ({
  programName,
  programYear,
  isAndelan,
  nonAndelaProgram,
  nonAndelaProgramYear,
}: ProgramInfoProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenModal = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  const defaultValues = {
    isAndelan,
    nonAndelaProgram,
    nonAndelaProgramYear,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <GraduationCapIcon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Professional Coding Bootcamp
          </h2>
        </div>
        <button
          onClick={handleOpenModal}
          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="text-gray-900">
            {formatProgramName(programName)}
            {programYear && ` (${programYear})`}
          </span>
        </div>
      </div>

      <EditProgramModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        defaultValues={defaultValues}
      />
    </div>
  );
};
