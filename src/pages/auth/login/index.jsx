import { Button, Flex, Form, Input, notification } from "antd";
import AuthWrapper from "../../../components/shared/AuthWrapper";
import { useState } from "react";
import { auth } from "../../../service/index";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      notification.error({
        message: "Invalid Login Credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper title="Sing In">
      <Form layout="vertical" form={form} onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
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
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Flex justify="end" align="center">
          {/* <Link to={ROUTE_CONSTANTS.REGISTER}>Create Account</Link> */}
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign in
          </Button>
        </Flex>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
