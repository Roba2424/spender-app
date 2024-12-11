import { Button, Flex } from "antd";
import { ROUTE_CONSTANTS } from "../../../utils/constants";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <div className="main-header">
      <Flex justify="space-between" align="center">
        <p>Spender App</p>

        <div>
          <Link to={ROUTE_CONSTANTS.LOGIN}>
            <Button>Sign in</Button>
          </Link>
        </div>
      </Flex>
    </div>
  );
};

export default Header;
