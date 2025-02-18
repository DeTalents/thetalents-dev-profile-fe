import { CreateProfileSchema } from '@/validations/createProfile';
import { Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { Plus, Trash2, UserIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
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

  const getErrorMessage = (
    index: number,
    field: keyof CreateProfileSchema['references'][0]
  ) => {
    return errors.references?.[index]?.[field]?.message;
  };

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
        <div>
          <h3 className="text-lg font-bold text-indigo-950">References</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add professional references who can vouch for your work
          </p>
        </div>
        {fields.length > 0 && (
          <button
            type="button"
            onClick={addNewReference}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            Add Reference
          </button>
        )}
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 border rounded-lg border-zinc-200 transition-all hover:border-zinc-300 w-full bg-white"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <UserIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="font-medium text-gray-900">
                  Reference {index + 1}
                </span>
              </div>

              {fields.length > 1 && (
                <Tooltip title="Remove reference" placement="left">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </Tooltip>
              )}
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <Input
                  label="Name"
                  register={register}
                  name={`references.${index}.name`}
                  errors={errors}
                  placeholder="Reference name"
                  className={`w-full ${
                    getErrorMessage(index, 'name')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : ''
                  }`}
                />
                {getErrorMessage(index, 'name') && (
                  <div className="flex items-center gap-1.5 text-red-500 text-sm">
                    <span>{getErrorMessage(index, 'name')}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  label="Email"
                  register={register}
                  name={`references.${index}.email`}
                  errors={errors}
                  type="email"
                  placeholder="Reference email"
                  className={`w-full ${
                    getErrorMessage(index, 'email')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : ''
                  }`}
                />
                {getErrorMessage(index, 'email') && (
                  <div className="flex items-center gap-1.5 text-red-500 text-sm">
                    <span>{getErrorMessage(index, 'email')}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  label="Relationship"
                  register={register}
                  name={`references.${index}.relationship`}
                  errors={errors}
                  placeholder="e.g. Former Manager, Team Lead"
                  className={`w-full ${
                    getErrorMessage(index, 'relationship')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : ''
                  }`}
                />
                {getErrorMessage(index, 'relationship') && (
                  <div className="flex items-center gap-1.5 text-red-500 text-sm">
                    <span>{getErrorMessage(index, 'relationship')}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  label="Phone Number"
                  register={register}
                  name={`references.${index}.phoneNumber`}
                  errors={errors}
                  type="tel"
                  placeholder="(123) 456-7890"
                  className={`w-full ${
                    getErrorMessage(index, 'phoneNumber')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : ''
                  }`}
                />
                {getErrorMessage(index, 'phoneNumber') && (
                  <div className="flex items-center gap-1.5 text-red-500 text-sm">
                    <span>{getErrorMessage(index, 'phoneNumber')}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Array-level error */}
        {errors.references && !Array.isArray(errors.references) && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
            <span className="text-sm text-red-600">
              {errors.references.message}
            </span>
          </div>
        )}

        {fields.length === 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            type="button"
            onClick={addNewReference}
            className="w-full p-8 border-2 border-dashed border-zinc-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50/50 transition-all"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-indigo-50 rounded-full">
                <Plus className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">
                  Add Your First Reference
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Add someone who can vouch for your work
                </p>
              </div>
            </div>
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default ReferencesSection;
