'use client';

import CartsTable from '@/components/dashboard/cart/CartsTable';
import { CreateCartButton } from '@/components/dashboard/cart/CreateCartButton';
import EmptyState from '@/components/global/EmptyState';
import { InvoicesTableSkeleton } from '@/components/skeletons/skeletons';
import { useGetAllCartsQuery } from '@/features/api/cartApi';
import { RootState } from '@/store/store';
import { lusitana } from '@/utils/font';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Page() {
  const userRole = useSelector((state: RootState) => state.auth.role);

  const { data: cartsResponse, isLoading } = useGetAllCartsQuery(undefined, {
    skip: userRole !== 'client',
  });

  const carts = cartsResponse?.data || [];
  const isEmptyCart = !isLoading && carts.length === 0;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Carts</h1>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2 md:mt-8">
        <div className="flex-grow" />
        <CreateCartButton />
      </div>

      {isLoading ? (
        <InvoicesTableSkeleton />
      ) : isEmptyCart ? (
        <EmptyState
          icon={ShoppingCart}
          title="No carts yet"
          description="You haven't created any carts yet. Start by creating a new cart to add talented developers to your selection."
          className={lusitana.className}
        />
      ) : (
        <CartsTable carts={carts} />
      )}
    </div>
  );
}
