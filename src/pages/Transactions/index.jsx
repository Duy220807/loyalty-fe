import React, { useState } from 'react';
import { Table, Input, Button, Card, Space, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ReloadOutlined, SortAscendingOutlined, SettingOutlined } from '@ant-design/icons'; // import các icon
import { transactionData } from '../../mocks/transactionData'; // Dữ liệu mock Transaction
import TransactionModal from './TransactionModal'; // Modal cho Transaction

const Transactions = () => {
  const [data, setData] = useState(transactionData);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view' or 'edit'
  const [currentTransaction, setCurrentTransaction] = useState(null);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    const filteredData = transactionData.filter(transaction =>
      transaction.id.toString().includes(searchText) ||
      transaction.status.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredData);
  };

  // Xử lý mở modal xem chi tiết
  const handleViewDetails = (id) => {
    const transaction = transactionData.find(t => t.id === id);
    setCurrentTransaction(transaction);
    setModalType('view');
    setIsModalVisible(true);
  };

  // Xử lý mở modal chỉnh sửa
  const handleEditTransaction = (id) => {
    const transaction = transactionData.find(t => t.id === id);
    setCurrentTransaction(transaction);
    setModalType('edit');
    setIsModalVisible(true);
  };

  // Xử lý mở modal thêm mới giao dịch
  const handleAddTransaction = () => {
    setCurrentTransaction(null); // Đảm bảo không có giao dịch nào được chọn
    setModalType('add');
    setIsModalVisible(true);
  };

  // Lưu thay đổi khi chỉnh sửa hoặc thêm mới
  const handleSaveChanges = (values) => {
    if (modalType === 'add') {
      // Thêm giao dịch mới
      const newTransaction = { id: data.length + 1, ...values }; // Tạo id mới dựa trên độ dài hiện tại
      setData([...data, newTransaction]);
    } else if (modalType === 'edit') {
      // Cập nhật giao dịch đã chọn
      const updatedData = data.map(transaction =>
        transaction.id === currentTransaction.id ? { ...transaction, ...values } : transaction
      );
      setData(updatedData);
    }
    setIsModalVisible(false);
    setCurrentTransaction(null);
  };

  // Cột cho bảng Transactions
  const columns = [
    { title: 'Transaction ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer ID', dataIndex: 'customerId', key: 'customerId' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Points', dataIndex: 'points', key: 'points' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={status === 'Completed' ? 'green' : 'orange'}
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
          <Button type="link" onClick={() => handleEditTransaction(record.id)}>Edit</Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      {/* Card chứa Input và Button tìm kiếm */}
      <Card style={{ marginBottom: 16 }}>
        
          <Input
            placeholder="Search by Transaction ID or Status"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ maxWidth: '20%', marginRight: 8 }}
          />
          <Button type="primary" onClick={handleSearch}>Search</Button>
       
      </Card>

      {/* Card chứa các nút và bảng */}
      <Card>
        <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2>Transactions List</h2>
          <Space>
            {/* Nút thêm mới */}
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTransaction}>New</Button>
            {/* Các nút khác: Sort, Reload, Setting */}
            <Button icon={<SortAscendingOutlined />} />
            <Button icon={<ReloadOutlined />} />
            <Button icon={<SettingOutlined />} />
          </Space>
        </Space>
        {/* Bảng dữ liệu */}
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </Card>

      {/* Modal xem chi tiết hoặc chỉnh sửa giao dịch */}
      <TransactionModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSaveChanges={handleSaveChanges}
        transaction={currentTransaction}
        modalType={modalType}
      />
    </PageContainer>
  );
};

export default Transactions;
