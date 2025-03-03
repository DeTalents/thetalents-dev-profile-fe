'use client';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionButton?: ReactNode;
  className?: string;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionButton,
  className = '',
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 mt-8 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 ${className}`}
    >
      {Icon && (
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <Icon className="h-12 w-12 text-gray-400" />
        </div>
      )}
      <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">{description}</p>
      {actionButton && actionButton}
    </div>
  );
};

export default EmptyState;
