import { CreateProfileSchema } from '@/validations/createProfile';
import { ComponentPropsWithoutRef } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface DropdownProps
  extends Omit<ComponentPropsWithoutRef<'select'>, 'name'> {
  label: string;
  placeholder?: string;
  register: UseFormRegister<CreateProfileSchema>;
  name: keyof CreateProfileSchema & string;
  errors: FieldErrors<CreateProfileSchema>;
  options: { value: string; label: string }[];
}

export function DropdownInput({
  label,
  placeholder,
  register,
  name,
  errors,
  options,
  ...props
}: DropdownProps) {
  const hasError = !!errors[name];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-indigo-950 text-lg font-bold">
        {label}
      </label>
      <div className="relative w-[284px]">
        <select
          id={name}
          defaultValue=""
          {...register(name)}
          aria-invalid={hasError}
          {...props}
          className={twMerge(
            'w-full py-3 px-3 text-sm bg-transparent border-2 rounded-lg focus:outline-none transition',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-zinc-200 focus:border-indigo-500'
          )}
        >
          <option value="" disabled>
            {placeholder ? placeholder : 'Select an option'}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
