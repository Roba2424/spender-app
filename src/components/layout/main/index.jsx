import { Outlet } from "react-router-dom";
import Header from "../../global/Header";

const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
