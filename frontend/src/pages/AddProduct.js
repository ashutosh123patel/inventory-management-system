import React, { useState } from "react";
import { createProduct } from "../services/productServices";
import { FaBox, FaRupeeSign, FaLayerGroup } from "react-icons/fa";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      setLoading(true);
      await createProduct(form);

      setMsg("Product Added Successfully ");

      setForm({
        name: "",
        price: "",
        quantity: "",
        category: "",
      });
    } catch (err) {
      setMsg("Failed to add product ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="premium-form-wrapper">

        {/* HEADER */}
        <div className="premium-header">
          <h2>Add New Product</h2>
          <p>Manage and expand your inventory efficiently</p>
        </div>

        {/* FORM CARD */}
        <div className="premium-card">

          {msg && (
            <div className={`alert ${msg.includes("") ? "error" : "success"}`}>
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="premium-form">

            {/* PRODUCT NAME */}
            <div className="input-group">
              <FaBox />
              <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* PRICE */}
            <div className="input-group">
              <FaRupeeSign />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* QUANTITY */}
            <div className="input-group">
              <FaLayerGroup />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* CATEGORY */}
            <div className="input-group">
              <FaBox />
              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
            </div>

            {/* BUTTON */}
            <button className="premium-btn" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;

