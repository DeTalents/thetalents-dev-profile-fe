import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { FormSchema } from './form';

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  register: UseFormRegister<FormSchema>;
  name: keyof FormSchema & string;
  errors: FieldErrors<FormSchema>;
  options: Option[];
}

export function RadioGroup({
  label,
  register,
  name,
  errors,
  options,
}: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-indigo-950 text-lg font-bold">{label}</label>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={twMerge(
              'group flex flex-row items-center gap-3 w-[284px] rounded-[46px] shadow-sm border-zinc-200 border-[1px] p-5 cursor-pointer hover:bg-gray-50',
              errors[name] && 'border-red-500'
            )}
          >
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-600"
            />
            <span className="text-lg text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
