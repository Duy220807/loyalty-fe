import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Select } from 'antd'; // Import Select
import { Pie, Bar } from '@ant-design/charts'; // Thêm Bar biểu đồ
import { UserOutlined, StarOutlined } from '@ant-design/icons'; // Import các icon từ @ant-design/icons
import { PageContainer } from '@ant-design/pro-layout';
import { customerData } from '../../mocks/customerData';

const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalTiers, setTotalTiers] = useState(0);
  const [chartType, setChartType] = useState('pie'); // Trạng thái cho loại biểu đồ

  useEffect(() => {
    setTotalCustomers(customerData.length);

    // Đếm số lượng các hạng thành viên
    const tiers = [...new Set(customerData.map(customer => customer.customerTierStatus.tier))];
    setTotalTiers(tiers.length);
  }, []);

  // Dữ liệu biểu đồ phân bố các hạng thành viên
  const tierDistribution = customerData.reduce((acc, customer) => {
    const tier = customer.customerTierStatus.tier;
    const existing = acc.find(item => item.name === tier);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: tier, value: 1 });
    }
    return acc;
  }, []);

  const pieConfig = {
    appendPadding: 10,
    data: tierDistribution,
    angleField: 'value',
    colorField: 'name',
    radius: 0.8,
    label: {
      type: 'spider',
      content: '{name}: {value}',
    },
    interactions: [{ type: 'element-active' }],
  };

  const barConfig = {
    data: tierDistribution,
    xField: 'name',
    yField: 'value',
    label: {
      position: 'middle',
      style: { fill: '#fff', opacity: 0.6 },
    },
    colorField: 'name',
    interactions: [{ type: 'element-active' }],
  };

  // Hàm xử lý thay đổi loại biểu đồ
  const handleChartTypeChange = value => {
    setChartType(value);
  };

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Customers"
              value={totalCustomers}
              prefix={<UserOutlined />} // Sử dụng icon UserOutlined
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Tiers"
              value={totalTiers}
              prefix={<StarOutlined />} // Sử dụng icon StarOutlined
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Dropdown chọn loại biểu đồ */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Select
            defaultValue="pie"
            style={{ width: 200 }}
            onChange={handleChartTypeChange}
            options={[
              { label: 'Pie Chart', value: 'pie' },
              { label: 'Bar Chart', value: 'bar' },
            ]}
          />
        </Col>
      </Row>

      {/* Thêm Biểu Đồ */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Tier Distribution">
            {chartType === 'pie' ? (
              <Pie {...pieConfig} />
            ) : (
              <Bar {...barConfig} />
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
