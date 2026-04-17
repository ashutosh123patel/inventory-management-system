import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProducts } from "../services/productServices";
import { getSales } from "../services/salesServices";
import { FaBox, FaRupeeSign, FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const p = await getProducts();
        const s = await getSales();

        setProducts(Array.isArray(p) ? p : []);
        setSales(Array.isArray(s) ? s : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalRevenue = sales.reduce(
    (acc, s) => acc + (s.totalPrice || 0),
    0
  );

  const lowStockCount = products.filter(
    (p) => p.quantity <= p.lowStockThreshold
  ).length;

  if (loading) {
    return <div className="container">Loading dashboard...</div>;
  }

  return (
    <div className="container">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2 className="title">Welcome, {user?.name} </h2>
          <p className="subtitle">
            Here's what’s happening with your inventory today
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue"><FaBox /></div>
          <div>
            <p>Total Products</p>
            <h3>{products.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green"><FaShoppingCart /></div>
          <div>
            <p>Total Sales</p>
            <h3>{sales.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple"><FaRupeeSign /></div>
          <div>
            <p>Total Revenue</p>
            <h3>₹{totalRevenue}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red"><FaExclamationTriangle /></div>
          <div>
            <p>Low Stock</p>
            <h3>{lowStockCount}</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
