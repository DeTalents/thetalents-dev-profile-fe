import { CreateProfileSchema } from '@/validations/createProfile';
import { ComponentPropsWithoutRef } from 'react';
import { FieldErrors, FieldPath, get, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<'textarea'>, 'name'> {
  label: string;
  register: UseFormRegister<CreateProfileSchema>;
  name: FieldPath<CreateProfileSchema>;
  errors: FieldErrors<CreateProfileSchema>;
  placeholder: string;
}

export function Textarea({
  label,
  register,
  name,
  errors,
  placeholder,
  className,
  ...props
}: TextareaProps) {
  // Use the get utility to safely access nested errors
  const errorMessage = get(errors, name)?.message;
  const hasError = !!errorMessage;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-indigo-950 text-lg font-bold">
        {label}
      </label>
      <div className="relative w-full">
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          {...props}
          aria-invalid={hasError}
          className={twMerge(
            'w-full py-3 px-3 text-sm bg-transparent border-2 rounded-lg focus:outline-none transition resize-y min-h-[100px]',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-zinc-200 focus:border-indigo-500',
            className
          )}
        />
      </div>
      {hasError && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
