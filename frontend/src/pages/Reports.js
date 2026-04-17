import React, { useEffect, useState } from "react";
import { getSalesReport, getInventoryReport } from "../services/reportServices";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaBoxOpen, FaRupeeSign, FaExclamationTriangle } from "react-icons/fa";

const Reports = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [salesReport, setSalesReport] = useState({});
  const [inventoryReport, setInventoryReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAdmin) navigate("/dashboard");
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const sales = await getSalesReport();
        const inventory = await getInventoryReport();

        setSalesReport(sales.summary || sales || {});
        setInventoryReport(inventory.summary || inventory || {});
      } catch (err) {
        console.error(err);
        setError("Failed to load reports ");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div className="container">Loading reports...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <div className="reports-wrapper">

        {/* HEADER */}
        <div className="reports-header">
          <h2 className="title">Reports & Insights</h2>
          <p className="subtitle">Analytics of sales and inventory performance</p>
        </div>

        {/* GRID */}
        <div className="reports-grid">

          {/* SALES */}
          <div className="report-card">
            <div className="report-title">
              <FaChartLine /> Sales Overview
            </div>

            <div className="report-stat">
              <p>Total Orders</p>
              <h3>{salesReport.totalOrders || 0}</h3>
            </div>

            <div className="report-stat">
              <p>Total Revenue</p>
              <h3>₹{salesReport.totalRevenue || 0}</h3>
            </div>
          </div>

          {/* INVENTORY */}
          <div className="report-card">
            <div className="report-title">
              <FaBoxOpen /> Inventory Overview
            </div>

            <div className="report-stat">
              <p>Total Products</p>
              <h3>{inventoryReport.totalProducts || 0}</h3>
            </div>

            <div className="report-stat">
              <p>Stock Value</p>
              <h3>₹{inventoryReport.totalStockValue || 0}</h3>
            </div>

            <div className="report-stat danger">
              <p>Low Stock Items</p>
              <h3>{inventoryReport.lowStockItems?.length || 0}</h3>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Reports;
