import { ICheckout } from '@/utils/types/checkout';
import CheckoutStatus from './CheckoutStatus';

interface TableProps {
  checkouts: ICheckout[];
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US'
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const getShortenedId = (id: string) => {
  return id.substring(0, 8);
};

export default function CheckoutsTable({ checkouts }: TableProps) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {checkouts?.map((checkout) => (
              <div
                key={checkout.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium">
                      ID: {getShortenedId(checkout.id)}
                    </p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {checkout.notes}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <CheckoutStatus status={checkout.status} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Created: {formatDateToLocal(checkout.createdAt)}
                    </p>
                  </div>
                  {/* <div className="flex justify-end gap-2">
                    <ViewCheckout id={checkout.id} />
                    <DeleteCheckout id={checkout.id} />
                    <UpdateCheckoutStatus
                      id={checkout.id}
                      currentStatus={checkout.status}
                    />
                  </div> */}
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
                  Checkout ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Notes
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Created At
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
              {checkouts?.map((checkout) => (
                <tr
                  key={checkout.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">
                        {getShortenedId(checkout.id)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="truncate max-w-xs">{checkout.notes}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {formatDateToLocal(checkout.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    <CheckoutStatus status={checkout.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      {/* <ViewCheckout id={checkout.id} />
                      <DeleteCheckout id={checkout.id} />
                      <UpdateCheckoutStatus
                        id={checkout.id}
                        currentStatus={checkout.status}
                      /> */}
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
