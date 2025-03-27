import LoginScreen from '@/components/auth/LoginScreen';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | TheTalents - Hire Developers in Rwanda',
  description:
    'Log in to TheTalents and connect with top developers in Rwanda. Simplify your hiring process today.',
  robots: 'index, follow',
};

export default function HomePage() {
  return (
    <div className="container">
      <LoginScreen />
    </div>
  );
}
