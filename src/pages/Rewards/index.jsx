import React, { useState } from 'react';
import { Table, Input, Button, Card, Space, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ReloadOutlined, SortAscendingOutlined, SettingOutlined } from '@ant-design/icons'; // import các icon
import RewardModal from './RewardModal'; // Modal cho Reward
import { rewardsData } from '../../mocks/rewardsData'; // Dữ liệu mock Rewards

const RewardsList = () => {
  const [data, setData] = useState(rewardsData);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view' or 'edit' or 'add'
  const [currentReward, setCurrentReward] = useState(null);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    const filteredData = rewardsData.filter(reward =>
      reward.name.toLowerCase().includes(searchText.toLowerCase()) ||
      reward.status.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredData);
  };

  // Xử lý mở modal xem chi tiết
  const handleViewDetails = (id) => {
    const reward = rewardsData.find(r => r.id === id);
    setCurrentReward(reward);
    setModalType('view');
    setIsModalVisible(true);
  };

  // Xử lý mở modal chỉnh sửa
  const handleEditReward = (id) => {
    const reward = rewardsData.find(r => r.id === id);
    setCurrentReward(reward);
    setModalType('edit');
    setIsModalVisible(true);
  };

  // Xử lý mở modal thêm mới phần thưởng
  const handleAddReward = () => {
    setCurrentReward(null); // Đảm bảo không có phần thưởng nào được chọn
    setModalType('add');
    setIsModalVisible(true);
  };

  // Lưu thay đổi khi chỉnh sửa hoặc thêm mới
  const handleSaveChanges = (values) => {
    if (modalType === 'add') {
      // Thêm phần thưởng mới
      const newReward = { id: data.length + 1, ...values }; // Tạo id mới dựa trên độ dài hiện tại
      setData([...data, newReward]);
    } else if (modalType === 'edit') {
      // Cập nhật phần thưởng đã chọn
      const updatedData = data.map(reward =>
        reward.id === currentReward.id ? { ...reward, ...values } : reward
      );
      setData(updatedData);
    }
    setIsModalVisible(false);
    setCurrentReward(null);
  };

  // Cột cho bảng Rewards
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Points Required', dataIndex: 'pointsRequired', key: 'pointsRequired' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={status === 'Active' ? 'green' : 'red'}
          style={{
            width: '100px',
            textAlign: 'center',  // Căn giữa văn bản trong Tag
            display: 'inline-block',
            justifyContent: 'center', // Căn giữa Tag theo chiều ngang
            margin: '0 auto', // Đảm bảo Tag nằm giữa
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleViewDetails(record.id)}>View Details</Button>
          <Button type="link" onClick={() => handleEditReward(record.id)}>Edit</Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      {/* Card chứa Input và Button tìm kiếm */}
      <Card>
        <Input
          placeholder="Search by name or status"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ maxWidth: '20%', marginRight: 8 }}
        />
        <Button type="primary" onClick={handleSearch}>Search</Button>
      </Card>

      {/* Card chứa các nút và bảng */}
      <Card style={{ marginTop: 16 }}>
        <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2>Rewards List</h2>
          <Space >
            {/* Nút thêm mới */}
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddReward}>New</Button>
            {/* Các nút khác: Sort, Reload, Setting */}
            <Button icon={<SortAscendingOutlined />} />
            <Button icon={<ReloadOutlined />} />
            <Button icon={<SettingOutlined />} />
          </Space>
        </Space>
        {/* Bảng dữ liệu */}
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </Card>

      {/* Modal xem chi tiết hoặc chỉnh sửa phần thưởng */}
      <RewardModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSaveChanges={handleSaveChanges}
        reward={currentReward}
        modalType={modalType}
      />
    </PageContainer>
  );
};

export default RewardsList;
