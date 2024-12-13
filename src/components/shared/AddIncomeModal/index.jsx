import React from "react";
import { Modal, Form, InputNumber, Input } from "antd";
import { useDispatch } from "react-redux";
import { addIncome } from "../../../state-management/slices/expenses";

const AddIncomeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(addIncome({ income: values.amount }));
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add Income"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add Income"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="amount"
          label="Income Amount"
          rules={[
            { required: true, message: "Please enter an income amount!" },
          ]}
        >
          <InputNumber
            placeholder="Enter income amount"
            style={{ width: "100%" }}
            min={0}
          />
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input placeholder="Enter a description (optional)" />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddIncomeModal;
