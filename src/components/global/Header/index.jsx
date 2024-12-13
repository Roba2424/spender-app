import { Button, Flex, Typography } from "antd";
import { ROUTE_CONSTANTS } from "../../../utils/constants";
import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import AuthProfileDropDown from "../../shared/AuthProfileDropDown";

const { Title } = Typography;
const Header = () => {
  const {
    authUserInfo: { isAuth, userData },
  } = useSelector((store) => store.userProfile);

  return (
    <div className="main-header">
      <Flex justify="space-between" align="center">
        <Title level={4} style={{ color: "#ffffff" }}>
          Spender App
        </Title>

        <div>
          {isAuth ? (
            <AuthProfileDropDown userProfileInfo={userData} />
          ) : (
            <Link to={ROUTE_CONSTANTS.LOGIN}>
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default Header;
