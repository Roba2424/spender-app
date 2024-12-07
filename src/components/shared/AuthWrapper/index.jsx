import { Typography } from "antd";
import "./style.css";

const { Title } = Typography;

const AuthWrapper = ({ title, children }) => {
  return (
    <div className="auth-wrapper">
      <div className="form-container">
        <Title level={3}>{title}</Title>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
