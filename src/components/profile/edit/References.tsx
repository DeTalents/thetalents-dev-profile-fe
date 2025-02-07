import { Mail, PencilIcon, PhoneIcon, TrashIcon } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface Reference {
  name: string;
  relationship: string;
  email: string;
  phoneNumber: string;
}

interface ReferencesProps {
  references: Reference[];
}

export const References = ({ references }: ReferencesProps) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <SectionHeader title="References" canAdd />
    <div className="space-y-4">
      {references.map((ref, index) => (
        <div key={index} className="border-l-4 border-indigo-600 pl-4">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-900">{ref.name}</h3>
              <p className="text-gray-600">{ref.relationship}</p>
              <div className="mt-1 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {ref.email}
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  {ref.phoneNumber}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                <PencilIcon className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
