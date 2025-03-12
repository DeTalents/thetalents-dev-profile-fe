'use client';

import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import CheckoutItem from '@/components/dashboard/checkout/CheckoutItem';
import CheckoutStatus from '@/components/dashboard/checkout/CheckoutStatus';
import { useGetCheckoutByIdQuery } from '@/features/api/checkouts';
import { message } from 'antd';
import { CalendarClock, Mail, Phone, Store, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutDetailsPage() {
  const params = useParams();
  const checkoutId = params.id as string;
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: checkoutData,
    isLoading,
    error,
    refetch,
  } = useGetCheckoutByIdQuery(checkoutId, { skip: !checkoutId });

  const checkout = checkoutData?.data;

  const handleRemoveTalent = async (itemId: string) => {
    setIsDeleting(true);
    try {
      // await deleteCheckoutItem({ checkoutId, itemId }).unwrap();

      setTimeout(() => {
        message.success('Talent removed successfully');
        setIsDeleting(false);
        refetch();
      }, 1000);
    } catch (error) {
      console.error('Failed to delete talent from checkout:', error);
      message.error('Something went wrong');
      setIsDeleting(false);
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Checkouts', href: '/dashboard/admin/checkouts' },
            {
              label: 'Checkout Details',
              href: `/dashboard/admin/checkouts/${checkoutId}`,
              active: true,
            },
          ]}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Something went wrong. Please try again later.</p>
        </div>
      ) : checkout ? (
        <div className="space-y-6">
          {/* Checkout Information Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Checkout Information
                </h2>
                <CheckoutStatus status={checkout.status} />
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Checkout Details
                  </h3>

                  <div className="space-y-3">
                    {/* <div className="flex items-center gap-2">
                      <ClipboardCheck size={16} className="text-indigo-600" />
                      <span className="text-sm text-gray-500">ID:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {checkout.id}
                      </span>
                    </div> */}

                    <div className="flex items-center gap-2">
                      <CalendarClock size={16} className="text-indigo-600" />
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {new Date(checkout.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {checkout.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Notes
                        </h4>
                        <p className="text-sm text-gray-700">
                          {checkout.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Client Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-indigo-600" />
                      <span className="text-sm text-gray-500">Name:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {checkout.clientUser?.clientProfile?.clientName ||
                          'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Store size={16} className="text-indigo-600" />
                      <span className="text-sm text-gray-500">Company:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {checkout.clientUser?.clientProfile?.companyName ||
                          'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-indigo-600" />
                      <span className="text-sm text-gray-500">Email:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {checkout.clientUser?.email || 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-indigo-600" />
                      <span className="text-sm text-gray-500">Phone:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {checkout.clientUser?.clientProfile?.phone || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Items */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Talent Selection ({checkout.items.length})
            </h2>

            <div className="space-y-4">
              {checkout.items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  item={item}
                  onRemoveTalent={handleRemoveTalent}
                  onViewProfile={(talentId) => {
                    window.open(
                      `/${talentId}`,
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                  isLoading={isDeleting}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Checkout not found.</p>
      )}
    </main>
  );
}
