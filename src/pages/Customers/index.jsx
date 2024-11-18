import React, { useState } from 'react';
import { Table, Input, Button, Card, Space, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ReloadOutlined, SortAscendingOutlined, SettingOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { customerData } from '../../mocks/customerData';

const CustomerList = () => {
  const [data, setData] = useState(customerData);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const filteredData = customerData.filter(customer =>
      customer.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredData);
  };

  const handleAddCustomer = () => {
    navigate('/customer/add');
  };

  const handleEditCustomer = (id) => {
    navigate(`/customer/edit/${id}`);
  };

  const handleViewDetails = (id) => {
    window.open(`/customer/detail/${id}`, '_blank');
  };

  const getMembershipStatusColor = (status) => {
    switch (status) {
      case 'Gold':
        return 'gold';
      case 'Silver':
        return 'silver';
      case 'Platinum':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'customerId', key: 'customerId', align: 'center' },
    { title: 'Name', dataIndex: 'fullName', key: 'fullName', align: 'center' },
    { title: 'Email', dataIndex: 'email', key: 'email', align: 'center' },
    { title: 'Phone', dataIndex: 'phoneNumber', key: 'phoneNumber', align: 'center' },
    { title: 'Birth Date', dataIndex: 'dob', key: 'dob', align: 'center' },
    { title: 'Join Date', dataIndex: 'joinDate', key: 'joinDate', align: 'center' },
    {
      title: 'Membership Status',
      dataIndex: 'customerTierStatus',
      key: 'customerTierStatus',
      align: 'center',
      render: (customerTierStatus) => (
        <Tag
          color={getMembershipStatusColor(customerTierStatus?.tier)}
          style={{
            width: '100px',
            textAlign: 'center',
            display: 'inline-block',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          {customerTierStatus?.tier}
        </Tag>
      ),
    },
    { title: 'Points', dataIndex: 'customerTierStatus', key: 'points', align: 'center', render: (customerTierStatus) => customerTierStatus?.points },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={(e) => { e.stopPropagation(); handleEditCustomer(record.customerId); }}
            title="Edit"
            style={{ cursor: 'pointer' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Space>
          <Input
            placeholder="Search by name or email"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          />
        </Space>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2>Customer List</h2>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCustomer} />
            <Button icon={<SortAscendingOutlined />} style={{ cursor: 'pointer' }} />
            <Button icon={<ReloadOutlined />} style={{ cursor: 'pointer' }} />
            <Button icon={<SettingOutlined />} style={{ cursor: 'pointer' }} />
          </Space>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({
            onClick: (e) => {
              if (window.getSelection().toString() !== '') {
                return;
              }
              handleViewDetails(record.customerId);
            },
            style: { cursor: 'pointer' },
          })}
        />
      </Card>
    </PageContainer>
  );
};

export default CustomerList;
