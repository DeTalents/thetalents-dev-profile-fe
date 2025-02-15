import { andelaOptions, nonAndelaOptions } from '@/utils/enum';
import formatProgramName from '@/utils/formatProgramName';
import { maskPhoneNumber } from '@/utils/masks';
import { CreateProfileSchema } from '@/validations/createProfile';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { DropdownInput } from '../inputs/dropdown';
import { Input } from './input';

export function StepOne() {
  const methods = useFormContext<CreateProfileSchema>();
  const isAndelanValue = methods.watch('isAndelan');
  const nonAndelaProgramValue = methods.watch('nonAndelaProgram');

  useEffect(() => {
    if (isAndelanValue !== 'NONE') {
      methods.reset({
        ...methods.getValues(),
        nonAndelaProgram: undefined,
        nonAndelaProgramYear: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAndelanValue, methods.reset, methods.getValues]);

  return (
    <>
      <div className="flex gap-7">
        <Input
          label="First Name"
          register={methods.register}
          name="firstName"
          errors={methods.formState.errors}
          placeholder="John"
        />

        <Input
          label="Last Name"
          register={methods.register}
          name="secondName"
          errors={methods.formState.errors}
          placeholder="carter"
        />
      </div>

      <div className="flex gap-7">
        <Input
          label="Phone Number"
          register={methods.register}
          name="phone"
          errors={methods.formState.errors}
          onChange={(e) =>
            methods.setValue('phone', maskPhoneNumber(e.target.value))
          }
          maxLength={16}
          placeholder="(123) 456 - 7890"
        />
        <Input
          label="Your Title"
          register={methods.register}
          name="mainTitle"
          errors={methods.formState.errors}
          placeholder="Senior Software developer...."
        />
      </div>
      <div className="flex gap-7">
        <DropdownInput
          label="Have you been in Andela"
          options={andelaOptions}
          register={methods.register}
          name="isAndelan"
          errors={methods.formState.errors}
          placeholder="Select andela program"
        />

        {isAndelanValue === 'NONE' && (
          <DropdownInput
            label="If no Andela, have been through"
            options={nonAndelaOptions}
            register={methods.register}
            name="nonAndelaProgram"
            errors={methods.formState.errors}
            placeholder="Select program"
          />
        )}
      </div>

      {isAndelanValue === 'NONE' &&
        nonAndelaProgramValue &&
        nonAndelaProgramValue !== 'NONE' && (
          <div className="flex">
            <Input
              label={`Which year did you attend "${formatProgramName(
                nonAndelaProgramValue
              )}"?`}
              register={methods.register}
              name="nonAndelaProgramYear"
              errors={methods.formState.errors}
              placeholder="2016-2029"
              type="number"
              min="2016"
              max="2029"
            />
          </div>
        )}
    </>
  );
}
