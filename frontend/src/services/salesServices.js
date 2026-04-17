import api from './api';

export const getSales = async () => {
  try {
    const { data } = await api.get('/sales');
    return data.sales || data.data || []; 
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch sales";
  }
};


export const createSale = async (saleData) => {
  try {
    const { data } = await api.post('/sales', saleData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create sale";
  }
};

export const deleteSale = async (id) => {
  try {
    const { data } = await api.delete(`/sales/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete sale";
  }
};