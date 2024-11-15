import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form, Select, Tag } from 'antd';

const { Option } = Select;

const CustomerModal = ({ visible, onCancel, onSaveChanges, customer, modalType }) => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  // Hàm để lấy danh sách tỉnh thành
  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
      const data = await response.json();
      if (data.error === 0) {
        setProvinces(data.data);
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  // Hàm lấy danh sách quận huyện theo tỉnh thành
  const fetchDistricts = async (provinceId) => {
    try {
      const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
      const data = await response.json();
      if (data.error === 0) {
        setDistricts(data.data);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // Hàm lấy danh sách phường xã theo quận huyện
  const fetchWards = async (districtId) => {
    try {
      const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
      const data = await response.json();
      if (data.error === 0) {
        setWards(data.data);
      }
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
      setDistricts([]); // Reset districts khi thay đổi province
      setWards([]); // Reset wards khi thay đổi province
      setSelectedDistrict(null); // Reset district đã chọn
      setSelectedWard(null); // Reset ward đã chọn
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
      setWards([]); // Reset wards khi thay đổi district
      setSelectedWard(null); // Reset ward đã chọn
    }
  }, [selectedDistrict]);

  useEffect(() => {
    // Nếu modal mở và có customer, cập nhật lại các giá trị
    if (modalType === 'edit' && customer) {
      form.setFieldsValue(customer);
      setSelectedProvince(customer.province);
      setSelectedDistrict(customer.district);
      setSelectedWard(customer.ward);
    } else if (modalType === 'add') {
      // Reset dữ liệu khi mở modal thêm mới
      form.resetFields();
      setSelectedProvince(null);
      setSelectedDistrict(null);
      setSelectedWard(null);
      setDistricts([]);
      setWards([]);
    }
  }, [modalType, customer, form]);

  const handleSave = () => {
    form.validateFields().then(values => {
      onSaveChanges({
        ...values,
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
      });
    });
  };

  const handleCloseModal = () => {
    // Reset lại form và state khi đóng modal
    form.resetFields(); // Đặt lại form
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts([]); // Reset lại danh sách quận huyện
    setWards([]); // Reset lại danh sách phường xã
    onCancel(); // Gọi onCancel để đóng modal
  };

  // Kiểm tra xem customer có dữ liệu không
  const customerData = customer || {};

  return (
    <Modal
      visible={visible}
      title={modalType === 'view' ? 'View Customer Details' : modalType === 'edit' ? 'Edit Customer Details' : 'Add New Customer'}
      onCancel={handleCloseModal} // Đóng modal và reset dữ liệu khi đóng
      footer={[
        <Button key="cancel" onClick={handleCloseModal}>Cancel</Button>,
        modalType !== 'view' && <Button key="save" type="primary" onClick={handleSave}>{modalType === 'add' ? 'Add Customer' : 'Save Changes'}</Button>
      ]}
    >
      <Form
        form={form}
        initialValues={customerData}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the customer name!' }]}>
          <Input disabled={modalType === 'view'} />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter the customer email!' }]}>
          <Input disabled={modalType === 'view'} />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please enter the customer phone!' }]}>
          <Input disabled={modalType === 'view'} />
        </Form.Item>

        <Form.Item label="Birth Date" name="birthDate">
          <Input disabled={modalType === 'view'} />
        </Form.Item>

        {/* Thay đổi ở đây: Address */}
        <Form.Item label="Tỉnh Thành" name="tinh" rules={[{ required: true, message: 'Please select a province!' }]}>
          <Select
            value={selectedProvince}
            onChange={value => setSelectedProvince(value)}
            disabled={modalType === 'view'}
          >
            <Option value={null}>Chọn Tỉnh Thành</Option>
            {provinces.map(province => (
              <Option key={province.id} value={province.id}>{province.full_name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Quận Huyện" name="quan" rules={[{ required: true, message: 'Please select a district!' }]}>
          <Select
            value={selectedDistrict}
            onChange={value => setSelectedDistrict(value)}
            disabled={modalType === 'view' || !selectedProvince}
          >
            <Option value={null}>Chọn Quận Huyện</Option>
            {districts.map(district => (
              <Option key={district.id} value={district.id}>{district.full_name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Phường Xã" name="phuong" rules={[{ required: true, message: 'Please select a ward!' }]}>
          <Select
            value={selectedWard}
            onChange={value => setSelectedWard(value)}
            disabled={modalType === 'view' || !selectedDistrict}
          >
            <Option value={null}>Chọn Phường Xã</Option>
            {wards.map(ward => (
              <Option key={ward.id} value={ward.id}>{ward.full_name}</Option>
            ))}
          </Select>
        </Form.Item>

        {/* Các trường khác */}
        <Form.Item label="Membership Status" name="membershipStatus" rules={[{ required: true, message: 'Please select the membership status!' }]}>
          {modalType === 'view' ? (
            <Tag color={customerData.membershipStatus === 'Gold' ? 'gold' : customerData.membershipStatus === 'Silver' ? 'silver' : 'blue'}>
              {customerData.membershipStatus}
            </Tag>
          ) : (
            <Select defaultValue={customerData.membershipStatus} disabled={modalType === 'view'}>
              <Option value="Gold">Gold</Option>
              <Option value="Silver">Silver</Option>
              <Option value="Platinum">Platinum</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Total Spent" name="totalSpent">
          <Input disabled={modalType === 'view'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerModal;
