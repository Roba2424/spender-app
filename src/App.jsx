import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import "./components/global/style.css";
import LoadingWrapper from "./components/shared/LoadingWrapper";
import { ROUTE_CONSTANTS } from "./utils/constants";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/layout/main";
import Cabinet from "./pages/auth/cabinet";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileInfo } from "./state-management/slices/userProfile";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const {
    loading,
    authUserInfo: { isAuth },
  } = useSelector((store) => store.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfileInfo());
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
              <Route
                path={ROUTE_CONSTANTS.LOGIN}
                element={
                  isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />
                }
              />
              <Route
                path={ROUTE_CONSTANTS.REGISTER}
                element={
                  isAuth ? (
                    <Navigate to={ROUTE_CONSTANTS.CABINET} />
                  ) : (
                    <Register />
                  )
                }
              />
              <Route path={ROUTE_CONSTANTS.CABINET} element={<Cabinet />} />
            </Route>
          )
        )}
      />
    </LoadingWrapper>
  );
}

export default App;
