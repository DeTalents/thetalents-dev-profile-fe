interface ClientProfile {
  clientName: string;
  companyName: string;
  phone: string;
}

interface Client {
  id: string;
  email: string;
  clientProfile?: ClientProfile;
}

interface TableProps {
  clients: Client[];
}

export default function ClientsTable({ clients }: TableProps) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {clients?.map((client) => (
              <div
                key={client.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium">
                      {client.clientProfile?.clientName ||
                        'Profile not completed'}
                    </p>
                    {client.clientProfile?.companyName && (
                      <p className="text-sm text-gray-500">
                        {client.clientProfile.companyName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Email: {client.email}
                    </p>
                    {client.clientProfile?.phone && (
                      <p className="text-sm text-gray-500">
                        Phone: {client.clientProfile.phone}
                      </p>
                    )}
                    {!client.clientProfile && (
                      <p className="text-sm text-amber-500">
                        Profile pending completion
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <ViewClient id={client.id} />
                    <EditClient id={client.id} />
                    <DeleteClient id={client.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Client Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Status
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {clients?.map((client) => (
                <tr
                  key={client.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">
                        {client.clientProfile?.clientName || 'Not provided'}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {client.clientProfile?.companyName || 'Not provided'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {client.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {client.clientProfile?.phone || 'Not provided'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        client.clientProfile
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {client.clientProfile ? 'Complete' : 'Pending'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      {/* <ViewClient id={client.id} />
                      <EditClient id={client.id} />
                      <DeleteClient id={client.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
