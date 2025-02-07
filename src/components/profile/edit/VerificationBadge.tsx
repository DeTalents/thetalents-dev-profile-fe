import { CheckCircle2, XCircle } from 'lucide-react';

interface VerificationBadgeProps {
  isVerified: boolean;
}

export const VerificationBadge = ({ isVerified }: VerificationBadgeProps) => {
  if (isVerified) {
    return (
      <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium">Verified Profile</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
      <XCircle className="w-5 h-5" />
      <span className="font-medium">Unverified Profile</span>
    </div>
  );
};
