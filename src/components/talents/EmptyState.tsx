interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent 
                   text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 
                   hover:bg-indigo-100 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-indigo-500"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
