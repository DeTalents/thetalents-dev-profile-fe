'use client';

import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import CartItem from '@/components/dashboard/cart/CartItems';
import { useGetTalentCartItemsMutation } from '@/features/api/cartApi';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const params = useParams();
  const cartId = params.id;

  const [getTalentCartItems, { data: cartData, isLoading }] =
    useGetTalentCartItemsMutation();

  useEffect(() => {
    if (cartId && typeof cartId === 'string') {
      getTalentCartItems({ cartId });
    }
  }, [cartId, getTalentCartItems]);

  const handleRemoveTalent = (itemId: string) => {
    console.log(
      'Remove talent functionality will be implemented later:',
      itemId
    );
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
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Cart not found.</p>
      )}
    </main>
  );
}
