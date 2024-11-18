import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Tag } from 'antd';

const { Option } = Select;

const TransactionModal = ({ visible, onCancel, onSaveChanges, transaction, modalType }) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);

  // Set initial values for form when modal is opened
  useEffect(() => {
    if (transaction && modalType !== 'add') {
      setInitialValues(transaction);
      form.setFieldsValue(transaction);
    } else {
      setInitialValues(null);
    }
  }, [transaction, modalType, form]);

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        onSaveChanges(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title={modalType === 'add' ? 'Add New Transaction' : `Transaction ID: ${transaction?.id}`}
      onCancel={onCancel}
      onOk={handleSave}
      width={600}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSave}>Save</Button>
      ]}
    >
      <Form
        form={form}
        name="transactionForm"
        initialValues={initialValues}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="Transaction ID"
          name="id"
          rules={[{ required: true, message: 'Please input the transaction ID!' }]}
        >
          <Input disabled={modalType === 'view'} />
        </Form.Item>
        <Form.Item
          label="Customer ID"
          name="customerId"
          rules={[{ required: true, message: 'Please input the customer ID!' }]}
        >
          <Input disabled={modalType === 'view'} />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please input the transaction type!' }]}
        >
          <Input disabled={modalType === 'view'} />
        </Form.Item>
        <Form.Item
          label="Points"
          name="points"
          rules={[{ required: true, message: 'Please input the points!' }]}
        >
          <InputNumber min={0} disabled={modalType === 'view'} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select disabled={modalType === 'view'}>
            <Option value="Completed">Completed</Option>
            <Option value="Pending">Pending</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionModal;
