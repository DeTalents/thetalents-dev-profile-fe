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

  const andelaOptions = [
    { label: 'Andela before 2020', value: 'ANDELA_2020' },
    { label: 'ATLP/stackup', value: 'ATLP_STACKUP' },
    { label: 'No', value: 'NONE' },
  ];
  const nonAndelaOptions = [
    { label: 'Amalitech', value: 'AMALITECH' },
    { label: 'The Gym', value: 'THE_GYM' },
    { label: 'Awesomity', value: 'AWESOMITY' },
    { label: 'Solvit Africa', value: 'SOLVIT_AFRICA' },
    { label: 'None of the above', value: 'NONE' },
  ];

  //Reset nonAndelaProgram just in case user decided to select andela program back to No
  useEffect(() => {
    if (isAndelanValue !== 'NONE') {
      // Batch the updates to prevent multiple re-renders
      methods.reset({
        ...methods.getValues(),
        nonAndelaProgram: undefined,
        programYear: undefined,
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
          name="lastName"
          errors={methods.formState.errors}
          placeholder="carter"
        />
      </div>

      <div className="flex gap-7">
        <Input
          label="Phone Number"
          register={methods.register}
          name="phoneNumber"
          errors={methods.formState.errors}
          onChange={(e) =>
            methods.setValue('phoneNumber', maskPhoneNumber(e.target.value))
          }
          maxLength={16}
          placeholder="(123) 456 - 7890"
        />
        <DropdownInput
          label="Have you been in Andela"
          options={andelaOptions}
          register={methods.register}
          name="isAndelan"
          errors={methods.formState.errors}
          placeholder="Select andela program"
        />
      </div>
      <div className="flex flex-col gap-7">
        {isAndelanValue === 'NONE' && (
          <>
            <DropdownInput
              label="If no Andela, have been through"
              options={nonAndelaOptions}
              register={methods.register}
              name="nonAndelaProgram"
              errors={methods.formState.errors}
              placeholder="Select program"
            />

            {nonAndelaProgramValue && nonAndelaProgramValue !== 'NONE' && (
              <Input
                label={`Which year did you attend "${formatProgramName(
                  nonAndelaProgramValue
                )}"?`}
                register={methods.register}
                name="programYear"
                errors={methods.formState.errors}
                placeholder="2016-2029"
                type="number"
                min="2016"
                max="2029"
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
