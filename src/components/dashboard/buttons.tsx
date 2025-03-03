import { useDeleteCartMutation } from '@/features/api/cartApi';
import { message, Popconfirm, Tooltip } from 'antd';
import clsx from 'clsx';
import { EyeIcon, PlusIcon, ShoppingCartIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';

interface CheckoutCartProps {
  id: string;
  disabled?: boolean;
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
export function CheckoutCart({ id, disabled }: CheckoutCartProps) {
  const linkClasses = clsx('p-2 rounded-lg border transition-colors', {
    'border-gray-200 text-gray-300 cursor-not-allowed': disabled,
    'border-gray-200 hover:border-gray-300 text-gray-500 hover:text-green-600':
      !disabled,
  });

  const linkContent = (
    <div className={linkClasses}>
      <ShoppingCartIcon className="w-5" />
    </div>
  );

  return disabled ? (
    <Tooltip title="This cart has already been checked out">
      <div className="inline-block">{linkContent}</div>
    </Tooltip>
  ) : (
    <Link href={`/checkout/${id}`} passHref>
      {linkContent}
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
