interface CheckoutStatusProps {
  status: string;
}

export default function CheckoutStatus({ status }: CheckoutStatusProps) {
  let statusColor;

  switch (status.toLowerCase()) {
    case 'active':
      statusColor = 'bg-green-100 text-green-800';
      break;
    case 'under_process':
      statusColor = 'bg-yellow-100 text-yellow-800';
      break;
    case 'processed':
      statusColor = 'bg-blue-100 text-blue-800';
      break;
    case 'cancelled':
      statusColor = 'bg-red-100 text-red-800';
      break;
    default:
      statusColor = 'bg-gray-100 text-gray-800';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
