'use client';

import { Input } from '@/components/profile/input';
import { useInviteClientMutation } from '@/features/api/clientsApi';
import { message, Modal } from 'antd';
import { MailIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ClientFormValues {
  email: string;
}

export function InviteClientButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteClient, { isLoading }] = useInviteClientMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormValues>({
    defaultValues: {
      email: '',
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data: ClientFormValues) => {
    try {
      const res = await inviteClient(data).unwrap();
      setIsModalOpen(false);
      message.success('Cart Created successfuly!');
      reset();
    } catch (error: any) {
      console.error('Failed to create cart:', error);
      message.error(error?.data?.message || 'Failed to create cart');
    }
  };

  return (
    <>
      <button
        onClick={showModal}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Add new client</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>

      <Modal
        title="Invite a new client"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input<ClientFormValues>
            label="Email"
            name="email"
            register={register}
            errors={errors}
            placeholder="Enter a client email"
            icon={<MailIcon className="h-5 w-5 text-gray-400" />}
            required
          />

          <div className="flex justify-end mt-6 gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
            >
              {isLoading ? 'Creating...' : 'Invite a client'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
