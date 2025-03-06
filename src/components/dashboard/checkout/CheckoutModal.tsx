import { Input } from '@/components/profile/input';
import { useCheckoutCartMutation } from '@/features/api/cartApi';
import { Modal, message } from 'antd';
import { ShoppingBagIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartId: string;
  onSuccess?: () => void;
}

interface CheckoutFormValues {
  notes: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartId,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      notes: '',
    },
  });

  const [checkoutCart, { isLoading }] = useCheckoutCartMutation();

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      await checkoutCart({
        cartId,
        notes: data.notes,
      }).unwrap();

      message.success('Cart checkout successful');
      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Failed to checkout cart:', error);
      message.error('Something went wrong during checkout');
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="w-5 h-5 text-indigo-600" />
          <span>Checkout Cart</span>
        </div>
      }
      open={isOpen}
      onCancel={handleCancel}
      okText="Confirm Checkout"
      cancelText="Cancel"
      confirmLoading={isLoading}
      onOk={handleSubmit(onSubmit)}
      okButtonProps={{
        className: 'bg-indigo-600 hover:bg-indigo-700',
      }}
    >
      <div className="py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input<CheckoutFormValues>
            label="Checkout Notes"
            name="notes"
            register={register}
            errors={errors}
            placeholder="Add any special instructions or notes for this checkout"
            className="min-h-24 resize-y"
            required
          />
        </form>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
