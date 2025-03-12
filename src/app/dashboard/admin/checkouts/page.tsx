'use client';

import AdminCheckoutsTable from '@/components/dashboard/checkout/AdminCheckoutsTable';
import EmptyState from '@/components/global/EmptyState';
import { InvoicesTableSkeleton } from '@/components/skeletons/skeletons';
import { useGetCheckoutsForAdminQuery } from '@/features/api/checkouts';
import { RootState } from '@/store/store';
import { CHECKOUT_STATUS_OPTIONS } from '@/utils/constants';
import { lusitana } from '@/utils/font';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Page() {
  const userRole = useSelector((state: RootState) => state.auth.role);
  const [statusFilter, setStatusFilter] = useState('');

  const { data: checkoutResponse, isLoading } = useGetCheckoutsForAdminQuery(
    statusFilter ? { status: statusFilter } : undefined,
    {
      skip: userRole !== 'admin',
    }
  );

  const checkouts = checkoutResponse?.data || [];
  const isEmptyCheckout = !isLoading && checkouts.length === 0;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Checkouts</h1>
      </div>

      <div className="mt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-2 md:mt-8">
        <div className="w-full md:w-64">
          <label
            htmlFor="status-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {CHECKOUT_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <InvoicesTableSkeleton />
      ) : isEmptyCheckout ? (
        <EmptyState
          icon={ShoppingBag}
          title={
            statusFilter
              ? `No ${statusFilter.replace('_', ' ')} checkouts found`
              : 'No checkouts yet'
          }
          description={
            statusFilter
              ? `There are no checkouts with status "${statusFilter.replace(
                  '_',
                  ' '
                )}". Try changing the filter or create a new checkout.`
              : "You haven't created any checkouts yet. Start by creating a new checkout to finalize your talent selection process."
          }
          className={lusitana.className}
        />
      ) : (
        <AdminCheckoutsTable checkouts={checkouts} />
      )}
    </div>
  );
}
