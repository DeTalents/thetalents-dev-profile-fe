import { CreateProfileSchema } from '@/validations/createProfile';
import { ComponentPropsWithoutRef } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'name'> {
  label: string;
  register: UseFormRegister<CreateProfileSchema>;
  name: keyof CreateProfileSchema & string;
  errors: FieldErrors<CreateProfileSchema>;
  placeholder: string;
}

export function Input({
  label,
  register,
  name,
  errors,
  placeholder,
  ...props
}: InputProps) {
  const hasError = !!errors[name];
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-indigo-950 text-lg font-bold">
        {label}
      </label>
      <div className="relative w-[284px]">
        <input
          id={name}
          type="text"
          {...register(name)}
          placeholder={placeholder}
          {...props}
          aria-invalid={hasError}
          className={twMerge(
            'w-full py-3 px-3 text-sm bg-transparent border-2 rounded-lg focus:outline-none transition',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-zinc-200 focus:border-indigo-500'
          )}
        />
      </div>
      {hasError && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
