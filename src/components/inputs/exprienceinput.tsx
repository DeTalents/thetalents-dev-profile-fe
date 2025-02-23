import { CreateProfileSchema } from '@/validations/createProfile';
import { Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
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

  const getErrorMessage = (
    index: number,
    field: keyof CreateProfileSchema['experience'][0]
  ) => {
    return errors.experience?.[index]?.[field]?.message;
  };

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
            className="relative p-8 border-2 rounded-lg border-zinc-200 transition-all hover:border-zinc-300 w-full group"
          >
            <div className="absolute -top-3 left-4 px-2 bg-white">
              <span className="text-sm font-medium text-zinc-500">
                Experience {index + 1}
              </span>
            </div>

            {fields.length > 1 && (
              <Tooltip title="Remove experience" placement="left">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute right-4 top-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </Tooltip>
            )}

            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Input
                  label="Company"
                  register={register}
                  name={`experience.${index}.company`}
                  errors={errors}
                  placeholder="Company name"
                  className={`w-full ${
                    getErrorMessage(index, 'company')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                />
                {getErrorMessage(index, 'company') && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <span>{getErrorMessage(index, 'company')}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  label="Role"
                  register={register}
                  name={`experience.${index}.role`}
                  errors={errors}
                  placeholder="Your position"
                  className={`w-full ${
                    getErrorMessage(index, 'role')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                />
                {getErrorMessage(index, 'role') && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <span>{getErrorMessage(index, 'role')}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  label="Start Date"
                  register={register}
                  name={`experience.${index}.startDate`}
                  errors={errors}
                  type="date"
                  placeholder="Start date"
                  className={`w-full ${
                    getErrorMessage(index, 'startDate')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                />
                {getErrorMessage(index, 'startDate') && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <span>{getErrorMessage(index, 'startDate')}</span>
                  </div>
                )}
              </div>

              <div className="py-2">
                <Input
                  label="End Date"
                  register={register}
                  name={`experience.${index}.endDate`}
                  errors={errors}
                  type="date"
                  placeholder="End date or leave blank if current"
                  className={`w-full ${
                    getErrorMessage(index, 'endDate')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                />
                {getErrorMessage(index, 'endDate') && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <span>{getErrorMessage(index, 'endDate')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="py-2">
              <Textarea
                label="Description"
                register={register}
                name={`experience.${index}.description`}
                errors={errors}
                placeholder="Describe your responsibilities and achievements..."
                className={`w-full ${
                  getErrorMessage(index, 'description')
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
              />
              {getErrorMessage(index, 'description') && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <span>{getErrorMessage(index, 'description')}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Show array-level error if no experiences added */}
        {errors.experience && !Array.isArray(errors.experience) && (
          <div className="flex items-center gap-1 text-red-500 text-sm mt-2">
            <span>{errors.experience.message}</span>
          </div>
        )}

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
