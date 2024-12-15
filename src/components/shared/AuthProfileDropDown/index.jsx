import { Avatar, Dropdown, Flex, theme, Typography } from "antd";
import { signOut } from "firebase/auth";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTE_CONSTANTS } from "../../../utils/constants";
import { auth } from "../../../service/index";
import { setIsAuth } from "../../../state-management/slices/userProfile";

const { useToken } = theme;
const { Text } = Typography;

const getFullNameLetters = ({ firstName, lastName }) => {
  if (firstName && lastName) {
    return `${firstName[0]}  ${lastName[0]}`;
  }
};

const AuthProfileDropDown = ({ userProfileInfo }) => {
  const { token } = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalIncome, totalExpense, balance } = useSelector(
    (state) => state.expenses.balanceSheet
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setIsAuth(false));
      navigate(ROUTE_CONSTANTS.LOGIN);
    } catch (error) {}
  };

  const items = [
    {
      label: "Cabinet",
      key: 1,
      onClick: () => navigate(ROUTE_CONSTANTS.CABINET),
    },
    {
      label: "Logout",
      key: 2,
      onClick: handleSignOut,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      dropdownRender={(menu) => {
        return (
          <div
            className="profile-dropdown-container"
            style={{
              borderRadius: token.borderRadiusLG,
              backgroundColor: token.colorBgElevated,
              boxShadow: token.boxShadowSecondary,
            }}
          >
            <Flex vertical align="center" style={{ padding: token.sizeXS }}>
              <Avatar
                className="user-profile-avatar"
                size="large"
                src={userProfileInfo.imgUrl}
              />
              <Text>
                {userProfileInfo.firstName} {userProfileInfo.lastName}
              </Text>
              <Text>{userProfileInfo.email}</Text>

              <Text strong level={3}>Balance {balance}$</Text>
              <Text>Total income {totalIncome}$</Text>
              <Text>Total expense {totalExpense}$</Text>
            </Flex>
            {menu}
          </div>
        );
      }}
    >
      <Avatar size="large" className="user-profile-avatar">
        {getFullNameLetters(userProfileInfo)}
      </Avatar>
    </Dropdown>
  );
};

export default AuthProfileDropDown;
