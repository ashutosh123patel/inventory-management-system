import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productServices";
import { useAuth } from "../context/AuthContext";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ Better than alert() for errors

  useEffect(() => {
    if (!isAdmin) return; // ✅ Skip fetch if not admin

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setForm(data);
      } catch (err) {
        setError("Error fetching product"); // ✅ Use state instead of alert
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isAdmin]); // ✅ Added isAdmin as dependency

  if (!isAdmin) return <p>Access denied</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>; // ✅ Show error in UI

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      navigate("/products");
    } catch (err) {
      setError("Error updating product"); // ✅ Use state instead of alert
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Product</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditProduct;