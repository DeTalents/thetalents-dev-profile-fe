import { CreateProfileSchema } from '@/validations/createProfile';
import { BriefcaseIcon, Building2, Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Textarea } from '../inputs/textarea';
import { Input } from '../profile/input';

export function ExperienceSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CreateProfileSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  const addNewExperience = () => {
    append({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-indigo-950">Experience</h3>
        <button
          type="button"
          onClick={addNewExperience}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      <div className="space-y-12">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-8 border-2 rounded-lg border-zinc-200 transition-all hover:border-zinc-300 w-full"
          >
            <div className="absolute -top-3 left-4 px-2 bg-white">
              <span className="text-sm font-medium text-zinc-500">
                Experience {index + 1}
              </span>
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-red-500 transition-colors"
                title="Remove experience"
              >
                <Trash2 size={18} />
              </button>
            )}

            <div className="flex flex-col gap-6">
              <Input
                label="Company"
                register={register}
                name={`experience.${index}.company`}
                errors={errors}
                placeholder="Company name"
                icon={<Building2 className="text-zinc-500" size={18} />}
                className="w-full"
              />

              <Input
                label="Role"
                register={register}
                name={`experience.${index}.role`}
                errors={errors}
                placeholder="Your position"
                icon={<BriefcaseIcon className="text-zinc-500" size={18} />}
                className="w-full"
              />

              <Input
                label="Start Date"
                register={register}
                name={`experience.${index}.startDate`}
                errors={errors}
                type="date"
                placeholder="Start date"
                className="w-full"
              />

              <Input
                label="End Date"
                register={register}
                name={`experience.${index}.endDate`}
                errors={errors}
                type="date"
                placeholder="End date or leave blank if current"
                className="w-full"
              />

              <Textarea
                label="Description"
                register={register}
                name={`experience.${index}.description`}
                errors={errors}
                placeholder="Describe your responsibilities and achievements..."
                className="w-full"
              />
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <button
            type="button"
            onClick={addNewExperience}
            className="w-full p-8 border-2 border-dashed border-zinc-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50/50 transition-all"
          >
            <div className="flex flex-col items-center gap-2 text-zinc-500 hover:text-indigo-600">
              <Plus size={24} />
              <span className="font-medium">Add Your First Experience</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default ExperienceSection;
