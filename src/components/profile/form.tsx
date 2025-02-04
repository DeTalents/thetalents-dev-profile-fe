'use client';

import createProfileSchema, {
  CreateProfileSchema,
} from '@/validations/createProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { type FieldName, FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Step } from './step';
import { StepOne } from './step-one';
import { StepThree } from './step-three';
import { StepTwo } from './step-two';

const steps = [
  {
    id: 1,
    title: 'Basic Details',
    description: 'Please enter your contact details to stand out!',
    component: <StepOne />,
    fields: [
      'firstName',
      'lastName',
      'phoneNumber',
      'nonAndelaProgram',
      'programYear',
    ],
  },
  {
    id: 2,
    title: 'Our services',
    description: 'Please select which service you are interested in.',
    component: <StepTwo />,
    fields: ['interestedService'],
  },
  {
    id: 3,
    title: 'What’s your project budget?',
    description: 'Please select the project budget range you have in mind.',
    component: <StepThree />,
    fields: ['projectBudgetRange'],
  },
  {
    id: 4,
    title: 'Submit your quote requet',
    description:
      'Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 - 48 hours.',
    isLast: true,
  },
];

// const formSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email'),
//   phone: z.string().min(10, 'Phone number is required'),
//   companyName: z.string().min(1, 'Company name is required'),
//   interestedService: z.enum([
//     'Development',
//     'Web Design',
//     'Marketing',
//     'Other',
//   ]),
//   projectBudgetRange: z.enum([
//     '5000-10000',
//     '10000-20000',
//     '20000-50000',
//     '50000+',
//   ]),
// });

// export type CreateProfileSchema = z.infer<typeof formSchema>;

export function Form() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<CreateProfileSchema>({
    resolver: zodResolver(createProfileSchema),
    mode: 'onBlur',
  });

  async function onSubmit(data: CreateProfileSchema) {
    console.log(data);
    methods.reset();
  }

  async function nextStep() {
    const fields = steps[currentStep].fields;
    const isValid = await methods.trigger(
      fields as FieldName<CreateProfileSchema>[],
      {
        shouldFocus: true,
      }
    );

    if (!isValid) return;

    if (currentStep <= steps.length - 1) {
      if (currentStep === steps.length - 1) {
        await methods.handleSubmit(onSubmit)();
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep((step) => step + 1);
      }
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-4xl font-bold text-indigo-950">
        Build Your Developer Spotlight
      </h1>
      <p className="max-w-xl text-zinc-400 text-lg">
        Great developers deserve great opportunities. Let’s build your story
        together—step by step. 🚀 Your future starts here
      </p>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-7 max-w-[698px] max-h-max">
          <section className="h-full mt-8 flex flex-col gap-4 shadow-sm border-zinc-200 border-[1px] rounded-[34px] pl-12 pt-8 pr-14 pb-20 bg">
            <div className="flex items-center gap-[18px] px-8 pb-8 border-b-[1px] border-zinc-200">
              {steps.map((step) => (
                <Step
                  key={step.id}
                  id={step.id}
                  isLast={step.isLast}
                  currentStep={currentStep}
                />
              ))}
            </div>

            <div
              className={twMerge(
                'mt-8 text-left',
                currentStep === 3 && 'flex flex-col items-center gap-2'
              )}
            >
              {currentStep === 3 && (
                <Image
                  src="/finish.svg"
                  alt="Finish"
                  width={0}
                  height={0}
                  className="mb-[10px] size-[7.5rem]"
                />
              )}

              <h2 className="text-2xl font-bold text-indigo-950">
                {steps[currentStep].title}
              </h2>
              <p
                className={twMerge(
                  'mt-2 text-zinc-500 max-w-[500px] text-left',
                  currentStep === 3 && 'text-center'
                )}
              >
                {steps[currentStep].description}
              </p>

              {currentStep === 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-4 px-10 py-3 bg-indigo-600 text-white rounded-[66px] hover:bg-indigo-700 transition-colors duration-100"
                >
                  Submit
                </button>
              )}

              <div className="flex flex-col gap-11 mt-10">
                {steps[currentStep].component}
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={previousStep}
                className="px-10 py-3 bg-transparent cursor-pointer text-indigo-600 border-[1px] border-indigo-600 rounded-[66px] hover:bg-indigo-600 hover:text-white transition-colors duration-100"
              >
                Previous Step
              </button>
            )}

            <div />

            {currentStep < steps.length - 1 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-10 py-3 bg-indigo-600 text-white rounded-[66px] hover:bg-indigo-700 transition-colors duration-100
								disabled:bg-transparent disabled:border-[1px] disabled:border-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed 
							"
              >
                Next Step
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
