import { useGetDeveloperProfileRecommendationsQuery } from '@/features/api/profileApi';
import { Button, List, Modal, Progress, Spin, Tag, Typography } from 'antd';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

interface ProfileCompletionCardProps {
  profileId: string;
}

export const ProfileCompletionCard = ({
  profileId,
}: ProfileCompletionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: profileData,
    isLoading,
    isError,
  } = useGetDeveloperProfileRecommendationsQuery(profileId);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Helper function to get color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'blue';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <BookOpen className="w-5 h-5 text-indigo-600 mr-2" /> Profile Completion
      </h3>
      <div className="space-y-3">
        {isLoading ? (
          <p>Loading completion percentage...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">
            Failed to load completion percentage.
          </p>
        ) : (
          <>
            <Progress
              percent={profileData?.currentPercentage}
              strokeColor="#4F46E5"
            />
            {profileData && profileData?.currentPercentage < 85 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">
                  Complete your profile to increase visibility
                </p>
                <Button
                  type="primary"
                  ghost
                  onClick={showModal}
                  className="text-xs self-start"
                  size="small"
                >
                  How to improve?
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <Modal
        title={
          <Title level={4} className="flex items-center">
            <CheckCircle className="text-indigo-600 mr-2" size={20} />
            Profile Improvement Recommendations
          </Title>
        }
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : isError ? (
          <Text type="danger">
            Failed to load recommendations. Please try again later.
          </Text>
        ) : (
          <div>
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Text strong>Current Completion:</Text>
                <Text>{profileData?.currentPercentage}%</Text>
              </div>
              <Progress
                percent={profileData?.currentPercentage}
                strokeColor="#4F46E5"
                status="active"
              />
              <div className="flex justify-between items-center mt-2">
                <Text strong>Potential Completion:</Text>
                <Text>{profileData?.potentialPercentage}%</Text>
              </div>
              <Progress
                percent={profileData?.potentialPercentage}
                strokeColor="#10B981"
                status="active"
              />
            </div>

            <Paragraph>
              Complete the following actions to improve your profile:
            </Paragraph>

            <List
              itemLayout="horizontal"
              dataSource={profileData?.recommendations || []}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <Tag color={getPriorityColor(item.priority)}>
                      +{item.percentageGain}%
                    </Tag>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Tag
                        color={getPriorityColor(item.priority)}
                        className="mt-1"
                      >
                        {item.priority}
                      </Tag>
                    }
                    title={<Text strong>{item.action}</Text>}
                    description={<Text type="secondary">{item.details}</Text>}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};
