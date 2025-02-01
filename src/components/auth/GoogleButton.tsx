import { api_base_url } from '@/utils/axios';
import { GoogleLogo } from '@phosphor-icons/react';
import { Button } from 'antd';

const GoogleButton = () => {
  const handleGoogleLogin = () => {
    const authUrl = `${api_base_url}/auth/google`;
    window.location.href = authUrl;

    console.log('+++++', api_base_url);
  };

  return (
    <Button
      type="primary"
      block
      size="large"
      className="!bg-[#FF7B47] !border-[#FF7B47] !h-12 !rounded-lg
                 hover:!bg-[#E66535] hover:!border-[#E66535] !text-white
                 transition-all duration-300 transform hover:scale-[1.01]
                 !flex !items-center !justify-center !gap-3 !px-6"
      onClick={handleGoogleLogin}
    >
      <GoogleLogo size={24} weight="bold" className="text-white" />
      <span className="font-medium">Continue with Google</span>
    </Button>
  );
};

export default GoogleButton;
