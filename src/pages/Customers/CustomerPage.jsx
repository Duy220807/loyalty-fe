import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { customerData } from '../../mocks/customerData'; // Import mock data
import { PageContainer } from '@ant-design/pro-layout';

const { Option } = Select;

const CustomerPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL nếu có
  const [customer, setCustomer] = useState(null);

  // Tìm khách hàng theo ID nếu đang chỉnh sửa
  useEffect(() => {
    if (id) {
      const foundCustomer = customerData.find(c => c.customerId === id);
      setCustomer(foundCustomer);
      if (foundCustomer) {
        // Đặt lại giá trị form, xử lý khách hàng tierStatus dạng object
        form.setFieldsValue({
          ...foundCustomer,
          customerTierStatus: foundCustomer.customerTierStatus.tier,
          points: foundCustomer.customerTierStatus.points
        });
      }
    } else {
      form.resetFields(); // Nếu là trang thêm mới
    }
  }, [id, form]);

  // Lưu thay đổi hoặc thêm mới
  const handleSave = (values) => {
    const { customerTierStatus, points, ...rest } = values;
    const updatedCustomer = {
      ...rest,
      customerTierStatus: { tier: customerTierStatus, points: points || 0 },
    };

    if (id) {
      // Chỉnh sửa khách hàng
      const updatedData = customerData.map(customer =>
        customer.customerId === id ? { ...customer, ...updatedCustomer } : customer
      );
      // Cập nhật dữ liệu ở đây (thực tế sẽ gọi API)
    } else {
      // Thêm khách hàng mới
      const newCustomer = { customerId: `${customerData.length + 1}`, ...updatedCustomer };
      // Cập nhật dữ liệu ở đây (thực tế sẽ gọi API)
    }
    navigate('/customers/list'); // Quay lại danh sách khách hàng
  };

  const handleBack = () => {
    navigate('/customers/list'); // Quay lại trang danh sách khách hàng
  };

  return (
    <PageContainer>
      <Card style={{ margin: '0 auto' }}>
        <h2>{id ? 'Edit Customer' : 'Add New Customer'}</h2>
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Customer ID" name="customerId" rules={[{ required: true, message: 'Please enter the customer ID!' }]}>
                <Input disabled={id ? true : false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter the customer name!' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter the customer email!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone" name="phoneNumber" rules={[{ required: true, message: 'Please enter the customer phone!' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Membership Status" name="customerTierStatus" rules={[{ required: true, message: 'Please select the membership status!' }]}>
                <Select>
                  <Option value="Gold">Gold</Option>
                  <Option value="Silver">Silver</Option>
                  <Option value="Platinum">Platinum</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Points" name="points">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Birth Date" name="dob">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Join Date" name="joinDate">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Status" name="status">
                <Select>
                  <Option value="ACTIVE">Active</Option>
                  <Option value="INACTIVE">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <Button
              style={{
                marginRight: 8
              }}
              type="primary"
              htmlType="submit"
            >
              {id ? 'Save' : 'Add'}
            </Button>
            <Button onClick={handleBack}>
              Back
            </Button>
          </div>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CustomerPage;
