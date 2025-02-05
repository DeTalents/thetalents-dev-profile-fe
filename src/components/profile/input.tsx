/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateProfileSchema } from '@/validations/createProfile';
import { ComponentPropsWithoutRef } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

// Helper type for nested paths
type NestedKeyOf<ObjectType extends FieldValues> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'name'> {
  label: string;
  register: UseFormRegister<CreateProfileSchema>;
  name: NestedKeyOf<CreateProfileSchema>;
  errors: FieldErrors<CreateProfileSchema>;
  placeholder: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  register,
  name,
  errors,
  placeholder,
  icon,
  className,
  ...props
}: InputProps) {
  //TODO: Fix this typescript error
  //@ts-expect-error: will find some fix for any type
  const hasError = !!errors[name as any];
  //@ts-expect-error: will find some fix for any type
  const errorMessage = errors[name as any]?.message;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-indigo-950 text-lg font-bold">
        {label}
      </label>
      <div className="relative w-[284px]">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}
        <input
          id={name}
          {...register(name as Path<CreateProfileSchema>)}
          placeholder={placeholder}
          {...props}
          aria-invalid={hasError}
          className={twMerge(
            'w-full py-3 px-3 text-sm bg-transparent border-2 rounded-lg focus:outline-none transition',
            icon && 'pl-10',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-zinc-200 focus:border-indigo-500',
            className
          )}
        />
      </div>
      {hasError && (
        <p className="text-red-500 text-sm">{errorMessage as string}</p>
      )}
    </div>
  );
}
