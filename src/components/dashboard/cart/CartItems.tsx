'use client';

import { ICartItem } from '@/utils/types/cart';
import { Award, Briefcase, ChevronRight, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

type CartItemProps = {
  item: ICartItem;
  onRemoveTalent: (id: string) => void;
  onViewProfile: (talentId: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemoveTalent,
  onViewProfile,
}) => {
  const { talent } = item;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 w-full"></div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-shrink-0">
            <div className="relative inline-block">
              {talent.profileImage ? (
                <>
                  <div></div>
                </>
              ) : (
                // <img
                //   src={talent.profileImage}
                //   alt={`${talent.firstName} ${talent.secondName}`}
                //   className="w-20 h-20 rounded-lg object-cover shadow-md border-2 border-white"
                // />
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-indigo-300">
                    {talent.firstName.charAt(0)}
                    {talent.secondName.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow-md flex items-center">
                <Award size={12} className="mr-1" />
                <span>{talent.yearsOfExperience}y</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800 text-xl tracking-tight">
                  {talent.firstName} {talent.secondName}
                </h3>
                <p className="text-sm text-indigo-600 flex items-center gap-1 font-medium mt-1">
                  <Briefcase size={14} />
                  {talent.mainTitle}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => onRemoveTalent(item.id)}
            className="flex items-center gap-1 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-red-200 shadow-sm"
            aria-label="Remove talent"
          >
            <Trash2 size={16} />
            <span>Remove</span>
          </button>

          <button
            onClick={() => onViewProfile(talent.id)}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <span>View Profile</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 pointer-events-none transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </div>
  );
};

export default CartItem;
