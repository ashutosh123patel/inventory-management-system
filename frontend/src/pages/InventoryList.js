import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productServices";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const InventoryList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data?.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert(typeof err === "string" ? err : "Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  if (loading) return <div className="container">Loading inventory...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <div className="inventory-wrapper">

        {/* HEADER */}
        <div className="inventory-header">
          <div>
            <h2 className="title">Inventory</h2>
            <p className="subtitle">Manage your products and stock</p>
          </div>

          {isAdmin && (
            <Link to="/add-product" className="add-btn">
              + Add Product
            </Link>
          )}
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 ? (
          <div className="empty-state">
            No products found 
          </div>
        ) : (
          <div className="table-card">

            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>

                    <td className="product-name">
                      {product.name}
                    </td>

                    <td>
                      <span className="category-badge">
                        {product.category || "N/A"}
                      </span>
                    </td>

                    <td>₹{product.price}</td>

                    <td>
                      <span
                        className={`quantity ${
                          product.quantity <= product.lowStockThreshold
                            ? "low"
                            : "ok"
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </td>

                    {isAdmin && (
                      <td>
                        <button
                          className="btn edit"
                          onClick={() => handleEdit(product._id)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn delete"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}

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

export default InventoryList;
