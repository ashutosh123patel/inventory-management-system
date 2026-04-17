import api from './api';

export const getProducts = async () => {
  try {
    const { data } = await api.get('/products');
    return data.products || data.data || [];
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch products";
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data.product || data.data || null;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch product";
  }
};

export const createProduct = async (productData) => {
  try {
    const { data } = await api.post('/products', productData);
    return data.product || data.data || null;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create product";
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const { data } = await api.put(`/products/${id}`, productData);
    return data.product || data.data || null;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update product";
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await api.delete(`/products/${id}`);
    return data.message || "Product deleted";
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete product";
  }
};

export const getLowStockProducts = async () => {
  try {
    const { data } = await api.get('/products/low-stock');
    return data.products || data.data || [];
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch low stock products";
  }
};