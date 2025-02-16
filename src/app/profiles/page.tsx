'use client';

import DeveloperCard from '@/components/talents/DeveloperCard';
import { DeveloperFilters } from '@/components/talents/DeveloperFilters';
import { DeveloperPagination } from '@/components/talents/DeveloperPagination';
import { DevelopersHeader } from '@/components/talents/DevelopersHeader';
import { SearchHeader } from '@/components/talents/SearchHeader';
import { useGetPublicProfilesQuery } from '@/features/api/apiSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Reference = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  relationship: string;
};

type Experience = {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string | null; // ISO date string or null
};

type User = {
  email: string;
};

export type DeveloperProfile = {
  id: string;
  userId: string;
  firstName: string;
  secondName: string;
  mainTitle: string;
  phone: string;
  summary: string;
  skills: string[];
  isAndelan: string;
  references: Reference[];
  nonAndelaProgram: string | null;
  nonAndelaProgramYear: number | null;
  yearsOfExperience: number;
  isVerified: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: User;
  experiences: Experience[];
};

type Pagination = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

export type DeveloperProfilesResponse = {
  success: boolean;
  message: string;
  data: DeveloperProfile[];
  pagination: Pagination;
};
// function DeveloperInformation() {
//   const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
//   const [searchQuery, setSearchQuery] = useState('');

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 8; // Number of cards per page
//   const totalDevelopers = 25;

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     // Here you would typically fetch new data for the page
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <SearchHeader onSearch={setSearchQuery} />
//       <div className="max-w-7xl mx-auto px-8 pt-3">
//         <div className="flex gap-8">
//           <div
//             className={`transition-all duration-300 overflow-hidden ${
//               isFilterOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'
//             }`}
//           >
//             {isFilterOpen && (
//               <DeveloperFilters
//                 selectedExperience={selectedExperience}
//                 onExperienceChange={setSelectedExperience}
//               />
//             )}
//           </div>
//           <div className="flex-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[fit-content]">
//               <DevelopersHeader
//                 totalDevelopers={totalDevelopers}
//                 isFilterOpen={isFilterOpen}
//                 onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
//                 viewMode={viewMode}
//                 onViewModeChange={setViewMode}
//               />
//             </div>
//             <div className="mt-6">
//               <div
//                 className={`grid gap-6 ${
//                   viewMode === 'grid'
//                     ? 'grid-cols-1 md:grid-cols-2'
//                     : 'grid-cols-1 md:grid-cols-3'
//                 }`}
//               >
//                 <DeveloperCard profile={mockProfileData} />
//                 <DeveloperCard profile={mockProfileData} />
//                 <DeveloperCard profile={mockProfileData} />
//                 <DeveloperCard profile={mockProfileData} />
//               </div>
//               <DeveloperPagination
//                 current={currentPage}
//                 total={totalDevelopers}
//                 pageSize={pageSize}
//                 onChange={handlePageChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeveloperInformation;

function DeveloperInformation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialLimit = parseInt(searchParams.get('limit') || '8');
  const initialSearch = searchParams.get('search') || '';
  const initialExperience = searchParams.getAll('experience');

  const [selectedExperience, setSelectedExperience] =
    useState<string[]>(initialExperience);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const pageSize = initialLimit;

  // RTK Query hook
  const { data, isLoading, error } = useGetPublicProfilesQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
    experience: selectedExperience,
  });

  console.log('data++++', data);

  // Update URL when parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('limit', pageSize.toString());
    if (searchQuery) params.set('search', searchQuery);
    selectedExperience.forEach((exp) => params.append('experience', exp));

    router.push(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchQuery, selectedExperience]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleExperienceChange = (experience: string[]) => {
    setSelectedExperience(experience);
    setCurrentPage(1); // Reset to first page on filter change
  };

  if (error) {
    return <div className="text-center py-8">Error loading developers</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader onSearch={handleSearch} initialValue={searchQuery} />
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
                onExperienceChange={handleExperienceChange}
              />
            )}
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[fit-content]">
              <DevelopersHeader
                totalDevelopers={data?.pagination.totalItems || 0}
                isFilterOpen={isFilterOpen}
                onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
            <div className="mt-6">
              {isLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <>
                  <div
                    className={`grid gap-6 ${
                      viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2'
                        : 'grid-cols-1 md:grid-cols-3'
                    }`}
                  >
                    {data?.data.map((profile) => (
                      <DeveloperCard key={profile.id} profile={profile} />
                    ))}
                  </div>
                  <DeveloperPagination
                    current={currentPage}
                    total={data?.pagination.totalItems || 0}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperInformation;
