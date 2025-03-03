'use client';

import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import CartItem from '@/components/dashboard/cart/CartItems';
import {
  useDeleteCartItemMutation,
  useGetTalentCartItemsQuery,
} from '@/features/api/cartApi';
import { message } from 'antd';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const cartId = params.id as string;

  const { data: cartData, isLoading } = useGetTalentCartItemsQuery(
    { cartId },
    { skip: !cartId }
  );
  const [deleteCartItem, { isLoading: isDeleting }] =
    useDeleteCartItemMutation();

  const handleRemoveTalent = async (itemId: string) => {
    try {
      await deleteCartItem({ cartId, itemId }).unwrap();
      message.success('Talent removed successfully');
    } catch (error) {
      console.error('Failed to delete cart:', error);
      message.success('something went wrong');
    }
  };

  const cartItems = cartData?.data;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Carts', href: '/dashboard/carts' },
          {
            label: 'Edit Cart',
            href: `/dashboard/carts/${cartId}`,
            active: true,
          },
        ]}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : cartItems ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemoveTalent={handleRemoveTalent}
              onViewProfile={(talentId) => {
                window.open(`/${talentId}`, '_blank', 'noopener,noreferrer');
              }}
              isLoading={isDeleting}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Cart not found.</p>
      )}
    </main>
  );
}
