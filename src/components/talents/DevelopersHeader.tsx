import { Button } from 'antd';
import { Filter, Grid, LayoutGrid, Users } from 'lucide-react';

interface DevelopersHeaderProps {
  totalDevelopers: number;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  viewMode: 'grid' | 'compact';
  onViewModeChange: (mode: 'grid' | 'compact') => void;
}

export const DevelopersHeader = ({
  totalDevelopers,
  isFilterOpen,
  onToggleFilter,
  viewMode,
  onViewModeChange,
}: DevelopersHeaderProps) => {
  return (
    <div className="sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type={isFilterOpen ? 'primary' : 'default'}
              icon={<Filter className="w-4 h-4" />}
              onClick={onToggleFilter}
              className="flex items-center gap-2"
            >
              Filters
              {isFilterOpen && <span className="text-xs">•</span>}
            </Button>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span className="font-medium">{totalDevelopers}</span>
              <span className="text-gray-500">Developers</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
            <Button
              type={viewMode === 'grid' ? 'primary' : 'text'}
              icon={<LayoutGrid className="w-4 h-4" />}
              onClick={() => onViewModeChange('grid')}
              className="flex items-center"
            />
            <Button
              type={viewMode === 'compact' ? 'primary' : 'text'}
              icon={<Grid className="w-4 h-4" />}
              onClick={() => onViewModeChange('compact')}
              className="flex items-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
