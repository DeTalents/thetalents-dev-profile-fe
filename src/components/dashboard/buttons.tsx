import { useDeleteCartMutation } from '@/features/api/cartApi';
import { useUpdateCheckoutStatusMutation } from '@/features/api/checkouts';
import { CHECKOUT_STATUS_OPTIONS } from '@/utils/constants';
import { message, Popconfirm, Popover, Tooltip } from 'antd';
import clsx from 'clsx';
import {
  EditIcon,
  EyeIcon,
  PlusIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CheckoutModal from './checkout/CheckoutModal';
interface CheckoutCartProps {
  id: string;
  disabled: boolean;
  onCheckoutSuccess?: () => void;
}

export function ViewCart({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/carts/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}

export function DeleteCart({ id }: { id: string }) {
  const [deleteCart, { isLoading: isDeleting }] = useDeleteCartMutation();

  const handleDeleteCart = async (id: string) => {
    try {
      await deleteCart(id).unwrap();
      message.success('cart deleted successfully');
    } catch (error) {
      console.error('Failed to delete cart:', error);
      message.success('something went wrong');
    }
  };

  return (
    <>
      <Popconfirm
        title="Delete cart"
        description="Are you sure you want to delete this cart?"
        onConfirm={() => handleDeleteCart(id)}
        okText="Yes"
        cancelText="No"
        placement="left"
        okButtonProps={{
          danger: true,
          loading: isDeleting,
        }}
      >
        <button
          className="rounded-md border p-2 hover:bg-gray-100"
          disabled={isDeleting}
        >
          <span className="sr-only">Delete</span>
          <Trash2Icon className="w-5" />
        </button>
      </Popconfirm>
    </>
  );
}

export function CreateCart() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add new cart</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CheckoutCart({
  id,
  disabled,
  onCheckoutSuccess,
}: CheckoutCartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const linkClasses = clsx('p-2 rounded-lg border transition-colors', {
    'border-gray-200 text-gray-300 cursor-not-allowed': disabled,
    'border-gray-200 hover:border-gray-300 text-gray-500 hover:text-green-600 cursor-pointer':
      !disabled,
  });

  const handleOpenModal = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const linkContent = (
    <div className={linkClasses} onClick={handleOpenModal}>
      <ShoppingCartIcon className="w-5" />
    </div>
  );

  return (
    <>
      {disabled ? (
        <Tooltip title="This cart has already been checked out">
          <div className="inline-block">{linkContent}</div>
        </Tooltip>
      ) : (
        <div className="inline-block">{linkContent}</div>
      )}

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartId={id}
        onSuccess={onCheckoutSuccess}
      />
    </>
  );
}

export function ViewCheckout({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/admin/checkouts/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}

export function UpdateCheckoutStatus({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [updateCheckoutStatus, { isLoading: isUpdating }] =
    useUpdateCheckoutStatusMutation();

  const handleUpdateStatus = async () => {
    try {
      await updateCheckoutStatus({ id, status: selectedStatus }).unwrap();
      message.success('Status updated successfully');
      setOpen(false);
    } catch (error) {
      console.error('Failed to update status:', error);
      message.error('Something went wrong');
    }
  };

  const content = (
    <div className="w-64 p-2">
      <h3 className="mb-2 font-medium">Update Status</h3>
      <div className="mb-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full rounded-md border p-2"
          disabled={isUpdating}
        >
          {CHECKOUT_STATUS_OPTIONS.filter((option) => option.value !== '').map(
            (option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="rounded-md border px-3 py-1 hover:bg-gray-100"
          onClick={() => setOpen(false)}
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button
          className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          onClick={handleUpdateStatus}
          disabled={isUpdating || selectedStatus === currentStatus}
        >
          {isUpdating ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="leftTop"
    >
      <button
        className="rounded-md border p-2 hover:bg-gray-100"
        aria-label="Update status"
      >
        <span className="sr-only">Update Status</span>
        <EditIcon className="w-5" />
      </button>
    </Popover>
  );
}
