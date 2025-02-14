import { Input } from 'antd';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface SearchHeaderProps {
  onSearch: (value: string) => void;
}

export const SearchHeader = ({ onSearch }: SearchHeaderProps) => {
  return (
    <div className="relative h-[280px] mb-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Replace with your image URL
          alt="Talents background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Find Your Next Tech Talent
        </h1>

        <div className="max-w-2xl">
          <Input
            size="large"
            placeholder="Search by skills, experience, or role..."
            prefix={<Search className="w-5 h-5 text-gray-400" />}
            className="rounded-full h-12"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
