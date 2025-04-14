import { CreateProfileSchema } from '@/validations/createProfile';
import { useFormContext } from 'react-hook-form';
import { ExperienceSection } from '../inputs/exprienceinput';
import { SkillsInput } from '../inputs/skillsinput';
import { Textarea } from '../inputs/textarea';
import { Input } from './input';

export function StepTwo() {
  const methods = useFormContext<CreateProfileSchema>();

  return (
    <>
      <div className="w-full">
        <Textarea
          label="Summary"
          register={methods.register}
          name="summary"
          errors={methods.formState.errors}
          enableAI={true}
          placeholder="Tell us more about yourself"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-7 w-full">
        <div className="w-full md:w-1/3">
          <Input
            label="Total years of experience"
            register={methods.register}
            name="yearsOfExperience"
            errors={methods.formState.errors}
            placeholder="10"
            type="number"
          />
        </div>
        <div className="w-full md:w-2/3">
          <SkillsInput
            label="Add your skills"
            setValue={methods.setValue}
            getValues={methods.getValues}
            name="skills"
            errors={methods.formState.errors}
            placeholder="Type a skill and press Enter..."
          />
        </div>
      </div>

      <ExperienceSection />
    </>
  );
}
