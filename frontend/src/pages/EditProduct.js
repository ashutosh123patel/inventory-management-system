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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setForm(data);
      } catch (error) {
        alert("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (!isAdmin) {
    return <p>Access denied </p>;
  }

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

      alert("Product updated successfully ");
      navigate("/products");

    } catch (error) {
      alert("Error updating product ");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Product</h2>

      <input name="name" value={form.name} onChange={handleChange} />
      <input name="price" value={form.price} onChange={handleChange} />
      <input name="quantity" value={form.quantity} onChange={handleChange} />
      <input name="category" value={form.category} onChange={handleChange} />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditProduct;