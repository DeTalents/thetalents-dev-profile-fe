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

interface InputProps<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<'input'>, 'name'> {
  label: string;
  register: UseFormRegister<T>;
  name: NestedKeyOf<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  icon?: React.ReactNode;
}

export function Input<T extends FieldValues>({
  label,
  register,
  name,
  errors,
  placeholder,
  icon,
  className,
  ...props
}: InputProps<T>) {
  const hasError = errors[name as keyof T] !== undefined;
  const errorMessage = errors[name as keyof T]?.message;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="text-indigo-950 text-lg font-bold text-left"
      >
        {label}
      </label>
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}
        <input
          id={name}
          {...register(name as Path<T>)}
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
