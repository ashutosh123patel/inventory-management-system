import React, { useEffect, useState } from "react";
import { getSales, createSale } from "../services/salesServices";
import { getProducts } from "../services/productServices";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product: "", quantity: 1 });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isAdmin) navigate("/dashboard");
  }, [isAdmin, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const s = await getSales();
      const p = await getProducts();

      setSales(Array.isArray(s) ? s : []);
      setProducts(Array.isArray(p) ? p : []);
    } catch (err) {
      setError("Failed to load data ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const selectedProduct = products.find(
      (p) => p._id === form.product
    );

    if (!selectedProduct) return setError("Select a product ");
    if (form.quantity > selectedProduct.quantity)
      return setError("Not enough stock ");

    try {
      await createSale(form);
      setSuccess("Sale recorded successfully ");
      fetchData();
      setForm({ product: "", quantity: 1 });
    } catch (err) {
      setError(err?.response?.data?.message || "Sale failed ");
    }
  };

  if (loading) return <div className="container">Loading sales...</div>;

  return (
    <div className="container">
      <div className="sales-wrapper">

        {/* HEADER */}
        <div className="sales-header">
          <h2 className="title">Sales Management</h2>
          <p className="subtitle">Track and record product sales</p>
        </div>

        {/* FORM */}
        <div className="sales-form-card">
          <h4 className="form-title">Record New Sale</h4>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <form onSubmit={handleSubmit} className="sales-form">

            <select
              className="input"
              value={form.product}
              onChange={(e) =>
                setForm({ ...form, product: e.target.value })
              }
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>

            <input
              className="input"
              type="number"
              min="1"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: Number(e.target.value),
                })
              }
              required
            />

            <button className="primary-btn" type="submit">
              Record Sale
            </button>

          </form>
        </div>

        {/* TABLE */}
        {sales.length === 0 ? (
          <div className="empty-state">
            No sales yet 
          </div>
        ) : (
          <div className="table-card">

            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((s) => (
                  <tr key={s._id}>
                    <td>{s.product?.name || "N/A"}</td>
                    <td>{s.quantity}</td>
                    <td className="price">₹{s.totalPrice}</td>
                    <td>
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

      </div>
    </div>
  );
};

export default Sales;
