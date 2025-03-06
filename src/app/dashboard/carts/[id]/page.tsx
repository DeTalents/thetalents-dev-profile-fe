'use client';

import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import CartItem from '@/components/dashboard/cart/CartItems';
import CheckoutModal from '@/components/dashboard/checkout/CheckoutModal';
import {
  useDeleteCartItemMutation,
  useGetTalentCartItemsQuery,
} from '@/features/api/cartApi';
import { message } from 'antd';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Page() {
  const params = useParams();
  const cartId = params.id as string;
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const {
    data: cartData,
    isLoading,
    refetch,
  } = useGetTalentCartItemsQuery({ cartId }, { skip: !cartId });
  const [deleteCartItem, { isLoading: isDeleting }] =
    useDeleteCartItemMutation();

  const handleRemoveTalent = async (itemId: string) => {
    try {
      await deleteCartItem({ cartId, itemId }).unwrap();
      message.success('Talent removed successfully');
    } catch (error) {
      console.error('Failed to delete cart:', error);
      message.error('Something went wrong');
    }
  };

  const handleCheckoutAll = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutSuccess = () => {
    refetch();
  };

  const cartItems = cartData?.data;
  const hasItems = cartItems && cartItems.length > 0;

  const cartStatus = cartItems?.[0]?.cart?.status;
  const isCheckoutComplete = cartStatus === 'checkout_complete';

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
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
        {hasItems && (
          <button
            onClick={handleCheckoutAll}
            disabled={isCheckoutComplete}
            className={twMerge(
              'flex items-center justify-center gap-2 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md',
              isCheckoutComplete
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 hover:shadow-lg'
            )}
            aria-label={
              isCheckoutComplete
                ? 'Already checked out'
                : 'Checkout all talents'
            }
          >
            {isCheckoutComplete ? (
              <>
                <CheckCircle size={18} className="flex-shrink-0" />
                <span className="hidden sm:inline">Checked Out</span>
              </>
            ) : (
              <>
                <ShoppingCart size={18} className="flex-shrink-0" />
                <span className="hidden sm:inline">Checkout</span>
              </>
            )}
          </button>
        )}
      </div>

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

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartId={cartId}
        onSuccess={handleCheckoutSuccess}
      />
    </main>
  );
}
