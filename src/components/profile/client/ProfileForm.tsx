'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateClientProfileMutation } from '@/features/api/profileApi';
import clientProfileSchema, {
  ClientProfileFormData,
} from '@/validations/clientProfileValidation';
import { Input } from '../input';

const ProfileForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [createClientProfile, { isLoading }] = useCreateClientProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ClientProfileFormData>({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      clientName: '',
      companyName: '',
      phone: '',
    },
  });

  const onSubmit = async (data: ClientProfileFormData) => {
    try {
      setIsSubmitting(true);
      const response = await createClientProfile(data).unwrap();
      console.log('Profile created successfully:', response);
      router.push('/dashboard');
    } catch (error: any) {
      if (error.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]) => {
          if (field in clientProfileSchema.shape) {
            setError(field as keyof ClientProfileFormData, {
              type: 'server',
              message: Array.isArray(messages) ? messages[0] : messages,
            });
          }
        });
      } else {
        alert(error.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-4xl font-bold text-indigo-950">
        Build Your TheTalents Recruiter Profile
      </h1>
      <p className="max-w-xl text-zinc-400 text-lg">
        Find top talent effortlessly. Create your recruiter profile and start
        connecting with skilled developers today.
      </p>

      <form
        className="flex flex-col gap-7 w-full max-w-[698px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="h-full mt-8 flex flex-col gap-6 shadow-sm border-zinc-200 border-[1px] rounded-[34px] pl-12 pt-8 pr-14 pb-20">
          <h2 className="text-2xl font-bold text-indigo-950 text-left mb-2">
            Personal Information
          </h2>

          <div className="flex flex-col gap-6 w-full">
            <Input<ClientProfileFormData>
              label="Full Name"
              name="clientName"
              register={register}
              errors={errors}
              placeholder="Enter your full name"
              icon={<User size={18} className="text-zinc-400" />}
              className="w-full"
            />

            <Input<ClientProfileFormData>
              label="Company"
              name="companyName"
              register={register}
              errors={errors}
              placeholder="Enter your company name"
              icon={<Building2 size={18} className="text-zinc-400" />}
              className="w-full"
            />

            <Input<ClientProfileFormData>
              label="Phone Number"
              name="phone"
              register={register}
              errors={errors}
              placeholder="+1 (123) 456-7890"
              icon={<Phone size={18} className="text-zinc-400" />}
              className="w-full"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`px-6 py-3 bg-indigo-600 text-white rounded-lg transition ${
                isSubmitting || isLoading
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-indigo-700'
              }`}
            >
              {isSubmitting || isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ProfileForm;
