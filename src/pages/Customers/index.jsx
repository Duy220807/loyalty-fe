import React, { useState } from 'react';
import { Table, Input, Button, Card, Space, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ReloadOutlined, SortAscendingOutlined, SettingOutlined } from '@ant-design/icons'; // import các icon
import CustomerModal from './CustomerModal';
import { customerData } from '../../mocks/customerData';

const CustomerList = () => {
  const [data, setData] = useState(customerData);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view' or 'edit' or 'add'
  const [currentCustomer, setCurrentCustomer] = useState(null);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    const filteredData = customerData.filter(customer =>
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredData);
  };

  // Xử lý mở modal xem chi tiết
  const handleViewDetails = (id) => {
    const customer = customerData.find(c => c.id === id);
    setCurrentCustomer(customer);
    setModalType('view');
    setIsModalVisible(true);
  };

  // Xử lý mở modal chỉnh sửa
  const handleEditCustomer = (id) => {
    const customer = customerData.find(c => c.id === id);
    setCurrentCustomer(customer);
    setModalType('edit');
    setIsModalVisible(true);
  };

  // Xử lý mở modal thêm mới khách hàng
  const handleAddCustomer = () => {
    setCurrentCustomer(null); // Đảm bảo không có customer nào được chọn
    setModalType('add');
    setIsModalVisible(true);
  };

  // Lưu thay đổi khi chỉnh sửa hoặc thêm mới
  const handleSaveChanges = (values) => {
    if (modalType === 'add') {
      // Thêm khách hàng mới
      const newCustomer = { id: data.length + 1, ...values }; // Tạo id mới dựa trên độ dài hiện tại
      setData([...data, newCustomer]);
    } else if (modalType === 'edit') {
      // Cập nhật khách hàng đã chọn
      const updatedData = data.map(customer =>
        customer.id === currentCustomer.id ? { ...customer, ...values } : customer
      );
      setData(updatedData);
    }
    setIsModalVisible(false);
    setCurrentCustomer(null);
  };

  // Hàm để lấy màu sắc cho Membership Status
  const getMembershipStatusColor = (status) => {
    switch (status) {
      case 'Gold':
        return 'gold';  // Màu vàng
      case 'Silver':
        return 'silver'; // Màu bạc
      case 'Platinum':
        return 'blue';   // Màu xanh dương
      default:
        return 'gray';   // Màu mặc định
    }
  };

  // Cột cho bảng
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Birth Date', dataIndex: 'birthDate', key: 'birthDate' },
    {
      title: 'Membership Status',
      dataIndex: 'membershipStatus',
      key: 'membershipStatus',
      render: (membershipStatus) => (
        <Tag
          color={getMembershipStatusColor(membershipStatus)}
          style={{
            width: '100px',
            textAlign: 'center',  // Căn giữa văn bản trong Tag
            display: 'inline-block',
            justifyContent: 'center', // Căn giữa Tag theo chiều ngang
            margin: '0 auto', // Đảm bảo Tag nằm giữa
          }}
        >
          {membershipStatus}
        </Tag>
      ),
    },
    { title: 'Total Spent', dataIndex: 'totalSpent', key: 'totalSpent' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleViewDetails(record.id)}>View Details</Button>
          <Button type="link" onClick={() => handleEditCustomer(record.id)}>Edit</Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      {/* Card chứa Input và Button tìm kiếm */}
      <Card>
        <Input
          placeholder="Search by name or email"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ maxWidth: '20%', marginRight: 8 }}
        />
        <Button type="primary" onClick={handleSearch}>Search</Button>
      </Card>

      {/* Card chứa các nút và bảng */}
      <Card style={{ marginTop: 16 }}>
        <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2>Customer List</h2>
          <Space >
            {/* Nút thêm mới */}
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCustomer}>New</Button>
            {/* Các nút khác: Sort, Reload, Setting */}
            <Button icon={<SortAscendingOutlined />} />
            <Button icon={<ReloadOutlined />} />
            <Button icon={<SettingOutlined />} />
          </Space>
        </Space>
        {/* Bảng dữ liệu */}
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </Card>

      {/* Modal xem chi tiết hoặc chỉnh sửa */}
      <CustomerModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSaveChanges={handleSaveChanges}
        customer={currentCustomer}
        modalType={modalType}
      />
    </PageContainer>
  );
};

export default CustomerList;
