'use client';

import DeveloperCard from '@/components/talents/DeveloperCard';
import { DeveloperFilters } from '@/components/talents/DeveloperFilters';
import { DeveloperPagination } from '@/components/talents/DeveloperPagination';
import { DevelopersHeader } from '@/components/talents/DevelopersHeader';
import { EmptyState } from '@/components/talents/EmptyState';
import { LoadingState } from '@/components/talents/LoadingState';
import { useGetPublicProfilesQuery } from '@/features/api/apiSlice';
import { Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function DeveloperInformation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL Parameters
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialLimit = parseInt(searchParams.get('limit') || '8');
  const initialSearch = searchParams.get('search') || '';
  const initialExperience = searchParams.getAll('experience');

  // State Management
  const [selectedExperience, setSelectedExperience] =
    useState<string[]>(initialExperience);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const pageSize = initialLimit;

  // Fetch Data
  const { data, isLoading, error } = useGetPublicProfilesQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
    experience: selectedExperience,
  });

  // URL Management
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('limit', pageSize.toString());
    if (searchQuery) params.set('search', searchQuery);
    selectedExperience.forEach((exp) => params.append('experience', exp));

    router.push(`?${params.toString()}`, { scroll: false });
  }, [currentPage, pageSize, searchQuery, selectedExperience, router]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExperienceChange = (experience: string[]) => {
    setSelectedExperience(experience);
    setCurrentPage(1);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return (
        <EmptyState
          icon={<Users className="w-12 h-12 text-gray-400" />}
          title="Error loading developers"
          description="There was an error loading the developers. Please try again later."
          action={{
            label: 'Retry',
            onClick: () => window.location.reload(),
          }}
        />
      );
    }

    if (!data?.data.length) {
      return (
        <EmptyState
          icon={<Users className="w-12 h-12 text-gray-400" />}
          title="No developers found"
          description={
            searchQuery || selectedExperience.length > 0
              ? 'No developers match your search criteria. Try adjusting your filters.'
              : 'There are no developers registered yet.'
          }
          action={
            searchQuery || selectedExperience.length > 0
              ? {
                  label: 'Clear filters',
                  onClick: () => {
                    setSearchQuery('');
                    setSelectedExperience([]);
                    setCurrentPage(1);
                  },
                }
              : undefined
          }
        />
      );
    }

    return (
      <>
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {data.data.map((profile) => (
            <DeveloperCard key={profile.id} profile={profile} />
          ))}
        </div>
        <DeveloperPagination
          current={currentPage}
          total={data.pagination.totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <DevelopersHeader
              totalDevelopers={data?.pagination.totalItems || 0}
              isFilterOpen={isFilterOpen}
              onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              // searchQuery={searchQuery}
              // onSearchChange={setSearchQuery}
            />
          </div>

          {isFilterOpen && (
            <div className="mt-4 transition-all duration-300">
              <DeveloperFilters
                selectedExperience={selectedExperience}
                onExperienceChange={handleExperienceChange}
                position="top"
              />
            </div>
          )}

          <div className="mt-6">
            <main className="flex-1">{renderContent()}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperInformation;
