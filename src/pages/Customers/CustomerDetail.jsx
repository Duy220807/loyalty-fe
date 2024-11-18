import React from 'react';
import { Card, Space, Tag, Typography, Divider, Button, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { customerData } from '../../mocks/customerData';  // Import mock data

const { Title, Text } = Typography;

const CustomerDetailPage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();

  // Tìm khách hàng dựa trên ID từ mockdata
  const customer = customerData.find((customer) => customer.customerId === id);

  // Nếu không tìm thấy khách hàng, hiển thị thông báo lỗi
  if (!customer) {
    return (
      <PageContainer>
        <Card>
          <Title level={3}>Customer not found</Title>
        </Card>
      </PageContainer>
    );
  }

  // Hàm để lấy màu sắc cho Membership Status
  const getMembershipStatusColor = (status) => {
    switch (status) {
      case 'Platinum':
        return 'blue';
      case 'Gold':
        return 'gold';
      case 'Silver':
        return 'silver';
      default:
        return 'gray';
    }
  };

  return (
    <PageContainer>
      <Row gutter={24}>
        {/* Card bên trái chứa thông tin chi tiết */}
        <Col xs={24} sm={12} md={16}>
          <Card title={<Title level={3}>{`Customer Details - ${customer.fullName}`}</Title>}>
            <Space direction="vertical" style={{ width: '100%' }}>

              {/* Customer ID */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Customer ID: </Text></Col>
                <Col span={16}><Text>{customer.customerId}</Text></Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

              {/* Full Name */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Full Name: </Text></Col>
                <Col span={16}><Text>{customer.fullName}</Text></Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

              {/* Membership Status */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Membership Status: </Text></Col>
                <Col span={16}>
                  <Tag
                    style={{
                      width: '100px',
                      textAlign: 'center',
                      display: 'inline-block',
                      margin: '0 auto',
                    }}
                    color={getMembershipStatusColor(customer.customerTierStatus?.tier)}>
                    {customer.customerTierStatus?.tier}
                  </Tag>
                </Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

              {/* Points */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Points: </Text></Col>
                <Col span={16}><Text>{customer.customerTierStatus?.points}</Text></Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

              {/* Email */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Email: </Text></Col>
                <Col span={16}><Text>{customer.email}</Text></Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

              {/* Phone Number */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Phone: </Text></Col>
                <Col span={16}><Text>{customer.phoneNumber}</Text></Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

              {/* Date of Birth */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Birth Date: </Text></Col>
                <Col span={16}><Text>{customer.dob}</Text></Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

              {/* Join Date */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Join Date: </Text></Col>
                <Col span={16}><Text>{customer.joinDate}</Text></Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

              {/* Status */}
              <Row gutter={16}>
                <Col span={8}><Text strong>Status: </Text></Col>
                <Col span={16}><Text>{customer.status}</Text></Col>
              </Row>
              <Divider style={{ borderColor: '#e0e0e0', margin: '8px 0' }} />

            </Space>

            {/* Nút Back và Edit ở góc phải */}
            <div style={{ textAlign: 'right', marginTop: 20 }}>
              <Space>
                <Button onClick={() => navigate('/customers/list')}>Back</Button>
                <Button type="primary" onClick={() => navigate(`/customer/edit/${customer.customerId}`)}>Edit</Button>
              </Space>
            </div>
          </Card>
        </Col>

        {/* Card bên phải chứa thông tin Services */}
        <Col xs={24} sm={12} md={8}>
          <Card title="Services">
            <Space direction="vertical" style={{ width: '100%' }}>
              {customer.services?.length > 0 ? (
                customer.services.map((service, index) => (
                  <Row key={index} gutter={16}>
                    <Col span={24}>
                      <Text strong>{service.name}: </Text>
                      <Text>{service.details}</Text>
                    </Col>
                  </Row>
                ))
              ) : (
                <Text>No services available</Text>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default CustomerDetailPage;
