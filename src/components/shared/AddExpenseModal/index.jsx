import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  notification,
} from "antd";
import { useDispatch } from "react-redux";
import { addExpense } from "../../../state-management/slices/expenses";

const AddExpenseModal = ({ isModalOpen, setIsModalOpen, selectedCategory }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newExpense = {
        id: Date.now(),
        amount: values.amount,
        date: values.date.format("YYYY-MM-DD"),
        description: values.description,
      };

      dispatch(
        addExpense({
          category: selectedCategory,
          expense: newExpense,
        })
      );

      form.resetFields();
      setIsModalOpen(false);
    });
    notification.success({ message: "Expense added succesfully!" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add New Expense"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add Expense"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="category"
          label="Category"
          initialValue={selectedCategory}
        >
          <Select disabled>
            <Select.Option value={selectedCategory}>
              {selectedCategory}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please enter an amount!" }]}
        >
          <InputNumber
            placeholder="Enter amount"
            style={{ width: "100%" }}
            min={0}
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select a date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: false }]}
        >
          <Input placeholder="Enter a description (optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
