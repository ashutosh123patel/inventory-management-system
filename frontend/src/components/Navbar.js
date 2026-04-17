import { FaBell, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">
          Overview of your inventory and stock activity
        </p>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* SEARCH */}
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input placeholder="Search products, orders..." />
        </div>

        {/* NOTIFICATION */}
        <div className="icon-btn notification">
          <FaBell />
          <span className="badge">3</span>
        </div>

        {/* USER */}
        <div className="user-box">
          <div className="avatar">
            {user?.name?.[0] || "A"}
          </div>
          <div className="user-info">
            <p>{user?.name || "Admin"}</p>
            <span>Admin</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
