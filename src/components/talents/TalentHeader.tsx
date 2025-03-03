import { Briefcase, LayoutDashboard, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const TalentsHeader = () => {
  return (
    <div className="relative h-[320px] mb-8">
      {/* Dashboard Navigation Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Talents background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-8">
        <div className="h-full flex flex-col justify-center">
          {/* Main Content */}
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              <span className="block">Discover Top Tech</span>
              <span className="block">
                Talents <span className="text-yellow-400">Today</span>
              </span>
            </h1>

            <p className="text-lg text-white/90 mb-8 max-w-2xl">
              Connect with skilled developers ready to bring your vision to
              life. Our platform matches you with pre-vetted tech professionals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Active Developers</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-12 right-12 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute bottom-8 left-24 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
    </div>
  );
};
