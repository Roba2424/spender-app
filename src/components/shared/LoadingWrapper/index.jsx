import { Spin } from "antd";
import "./style.css";

const LoadingWrapper = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <div className="main-loading-container">
          <Spin size="large" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrapper;
