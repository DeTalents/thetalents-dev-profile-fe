import commonSkills from '@/utils/helpers/commonSkills';
import { CreateProfileSchema } from '@/validations/createProfile';
import { X } from 'lucide-react';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface SkillsInputProps {
  label: string;
  setValue: UseFormSetValue<CreateProfileSchema>;
  getValues: UseFormGetValues<CreateProfileSchema>;
  name: keyof CreateProfileSchema & string;
  errors: FieldErrors<CreateProfileSchema>;
  placeholder: string;
}

export function SkillsInput({
  label,
  setValue,
  getValues,
  name,
  errors,
  placeholder,
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const hasError = !!errors[name];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedIndex(-1);

    if (value.length >= 1) {
      const currentSkills = (getValues(name) as string[]) || [];
      const filtered = commonSkills
        .filter(
          (skill) =>
            skill.toLowerCase().includes(value.toLowerCase()) &&
            !currentSkills.includes(skill)
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (skillToAdd: string = inputValue) => {
    const skill = skillToAdd.trim().toLowerCase();
    if (skill && skill.length >= 2) {
      const currentSkills = (getValues(name) as string[]) || [];
      if (!currentSkills.includes(skill)) {
        setValue(name, [...currentSkills, skill], { shouldValidate: true });
        setInputValue('');
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = (getValues(name) as string[]) || [];
    setValue(
      name,
      currentSkills.filter((skill) => skill !== skillToRemove),
      { shouldValidate: true }
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex > -1) {
        addSkill(suggestions[selectedIndex]);
      } else if (inputValue) {
        addSkill();
      }
    } else if (e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const currentSkills = (getValues(name) as string[]) || [];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-indigo-950 text-lg font-bold">
        {label}
      </label>
      <div className="relative w-[284px]">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            // Delay hiding suggestions to allow clicking them
            setTimeout(() => setSuggestions([]), 200);
          }}
          placeholder={placeholder}
          className={twMerge(
            'w-full py-3 px-3 text-sm bg-transparent border-2 rounded-lg focus:outline-none transition',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-zinc-200 focus:border-indigo-500'
          )}
        />

        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                className={twMerge(
                  'w-full px-3 py-2 text-left text-sm hover:bg-gray-50',
                  index === selectedIndex && 'bg-gray-50'
                )}
                onClick={() => addSkill(suggestion)}
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {currentSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 max-w-[284px]">
          {currentSkills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {hasError && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
