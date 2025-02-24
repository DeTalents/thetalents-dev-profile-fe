import { motion } from 'framer-motion';
import { FileQuestion, Plus, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

interface ProfileNotFoundProps {
  type: 'error' | 'notFound';
  message?: string;
  userRole?: string;
  createProfilePath?: string;
}

export const ProfileNotFound = ({
  type,
  message,
  userRole = 'developer',
  createProfilePath = '/create-profile/developer',
}: ProfileNotFoundProps) => {
  const isClient = userRole === 'client';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
            {type === 'error' ? (
              <RefreshCcw className="w-8 h-8 text-gray-600" />
            ) : (
              <FileQuestion className="w-8 h-8 text-gray-600" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {type === 'error' ? 'Something went wrong' : 'Profile Not Found'}
          </h2>

          <p className="text-gray-500 mb-8">
            {message ||
              (isClient
                ? "We couldn't find your client profile. Would you like to complete your registration?"
                : "We couldn't find your developer profile. Would you like to create one?")}
          </p>

          <div className="space-y-3">
            {type === 'error' ? (
              <button
                onClick={() => window.location.reload()}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Try Again
              </button>
            ) : (
              <Link
                href={createProfilePath}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isClient ? 'Complete Registration' : 'Create Profile'}
              </Link>
            )}

            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
