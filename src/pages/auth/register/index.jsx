import { Button, Flex, Form, Input } from "antd";
import AuthWrapper from "../../../components/shared/AuthWrapper";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../service";
import { ROUTE_CONSTANTS } from "../../../utils/constants";
import { Link } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    const { firstName, lastName, email, password } = values;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper title="Sign Up">
      <Form layout="vertical" onFinish={handleRegister} form={form}>
        <Form.Item label="First Name" name="firstName">
          <Input type="text" placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input type="text" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          tooltip="minimum 6 symbol max 8"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            {
              //   pattern: regexpValidation,
              message: "Wrong password",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                }
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Flex justify="end" align="center">
          <Link to={ROUTE_CONSTANTS.LOGIN}>Sign in</Link>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Flex>
      </Form>
    </AuthWrapper>
  );
};

export default Register;
