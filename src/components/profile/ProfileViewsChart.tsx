import { useGetProfileViewsQuery } from '@/features/api/profileApi';
import React, { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ViewRange = 'week' | 'month';

interface ProfileViewsChartProps {
  profileId: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ProfileViewsChart: React.FC<ProfileViewsChartProps> = ({ profileId }) => {
  const [viewRange, setViewRange] = useState<ViewRange>('week');

  const currentDateString = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const {
    data: profileViewsResponse,
    isLoading,
    error,
  } = useGetProfileViewsQuery({
    profileId,
    range: viewRange,
  });

  const viewsData =
    profileViewsResponse?.data.map((item) => ({
      ...item,
      views: parseInt(item.views, 10),
      formattedDate: formatDate(item.date),
    })) || [];

  const handleRangeChange = (range: ViewRange) => {
    setViewRange(range);
  };

  const totalViews = viewsData.reduce(
    (sum, item) =>
      sum +
      (typeof item.views === 'number'
        ? item.views
        : parseInt(item.views as string, 10)),
    0
  );

  const averageViews =
    viewsData.length > 0 ? (totalViews / viewsData.length).toFixed(1) : '0';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Profile Views</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleRangeChange('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              viewRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Last Week
          </button>
          <button
            onClick={() => handleRangeChange('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              viewRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Last Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Views</p>
          <p className="text-2xl font-bold text-gray-800">{totalViews}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Avg. Views/Day</p>
          <p className="text-2xl font-bold text-gray-800">{averageViews}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 h-64 flex items-center justify-center">
          {error instanceof Error
            ? error.message
            : 'Failed to fetch profile views data'}
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={viewsData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="formattedDate"
                tick={{ fontSize: 12 }}
                tickMargin={10}
                tickFormatter={(value) => value}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickMargin={10}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '0.375rem',
                  boxShadow:
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: 'none',
                  padding: '0.75rem',
                }}
                formatter={(value) => [`${value} views`, 'Views']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb', r: 4 }}
                activeDot={{ r: 6, fill: '#1e40af' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-4">
        Data shown for {viewRange === 'week' ? '7 days' : '30 days'} up to{' '}
        {currentDateString}
      </div>
    </div>
  );
};

export default ProfileViewsChart;
