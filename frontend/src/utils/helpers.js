export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

export const isLowStock = (product) =>
  product.quantity <= product.lowStockThreshold;

export const truncate = (str, n = 30) =>
  str.length > n ? str.slice(0, n) + '...' : str;