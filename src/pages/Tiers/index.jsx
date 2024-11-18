import React, { useState } from 'react';
import { Table, Input, Button, Card, Space, Tag } from 'antd';
import { PlusOutlined, ReloadOutlined, SortAscendingOutlined, SettingOutlined } from '@ant-design/icons'; 
import { PageContainer } from '@ant-design/pro-layout';
import TierModal from './TierModal';
import { tierData } from '../../mocks/tierData'; // Mock data

const TierList = () => {
  const [data, setData] = useState(tierData);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view', 'edit', 'add'
  const [currentTier, setCurrentTier] = useState(null);

  // Handle search
  const handleSearch = () => {
    const filteredData = tierData.filter(tier =>
      tier.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredData);
  };

  // Open modal for details
  const handleViewDetails = (id) => {
    const tier = tierData.find(t => t.id === id);
    setCurrentTier(tier);
    setModalType('view');
    setIsModalVisible(true);
  };

  // Open modal for editing
  const handleEditTier = (id) => {
    const tier = tierData.find(t => t.id === id);
    setCurrentTier(tier);
    setModalType('edit');
    setIsModalVisible(true);
  };

  // Open modal for adding new tier
  const handleAddTier = () => {
    setCurrentTier(null); // Ensure no tier is selected
    setModalType('add');
    setIsModalVisible(true);
  };

  // Save changes for add/edit
  const handleSaveChanges = (values) => {
    if (modalType === 'add') {
      // Add new tier
      const newTier = { id: data.length + 1, ...values };
      setData([...data, newTier]);
    } else if (modalType === 'edit') {
      // Update selected tier
      const updatedData = data.map(tier =>
        tier.id === currentTier.id ? { ...tier, ...values } : tier
      );
      setData(updatedData);
    }
    setIsModalVisible(false);
    setCurrentTier(null);
  };

  // Columns for the table
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Required Points', dataIndex: 'requiredPoints', key: 'requiredPoints' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleViewDetails(record.id)}>View Details</Button>
          <Button type="link" onClick={() => handleEditTier(record.id)}>Edit</Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      {/* Card for Search */}
      <Card>
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ maxWidth: '20%', marginRight: 8 }}
        />
        <Button type="primary" onClick={handleSearch}>Search</Button>
      </Card>

      {/* Card for Table and Buttons */}
      <Card style={{ marginTop: 16 }}>
        <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2>Tier List</h2>
          <Space>
            {/* Add New Tier Button */}
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTier}>New</Button>
            {/* Sort, Reload, Settings Buttons */}
            <Button icon={<SortAscendingOutlined />} />
            <Button icon={<ReloadOutlined />} />
            <Button icon={<SettingOutlined />} />
          </Space>
        </Space>
        {/* Tier Data Table */}
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </Card>

      {/* Modal for View/Edit Tier */}
      <TierModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSaveChanges={handleSaveChanges}
        tier={currentTier}
        modalType={modalType}
      />
    </PageContainer>
  );
};

export default TierList;
