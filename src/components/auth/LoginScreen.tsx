'use client';

import {
  ScheduleOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import Image from 'next/image';
import GoogleButton from './GoogleButton';

const { Title, Text } = Typography;

const stats = [
  { icon: <UserOutlined />, label: 'Developers', value: '10,000+' },
  { icon: <ShopOutlined />, label: 'Companies', value: '500+' },
  { icon: <ScheduleOutlined />, label: 'Listings', value: '25,000+' },
];

const CurvedUnderline = () => (
  <svg
    viewBox="0 0 200 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[105%]"
    preserveAspectRatio="none"
  >
    <path
      d="M8 10C8 10 40 2 100 2C160 2 192 10 192 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-draw"
    />
  </svg>
);

const LoginScreen = () => {
  return (
    // Changed to ensure full viewport width and height
    <main className="w-screen h-screen overflow-hidden flex flex-col md:flex-row">
      {/* Left Section - Using flex-1 to ensure equal width distribution */}
      <section className="w-1/2 relative flex flex-col justify-between max-sm:w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/1181421/pexels-photo-1181421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow flex items-center px-8 md:px-12 pt-20">
          <div className="text-center w-full animate-fade-in">
            <div className="relative inline-block">
              <Title
                className="!text-white !mb-0 font-bold text-4xl md:text-5xl relative inline-block"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                The Talents
                <CurvedUnderline />
              </Title>
            </div>
            <Text
              className="!text-gray-300 !text-lg md:!text-xl !block mt-6"
              style={{ fontFamily: 'Merriweather, serif' }}
            >
              We do the tedious work for you
            </Text>
          </div>
        </div>

        {/* Stats */}
        {/* <div className="relative z-10 p-8 md:p-12">
          <div className="grid grid-cols-3 gap-4 animate-fade-in-delayed">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm 
                          hover:bg-white/20 transition-all duration-300 group"
              >
                <div
                  className="text-white text-2xl mb-2 group-hover:scale-110 
                              transition-transform duration-300"
                >
                  {stat.icon}
                </div>
                <div className="text-white font-bold text-xl">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* Right Section - Using flex-1 to ensure equal width distribution */}
      <section className="w-1/2 flex items-center justify-center bg-white p-8 md:p-12 max-sm:w-full max-sm:h-screen">
        <div className="max-w-md w-full space-y-6 animate-fade-in">
          <Title
            level={2}
            className="!text-3xl !mb-8 !font-medium !text-gray-800"
          >
            Login into The Talents
          </Title>

          <GoogleButton />

          <Text className="!block !text-center !text-gray-500 !mt-6 !text-sm">
            Login with email and password coming soon
          </Text>
        </div>
      </section>

      <style jsx global>{`
        @keyframes draw {
          from {
            stroke-dashoffset: 350;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-draw {
          stroke-dasharray: 350;
          animation: draw 1.5s ease-out forwards;
          animation-delay: 0.5s;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.6s ease-out forwards;
          animation-delay: 500ms;
        }

        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
};

export default LoginScreen;
