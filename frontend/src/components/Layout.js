import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="main-content">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="content-wrapper">
          <div className="page-content">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Layout;
