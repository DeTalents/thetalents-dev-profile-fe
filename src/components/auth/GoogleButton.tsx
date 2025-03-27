import { api_base_url } from '@/features/api/apiSlice';
import { Button } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authUrl = `${api_base_url}/auth/google`;
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.href = authUrl;
    } catch (err) {
      setError('Authentication failed. Please try again.');
      setIsLoading(false);
      console.error('Google Login Error:', err);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Button
        type="default"
        block
        size="large"
        loading={isLoading}
        disabled={isLoading}
        className="!h-12 !rounded-lg !border-gray-300
                   hover:!border-indigo-400 !bg-white !text-gray-700
                   transition-all duration-200 hover:shadow-md
                   !flex !items-center !justify-center !gap-3 !px-6
                   hover:!bg-gray-50 active:!bg-gray-100
                   disabled:!opacity-50 disabled:!cursor-not-allowed"
        onClick={handleGoogleLogin}
      >
        <Image
          src="/google.png"
          alt="Google Icon"
          width={24}
          height={24}
          className="mr-2"
        />
        <span className="font-medium text-gray-700">
          {isLoading ? 'Authenticating...' : 'Continue with Google'}
        </span>
      </Button>
      {error && (
        <div className="text-center text-red-500 text-sm mt-2">{error}</div>
      )}
    </div>
  );
};

export default GoogleButton;
