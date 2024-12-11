import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import "./components/global/style.css";
import LoadingWrapper from "./components/shared/LoadingWrapper";
import { ROUTE_CONSTANTS } from "./utils/constants";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/layout/main";
import Cabinet from "./pages/auth/cabinet";

function App() {
  return (
    <LoadingWrapper>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
              <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />
              <Route path={ROUTE_CONSTANTS.REGISTER} element={<Register />} />
              <Route path={ROUTE_CONSTANTS.CABINET} element={<Cabinet />} />
            </Route>
          )
        )}
      />
    </LoadingWrapper>
  );
}

export default App;
