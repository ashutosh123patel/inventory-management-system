import api from './api';

export const getSalesReport = async () => {
  try {
    const { data } = await api.get('/reports/sales');
    return data.summary;
  } catch (error) {
    throw error;
  }
};

export const getInventoryReport = async () => {
  try {
    const { data } = await api.get('/reports/inventory');
    return data.summary;
  } catch (error) {
    throw error;
  }
};