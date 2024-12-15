import React from "react";
import { Modal, Form, InputNumber, Input, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addIncomeToFirebase } from "../../../state-management/slices/expenses";

const AddIncomeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { authUserInfo } = useSelector((state) => state.userProfile);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const income = {
        amount: values.amount,
        createdAt: new Date().toISOString(),
        date: values.date.format("YYYY-MM-DD"),
        description: values.description || "",
      };
      const uid = authUserInfo.userData.uid;

      dispatch(addIncomeToFirebase({ uid, income }));
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
          />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input placeholder="Enter a description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddIncomeModal;
