import { useDeleteExperienceMutation } from '@/features/api/experienceApi';
import { Popconfirm } from 'antd';
import { BriefcaseIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import AddExperienceModal from './Model/AddExperienceModal';
import { SectionHeader } from './SectionHeader';
interface ExperienceFormData {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface ExperienceItem extends ExperienceFormData {
  id: string;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
  onUpdate?: (experiences: ExperienceItem[]) => void;
}

export const Experience = ({ experiences, onUpdate }: ExperienceProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<ExperienceItem | null>(null);
  const [deleteExperience, { isLoading: isDeleting }] =
    useDeleteExperienceMutation();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      await deleteExperience(id).unwrap();
      const updatedExperiences = experiences.filter((exp) => exp.id !== id);
      onUpdate?.(updatedExperiences);
    } catch (error) {
      console.error('Failed to delete experience:', error);
    }
  };

  const handleEditExperience = (id: string) => {
    const experience = experiences.find((exp) => exp.id === id);
    if (experience) {
      setEditingExperience(experience);
      setIsAddModalOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <SectionHeader
        title="Experience"
        canAdd
        onAdd={() => {
          setEditingExperience(null);
          setIsAddModalOpen(true);
        }}
      />
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
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
                <button
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  onClick={() => handleEditExperience(exp.id)}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <Popconfirm
                  title="Delete Experience"
                  description="Are you sure you want to delete this experience?"
                  onConfirm={() => handleDeleteExperience(exp.id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{
                    danger: true,
                    loading: isDeleting,
                  }}
                >
                  <button
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    disabled={isDeleting}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddExperienceModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingExperience(null);
        }}
        initialData={editingExperience}
      />
    </div>
  );
};
