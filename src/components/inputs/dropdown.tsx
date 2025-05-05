/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef } from 'react';
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface DropdownProps<T extends Record<string, any>>
  extends Omit<ComponentPropsWithoutRef<'select'>, 'name'> {
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  options: { value: string; label: string }[];
}

export function DropdownInput<T extends Record<string, any>>({
  label,
  placeholder,
  register,
  name,
  errors,
  options,
  ...props
}: DropdownProps<T>) {
  const hasError = !!errors[name];

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="text-indigo-950 text-base md:text-lg font-bold"
      >
        {label}
      </label>
      <div className="relative w-full max-w-[284px]">
        <select
          id={name}
          defaultValue=""
          {...register(name)}
          aria-invalid={hasError}
          {...props}
          className={twMerge(
            'w-full py-2.5 md:py-3 px-2.5 md:px-3 text-sm bg-transparent border-2 rounded-lg focus:outline-none transition',
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
        <p className="text-red-500 text-xs md:text-sm">
          {String(errors[name]?.message || '')}
        </p>
      )}
    </div>
  );
}
