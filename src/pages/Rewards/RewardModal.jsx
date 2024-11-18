import React, { useEffect } from 'react';
import { Modal, Input, Button, Form, Select, InputNumber, Tag } from 'antd';

const { Option } = Select;

const RewardModal = ({ visible, onCancel, onSaveChanges, reward, modalType }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (modalType === 'edit' && reward) {
      form.setFieldsValue(reward);
    } else if (modalType === 'add') {
      form.resetFields();
    }
  }, [modalType, reward, form]);

  const handleSave = () => {
    form.validateFields().then(values => {
      onSaveChanges(values);
    });
  };

  const handleCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  const rewardData = reward || {};

  return (
    <Modal
      visible={visible}
      title={modalType === 'view' ? 'View Reward Details' : modalType === 'edit' ? 'Edit Reward Details' : 'Add New Reward'}
      onCancel={handleCloseModal}
      footer={[
        <Button key="cancel" onClick={handleCloseModal}>Cancel</Button>,
        modalType !== 'view' && <Button key="save" type="primary" onClick={handleSave}>{modalType === 'add' ? 'Add Reward' : 'Save Changes'}</Button>
      ]}
    >
      <Form
        form={form}
        initialValues={rewardData}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item label="Reward Name" name="name" rules={[{ required: true, message: 'Please enter the reward name!' }]}>
          <Input disabled={modalType === 'view'} />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description!' }]}>
          <Input.TextArea disabled={modalType === 'view'} />
        </Form.Item>

        <Form.Item label="Points Required" name="pointsRequired" rules={[{ required: true, message: 'Please enter the points required!' }]}>
          <InputNumber min={0} disabled={modalType === 'view'} />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select the status!' }]}>
          {modalType === 'view' ? (
            <Tag
            style={{
              width: '100px',
              textAlign: 'center',  // Căn giữa văn bản trong Tag
              display: 'inline-block',
              justifyContent: 'center', // Căn giữa Tag theo chiều ngang
              margin: '0 auto', // Đảm bảo Tag nằm giữa
            }}
            color={rewardData.status === 'Active' ? 'green' : 'red'}>
              {rewardData.status}
            </Tag>
          ) : (
            <Select defaultValue={rewardData.status} disabled={modalType === 'view'}>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Reward Value" name="rewardValue">
          <Input disabled={modalType === 'view'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RewardModal;
