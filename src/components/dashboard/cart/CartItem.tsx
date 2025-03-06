'use client';

import { ITalent } from '@/utils/types/cart';
import { ChevronRight, Clock, Trash2 } from 'lucide-react';

interface IItem {
  item: {
    id: string;
    talent: ITalent;
  };
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onRemove }: IItem) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {item.talent.firstName} {item.talent.secondName}
            </h3>
            <p className="text-indigo-600 font-medium">
              {item.talent.mainTitle}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove talent"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Clock size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {item.talent.yearsOfExperience}{' '}
            {item.talent.yearsOfExperience === 1 ? 'year' : 'years'} of
            experience
          </span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {item.talent.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4">
        <button className="w-full flex items-center justify-center text-indigo-600 hover:text-indigo-800 transition-colors">
          <span className="font-medium">View Profile</span>
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
