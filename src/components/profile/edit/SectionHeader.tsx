import { PencilIcon, PlusIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  canAdd?: boolean;
  canEdit?: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
}

export const SectionHeader = ({
  title,
  canAdd = false,
  canEdit = false,
  onAdd,
  onEdit,
}: SectionHeaderProps) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    <div className="flex gap-2">
      {canEdit && (
        <button
          onClick={onEdit}
          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      )}
      {canAdd && (
        <button
          onClick={onAdd}
          className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  </div>
);
