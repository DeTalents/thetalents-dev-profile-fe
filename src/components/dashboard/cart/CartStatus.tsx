import clsx from 'clsx';
import { CheckIcon, ClockIcon } from 'lucide-react';

export default function CartStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'active',
          'bg-green-500 text-white': status === 'checkout_complete',
        }
      )}
    >
      {status === 'active' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'checkout_complete' ? (
        <>
          Checked
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
