import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber } from 'antd';

const TierModal = ({ visible, onCancel, onSaveChanges, tier, modalType }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (modalType !== 'add') {
      form.setFieldsValue(tier); // Populate form for view or edit
    }
  }, [tier, modalType, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSaveChanges(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={modalType === 'add' ? 'Add Tier' : modalType === 'edit' ? 'Edit Tier' : 'View Tier'}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        modalType !== 'view' && (
          <Button key="save" type="primary" onClick={handleSubmit}>
            Save
          </Button>
        ),
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tier Name"
          rules={[{ required: true, message: 'Please input the tier name!' }]}
        >
          <Input disabled={modalType === 'view'} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input a description!' }]}
        >
          <Input.TextArea disabled={modalType === 'view'} />
        </Form.Item>
        <Form.Item
          name="requiredPoints"
          label="Required Points"
          rules={[{ required: true, message: 'Please input the required points!' }]}
        >
          <InputNumber disabled={modalType === 'view'} min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TierModal;
