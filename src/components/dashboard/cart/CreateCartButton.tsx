/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/profile/input';
import { useCreateCartMutation } from '@/features/api/cartApi';
import { message, Modal } from 'antd';
import { PlusIcon, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type CartFormValues = {
  name: string;
};

export function CreateCartButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCart, { isLoading }] = useCreateCartMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CartFormValues>({
    defaultValues: {
      name: '',
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data: CartFormValues) => {
    try {
      const res = await createCart(data).unwrap();
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
        <span className="hidden md:block">Add new cart</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>

      <Modal
        title="Create New Cart"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input<CartFormValues>
            label="Cart Name"
            name="name"
            register={register}
            errors={errors}
            placeholder="Enter cart name"
            icon={<ShoppingCart className="h-5 w-5 text-gray-400" />}
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
              {isLoading ? 'Creating...' : 'Create Cart'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
