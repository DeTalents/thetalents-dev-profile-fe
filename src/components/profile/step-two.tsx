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
      <div className="">
        <Textarea
          label="Summary"
          register={methods.register}
          name="summary"
          errors={methods.formState.errors}
          placeholder="Tell us more about yourself"
        />
      </div>

      <div className="flex gap-7">
        <Input
          label="Total years of exprience"
          register={methods.register}
          name="yearsOfExperience"
          errors={methods.formState.errors}
          placeholder="10"
          type="number"
        />
        <SkillsInput
          label="Add your skills"
          setValue={methods.setValue}
          getValues={methods.getValues}
          name="skills"
          errors={methods.formState.errors}
          placeholder="Type a skill and press Enter..."
        />
      </div>
      <ExperienceSection />
    </>
  );
}
