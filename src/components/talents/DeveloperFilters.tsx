import { experienceLevels } from '@/utils/constants';
import { Checkbox, Divider } from 'antd';
import { BadgeCheck } from 'lucide-react';

interface DeveloperFiltersProps {
  selectedExperience: string[];
  onExperienceChange: (experience: string[]) => void;
  position?: 'side' | 'top';
}

export const DeveloperFilters = ({
  selectedExperience,
  onExperienceChange,
  position = 'side',
}: DeveloperFiltersProps) => {
  const isHorizontal = position === 'top';

  return (
    <div className={`${isHorizontal ? 'p-0' : 'p-4'}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className={`${isHorizontal ? 'space-y-4' : 'space-y-8'}`}>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          </div>

          <div className={`${isHorizontal ? 'flex flex-col' : 'space-y-4'}`}>
            <div className={isHorizontal ? 'mb-4' : ''}>
              <h3 className="text-base font-medium text-gray-800 flex items-center justify-between">
                Experience Level
                <span className="text-sm text-gray-500 font-normal">
                  {selectedExperience.length} selected
                </span>
              </h3>
              <div
                className={`${
                  isHorizontal ? 'flex flex-wrap gap-3 mt-3' : 'grid gap-3'
                }`}
              >
                {experienceLevels.map((level) => (
                  <div
                    key={level.value}
                    className={`relative flex items-center p-4 rounded-xl transition-all duration-200 ${
                      selectedExperience.includes(level.value)
                        ? 'bg-indigo-50 border-indigo-100'
                        : 'hover:bg-gray-50 border-transparent'
                    } border ${isHorizontal ? 'flex-1 min-w-[180px]' : ''}`}
                  >
                    <Checkbox
                      value={level.value}
                      checked={selectedExperience.includes(level.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onExperienceChange([
                            ...selectedExperience,
                            level.value,
                          ]);
                        } else {
                          onExperienceChange(
                            selectedExperience.filter(
                              (exp) => exp !== level.value
                            )
                          );
                        }
                      }}
                      className="group"
                    >
                      <div className="ml-2">
                        <span className="text-gray-700 font-medium">
                          {level.label}
                        </span>
                      </div>
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>

            {!isHorizontal && <Divider className="bg-gray-100" />}

            {/* Skills Filter - when in horizontal mode, we can optionally hide this */}
            {!isHorizontal && (
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-800">
                  Skills
                  <span className="text-sm text-gray-500 ml-1">
                    (Coming soon)
                  </span>
                </h3>
                <div className="p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50">
                  <p className="text-sm text-gray-500 text-center">
                    Skill filtering will be available soon
                  </p>
                </div>
              </div>
            )}
            {/* If you want to include a simplified version of Skills filter in horizontal mode */}
            {isHorizontal && (
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-gray-800">Skills</h3>
                <span className="text-sm text-gray-500">(Coming soon)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
