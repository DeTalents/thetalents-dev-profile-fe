import { Checkbox, Divider } from 'antd';
import { BadgeCheck } from 'lucide-react';

const experienceLevels = [
  { label: 'Fresh Graduate', value: 'fresh', count: 0 },
  { label: '1 - 2 Years', value: '1-2', count: 2 },
  { label: '3 - 5 Years', value: '3-5', count: 4 },
  { label: '6 - 8 Years', value: '6-8', count: 1 },
  { label: '9+ Years', value: '9+', count: 1 },
];

interface DeveloperFiltersProps {
  selectedExperience: string[];
  onExperienceChange: (experience: string[]) => void;
}

export const DeveloperFilters = ({
  selectedExperience,
  onExperienceChange,
}: DeveloperFiltersProps) => {
  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-800 flex items-center justify-between">
              Experience Level
              <span className="text-sm text-gray-500 font-normal">
                {selectedExperience.length} selected
              </span>
            </h3>
            <div className="grid gap-3">
              {experienceLevels.map((level) => (
                <div
                  key={level.value}
                  className={`relative flex items-center p-4 rounded-xl transition-all duration-200 ${
                    selectedExperience.includes(level.value)
                      ? 'bg-indigo-50 border-indigo-100'
                      : 'hover:bg-gray-50 border-transparent'
                  } border`}
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
                      <span className="ml-2 text-sm text-gray-500">
                        ({level.count})
                      </span>
                    </div>
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>

          <Divider className="bg-gray-100" />

          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-800">
              Skills
              <span className="text-sm text-gray-500 ml-1">(Coming soon)</span>
            </h3>
            <div className="p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">
                Skill filtering will be available soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
