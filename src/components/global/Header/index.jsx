import { Button, Flex } from "antd";
import { ROUTE_CONSTANTS } from "../../../utils/constants";
import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import AuthProfileDropDown from "../../shared/AuthProfileDropDown";

const Header = () => {
  const {
    authUserInfo: { isAuth, userData },
  } = useSelector((store) => store.userProfile);

  return (
    <div className="main-header">
      <Flex justify="space-between" align="center">
        <p>Spender App</p>

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
