'use client';

import DeveloperCard from '@/components/talents/DeveloperCard';
import { DeveloperFilters } from '@/components/talents/DeveloperFilters';
import { DeveloperPagination } from '@/components/talents/DeveloperPagination';
import { DevelopersHeader } from '@/components/talents/DevelopersHeader';
import { SearchHeader } from '@/components/talents/SearchHeader';
import { useState } from 'react';
import { mockProfileData } from '../profile/developer/page';

function DeveloperInformation() {
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of cards per page
  const totalDevelopers = 25;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically fetch new data for the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader onSearch={setSearchQuery} />
      <div className="max-w-7xl mx-auto px-8 pt-3">
        <div className="flex gap-8">
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isFilterOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'
            }`}
          >
            {isFilterOpen && (
              <DeveloperFilters
                selectedExperience={selectedExperience}
                onExperienceChange={setSelectedExperience}
              />
            )}
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[fit-content]">
              <DevelopersHeader
                totalDevelopers={totalDevelopers}
                isFilterOpen={isFilterOpen}
                onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
            <div className="mt-6">
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-3'
                }`}
              >
                <DeveloperCard profile={mockProfileData} />
                <DeveloperCard profile={mockProfileData} />
                <DeveloperCard profile={mockProfileData} />
                <DeveloperCard profile={mockProfileData} />
              </div>
              <DeveloperPagination
                current={currentPage}
                total={totalDevelopers}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperInformation;
