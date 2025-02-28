import { CreateCart } from '@/components/dashboard/buttons';
import CartsTable from '@/components/dashboard/cart/CartsTable';
import { InvoicesTableSkeleton } from '@/components/skeletons/skeletons';
import { lusitana } from '@/utils/font';
import { Suspense } from 'react';

const carts = [
  {
    id: '29be3387-a0b8-47eb-88e6-58d07a58a317',
    name: 'Devops developer',
    createdAt: '2025-02-27T22:50:56.189Z',
    status: 'active',
    items: [{ id: '1' }, { id: '2' }],
  },
  {
    id: '025da3a1-3a04-46eb-bb88-4d90c8e9e926',
    name: 'Junior developer',
    createdAt: '2025-02-27T21:53:10.493Z',
    status: 'checkout_complete',
    items: [{ id: '3' }, { id: '4' }, { id: '5' }],
  },
];

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Carts</h1>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2 md:mt-8">
        <div className="flex-grow" />
        <CreateCart />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <CartsTable carts={carts} />
      </Suspense>
    </div>
  );
}
