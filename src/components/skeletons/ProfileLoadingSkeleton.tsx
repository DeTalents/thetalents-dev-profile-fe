import { Card, Col, Row, Skeleton } from 'antd';

const ProfileLoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb and Back Button Skeleton */}
      <div className="mb-6">
        <Skeleton.Button
          active
          size="small"
          style={{ width: 200, marginBottom: 16 }}
        />
        <Skeleton.Button active size="small" style={{ width: 120 }} />
      </div>

      <Row gutter={24}>
        {/* Left Sidebar Skeleton */}
        <Col xs={24} md={8}>
          <Card>
            <div className="text-center mb-6">
              <Skeleton.Avatar
                active
                size={80}
                style={{ margin: '0 auto 16px' }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{ width: 150, margin: '0 auto 8px' }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{ width: 100, margin: '0 auto' }}
              />
            </div>

            {/* Contact Info Skeleton */}
            <div className="mb-6">
              <Skeleton.Input
                active
                size="small"
                style={{ width: '100%', marginBottom: 8 }}
              />
              <Skeleton.Input active size="small" style={{ width: '100%' }} />
            </div>

            {/* Skills Skeleton */}
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 60, marginBottom: 8 }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton.Button
                    active
                    size="small"
                    key={i}
                    style={{ width: 60 }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* Main Content Skeleton */}
        <Col xs={24} md={16}>
          {/* About Section */}
          <Card style={{ marginBottom: 24 }}>
            <Skeleton active paragraph={{ rows: 3 }} />
          </Card>

          {/* Experience Section */}
          <Card style={{ marginBottom: 24 }}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>

          {/* References Section */}
          <Card>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Skeleton active paragraph={{ rows: 2 }} />
              </Col>
              <Col xs={24} sm={12}>
                <Skeleton active paragraph={{ rows: 2 }} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
);

export default ProfileLoadingSkeleton;
