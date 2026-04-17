import { NavLink } from "react-router-dom";
import { FaBox, FaChartBar, FaShoppingCart, FaPlus, FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* TOP */}
      <div className="sidebar-top">

        {/* LOGO */}
        <div className="sidebar-logo">
          <div className="logo-icon"></div>
          <div className="logo-text">
            <h2>StockPro</h2>
            <p>Inventory System</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">

          <NavLink to="/dashboard" className="menu-item">
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/products" className="menu-item">
            <FaBox />
            <span>Inventory</span>
          </NavLink>

          <NavLink to="/add-product" className="menu-item">
            <FaPlus />
            <span>Add Product</span>
          </NavLink>

          <NavLink to="/sales" className="menu-item">
            <FaShoppingCart />
            <span>Sales</span>
          </NavLink>

          <NavLink to="/reports" className="menu-item">
            <FaChartBar />
            <span>Reports</span>
          </NavLink>

        </nav>
      </div>

      {/* BOTTOM PROFILE */}
      <div className="sidebar-bottom">
        <div className="sidebar-profile">
          <div className="avatar">A</div>
          <div className="profile-info">
            <p className="profile-name">Admin</p>
            <span className="profile-role">Admin Panel</span>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
