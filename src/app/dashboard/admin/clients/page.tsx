'use client';

import ClientsTable from '@/components/dashboard/client/ClientsTable';
import { InviteClientButton } from '@/components/dashboard/client/InviteClientButton';
import EmptyState from '@/components/global/EmptyState';
import { InvoicesTableSkeleton } from '@/components/skeletons/skeletons';
import { useGetAllClientsQuery } from '@/features/api/clientsApi';
import { RootState } from '@/store/store';
import { lusitana } from '@/utils/font';
import { Users } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Page() {
  const userRole = useSelector((state: RootState) => state.auth.role);

  const { data: clientsResponse, isLoading } = useGetAllClientsQuery(
    undefined,
    {
      skip: userRole !== 'admin',
    }
  );

  const clients = clientsResponse?.data || [];
  const isEmptyClients = !isLoading && clients.length === 0;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Clients</h1>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2 md:mt-8">
        <div className="flex-grow" />
        <InviteClientButton />
      </div>

      {isLoading ? (
        <InvoicesTableSkeleton />
      ) : isEmptyClients ? (
        <EmptyState
          icon={Users}
          title="No clients yet"
          description="You haven't added any clients yet. Start by creating a new client."
          className={lusitana.className}
        />
      ) : (
        <ClientsTable clients={clients} />
      )}
    </div>
  );
}
