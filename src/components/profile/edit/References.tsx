import { useDeleteReferenceMutation } from '@/features/api/referenceApi';
import { Popconfirm } from 'antd';
import {
  Mail,
  PencilIcon,
  PhoneIcon,
  School2Icon,
  TrashIcon,
  UserIcon,
} from 'lucide-react';
import { useState } from 'react';
import AddReferenceModal from './Model/AddReferenceModal';
import { SectionHeader } from './SectionHeader';

interface ReferenceFormData {
  name: string;
  relationship: string;
  email: string;
  company: string;
  phoneNumber: string;
}

interface ReferenceItem extends ReferenceFormData {
  id: string;
}

interface ReferencesProps {
  references: ReferenceItem[];
  onUpdate?: (references: ReferenceItem[]) => void;
}

export const References = ({ references, onUpdate }: ReferencesProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingReference, setEditingReference] =
    useState<ReferenceItem | null>(null);
  const [deleteReference, { isLoading: isDeleting }] =
    useDeleteReferenceMutation();

  const handleDeleteReference = async (id: string) => {
    try {
      await deleteReference(id).unwrap();
      const updatedReferences = references.filter((ref) => ref.id !== id);
      onUpdate?.(updatedReferences);
    } catch (error) {
      console.error('Failed to delete reference:', error);
    }
  };

  const handleEditReference = (id: string) => {
    const reference = references.find((ref) => ref.id === id);
    if (reference) {
      setEditingReference(reference);
      setIsAddModalOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <SectionHeader
        title="References"
        canAdd
        onAdd={() => {
          setEditingReference(null);
          setIsAddModalOpen(true);
        }}
      />
      <div className="space-y-6">
        {references.map((ref) => (
          <div
            key={ref.id}
            className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg mb-3 sm:mb-0 flex-shrink-0 w-fit max-sm:hidden">
                  <UserIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                  <p className="text-gray-600">{ref.relationship}</p>
                  <div className="mt-1 text-sm text-gray-500">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="break-all">{ref.email}</span>
                    </div>
                    {ref.phoneNumber && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{ref.phoneNumber}</span>
                      </div>
                    )}
                    {ref.company && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <School2Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{ref.company}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  onClick={() => handleEditReference(ref.id)}
                  aria-label="Edit reference"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <Popconfirm
                  title="Delete Reference"
                  description="Are you sure you want to delete this reference?"
                  onConfirm={() => handleDeleteReference(ref.id)}
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
                    aria-label="Delete reference"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddReferenceModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingReference(null);
        }}
        initialData={editingReference}
      />
    </div>
  );
};
