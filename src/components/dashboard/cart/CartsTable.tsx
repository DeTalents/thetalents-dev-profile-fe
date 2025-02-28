import { CheckoutCart, DeleteCart, ViewCart } from '../buttons';
import CartStatus from './CartStatus';

interface Cart {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  items: Array<{ id: string }>;
}

interface TableProps {
  carts: Cart[];
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

export default function CartsTable({ carts }: TableProps) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {carts?.map((cart) => (
              <div
                key={cart.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium">{cart.name}</p>
                    <p className="text-sm text-gray-500">
                      {cart.items.length} talents
                    </p>
                  </div>
                  <div className="flex items-center">
                    <CartStatus status={cart.status} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Created: {formatDateToLocal(cart.createdAt)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ViewCart id={cart.id} />
                    <DeleteCart id={cart.id} />
                    <CheckoutCart id={cart.id} />
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
                  Cart Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Talents
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
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {carts?.map((cart) => (
                <tr
                  key={cart.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{cart.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {cart.items.length}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {formatDateToLocal(cart.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    <CartStatus status={cart.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <ViewCart id={cart.id} />
                      <DeleteCart id={cart.id} />
                      <CheckoutCart
                        id={cart.id}
                        disabled={cart.status === 'checkout_complete'}
                      />
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
