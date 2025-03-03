'use strict';
import type { DeveloperProfile as DeveloperProfileType } from '@/app/(talents)/page';
import {
  useAddTalentToCartItemMutation,
  useCreateCartMutation,
  useGetAllCartsQuery,
} from '@/features/api/cartApi';
import { Breadcrumb, Button, message } from 'antd';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CartModals from './cart/CartModels';
import ProfileDetails from './ProfileDetails';
import ProfileSidebar from './ProfileSidebar';

export interface TalentItem {
  id: string;
  firstName: string;
  secondName: string;
  skills: string[];
  mainTitle: string;
  yearsOfExperience: number;
}

export interface CartItem {
  id: string;
  cartId: string;
  talentId: string;
  talent: TalentItem;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  name: string;
  clientId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface FormValues {
  cartName: string;
}

const DeveloperProfile = ({ profile }: { profile: DeveloperProfileType }) => {
  const router = useRouter();
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [isNewCartModalVisible, setIsNewCartModalVisible] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [loadingCartId, setLoadingCartId] = useState<string | null>(null);

  const {
    data: cartsResponse,
    isLoading: isLoadingCarts,
    refetch: refetchCarts,
  } = useGetAllCartsQuery();
  const [createCart, { isLoading: isCreatingCart }] = useCreateCartMutation();
  const [addTalentToCartItem, { isLoading: isAddingTalentItem }] =
    useAddTalentToCartItemMutation();

  // Extract carts from the response
  const carts = cartsResponse?.data || [];

  // Check if talent is already in a cart
  const isTalentInCart = (cart: Cart, talentId: string): boolean => {
    return cart.items?.some((item) => item.talentId === talentId) || false;
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await refetchCarts();

      if (carts.length === 0) {
        setIsNewCartModalVisible(true);
      } else if (carts.length === 1) {
        await handleAddTalentToExistingCart(carts[0].id);
      } else {
        setIsCartModalVisible(true);
      }
    } catch (error) {
      message.error('Failed to add developer to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddTalentToExistingCart = async (cartId: string) => {
    const cart = carts.find((c) => c.id === cartId);
    if (cart && isTalentInCart(cart, profile.id)) {
      message.info('This developer is already in the selected cart');
      setIsCartModalVisible(false);
      return;
    }

    setLoadingCartId(cartId);
    try {
      await addTalentToCartItem({ cartId, talentId: profile.id }).unwrap();
      setIsCartModalVisible(false);
      message.success('Developer added to cart successfully');
    } catch (error) {
      message.error('Failed to add developer to cart');
    } finally {
      setLoadingCartId(null);
    }
  };

  const handleCreateNewCart = async (cartName: string) => {
    try {
      const newCartResponse = await createCart({ name: cartName }).unwrap();
      const newCartId = newCartResponse.data.id;
      message.success('Cart created successfully');

      setIsNewCartModalVisible(false);

      await handleAddTalentToExistingCart(newCartId);

      await refetchCarts();
    } catch (error) {
      message.error('Failed to create cart');
    }
  };

  const handleSelectCart = (cartId: string) => {
    handleAddTalentToExistingCart(cartId);
  };

  const handleCreateNewCartModal = () => {
    setIsCartModalVisible(false);
    setIsNewCartModalVisible(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 space-y-4">
          <Breadcrumb
            items={[
              { title: <Link href="/">Talents</Link> },
              { title: `${profile.firstName} ${profile.secondName}` },
            ]}
            className="text-sm"
          />
          <Button
            icon={<ChevronLeft className="w-4 h-4" />}
            onClick={() => router.back()}
            className="flex items-center hover:text-indigo-600"
          >
            Back to Talents
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProfileSidebar
            profile={profile}
            onAddToCart={handleAddToCart}
            isLoading={addingToCart || isAddingTalentItem || isCreatingCart}
          />
          <ProfileDetails profile={profile} />
        </div>
      </div>

      <CartModals
        carts={carts}
        talentId={profile.id}
        isLoadingCarts={isLoadingCarts}
        isCreatingCart={isCreatingCart}
        loadingCartId={loadingCartId}
        isCartModalVisible={isCartModalVisible}
        isNewCartModalVisible={isNewCartModalVisible}
        onCartModalClose={() => setIsCartModalVisible(false)}
        onNewCartModalClose={() => setIsNewCartModalVisible(false)}
        onSelectCart={handleSelectCart}
        onCreateNewCartModal={handleCreateNewCartModal}
        onCreateNewCart={handleCreateNewCart}
      />
    </motion.div>
  );
};

export default DeveloperProfile;
