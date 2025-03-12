'use client';

import { Popconfirm } from 'antd';
import {
  Award,
  Briefcase,
  ChevronRight,
  PhoneCall,
  Trash2,
} from 'lucide-react';
import React, { useState } from 'react';

type CheckoutItemProps = {
  item: {
    id: string;
    checkoutId: string;
    talent: {
      id: string;
      firstName: string;
      secondName?: string;
      mainTitle: string;
      skills: string[];
      phone: string;
      yearsOfExperience?: number;
    };
  };
  onRemoveTalent: (id: string) => void;
  onViewProfile: (talentId: string) => void;
  isLoading: boolean;
};

const CheckoutItem: React.FC<CheckoutItemProps> = ({
  item,
  onRemoveTalent,
  onViewProfile,
  isLoading,
}) => {
  const { talent } = item;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 w-full"></div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-shrink-0">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold text-indigo-300">
                  {talent.firstName.charAt(0)}
                  {talent.secondName ? talent.secondName.charAt(0) : ''}
                </span>
              </div>
              {talent.yearsOfExperience !== undefined && (
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow-md flex items-center">
                  <Award size={12} className="mr-1" />
                  <span>{talent.yearsOfExperience}y</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800 text-xl tracking-tight">
                  {talent.firstName} {talent.secondName || ''}
                </h3>
                <p className="text-sm text-indigo-600 flex items-center gap-1 font-medium mt-1">
                  <Briefcase size={14} />
                  {talent.mainTitle}
                </p>
              </div>

              <div className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
                <PhoneCall size={12} />
                {talent.phone}
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
          <Popconfirm
            title="Remove Talent from checkout"
            description="Are you sure you want to remove this talent?"
            onConfirm={() => onRemoveTalent(item.id)}
            okText="Yes"
            cancelText="No"
            placement="top"
            okButtonProps={{
              danger: true,
              loading: isLoading,
            }}
          >
            <button
              className="flex items-center gap-1 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-red-200 shadow-sm"
              aria-label="Remove talent"
            >
              <Trash2 size={16} />
              <span>Remove</span>
            </button>
          </Popconfirm>

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
        className={`absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-indigo-600/5 pointer-events-none transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </div>
  );
};

export default CheckoutItem;
