import { useFieldArray, useFormContext } from 'react-hook-form';

import { CreateProfileSchema } from '@/validations/createProfile';
import { Mail, Phone, Plus, Trash2, UserIcon, Users } from 'lucide-react';
import { Input } from '../profile/input';

export function ReferencesSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CreateProfileSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references',
  });

  const addNewReference = () => {
    append({
      name: '',
      email: '',
      phoneNumber: '',
      relationship: '',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-indigo-950">References</h3>
        <button
          type="button"
          onClick={addNewReference}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          Add Reference
        </button>
      </div>

      <div className="space-y-12">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-8 border-2 rounded-lg border-zinc-200 transition-all hover:border-zinc-300 w-full"
          >
            {/* Reference Entry Header */}
            <div className="absolute -top-3 left-4 px-2 bg-white">
              <span className="text-sm font-medium text-zinc-500">
                Reference {index + 1}
              </span>
            </div>

            {/* Remove Button */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-red-500 transition-colors"
                title="Remove reference"
              >
                <Trash2 size={18} />
              </button>
            )}

            <div className="grid gap-6">
              <Input
                label="Name"
                register={register}
                name={`references.${index}.name`}
                errors={errors}
                placeholder="Reference name"
                icon={<UserIcon className="text-zinc-500" size={18} />}
              />
              <Input
                label="Email"
                register={register}
                name={`references.${index}.email`}
                errors={errors}
                type="email"
                placeholder="Reference email"
                icon={<Mail className="text-zinc-500" size={18} />}
              />
              <Input
                label="Relationship"
                register={register}
                name={`references.${index}.relationship`}
                errors={errors}
                placeholder="Your relationship with this reference"
                icon={<Users className="text-zinc-500" size={18} />}
              />
              <Input
                label="Phone Number"
                register={register}
                name={`references.${index}.phoneNumber`}
                errors={errors}
                type="tel"
                placeholder="Reference phone number"
                icon={<Phone className="text-zinc-500" size={18} />}
              />
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <button
            type="button"
            onClick={addNewReference}
            className="w-full p-8 border-2 border-dashed border-zinc-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50/50 transition-all"
          >
            <div className="flex flex-col items-center gap-2 text-zinc-500 hover:text-indigo-600">
              <Plus size={24} />
              <span className="font-medium">Add Your First Reference</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default ReferencesSection;
