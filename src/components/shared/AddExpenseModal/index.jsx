import React from "react";
import { Modal, Form, Input, InputNumber, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseToFirebase } from "../../../state-management/slices/expenses";

const AddExpenseModal = ({ isModalOpen, setIsModalOpen, selectedCategory }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { authUserInfo } = useSelector((state) => state.userProfile);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const expense = {
        amount: values.amount,
        date: values.date.format("YYYY-MM-DD"),
        description: values.description || "",
      };
      const uid = authUserInfo.userData.uid;

      dispatch(
        addExpenseToFirebase({ uid, category: selectedCategory, expense })
      );
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add Expense"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add Expense"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
          <InputNumber placeholder="Enter amount" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input placeholder="Enter a description (optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
