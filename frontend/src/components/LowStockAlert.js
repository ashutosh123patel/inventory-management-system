import React, { useEffect, useState } from 'react';
import { getLowStockProducts } from '../services/productServices';

import { useAuth } from '../context/AuthContext';

const LowStockAlert = () => {
  const { user } = useAuth();

  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const data = await getLowStockProducts();
        setLowStock(data.slice(0, 5)); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLowStock();
  }, []);

  if (!user) return null;

  if (loading) {
    return <p>Loading alerts...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Failed to load alerts</p>;
  }

  if (lowStock.length === 0) return null;

  return (
    <div style={styles.container}>
      <h4 style={styles.title}> Low Stock Alert</h4>

      {lowStock.map((p) => (
        <div key={p._id} style={styles.item}>
          <span>{p.name}</span>
          <span style={styles.badge}>{p.quantity} left</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    background:'#fff7ed',
    border:'1px solid #fed7aa',
    borderRadius:'8px',
    padding:'12px 16px',
    marginBottom:'16px'
  },
  title: { margin:'0 0 8px 0', color:'#ea580c' },
  item: {
    display:'flex',
    justifyContent:'space-between',
    padding:'4px 0',
    fontSize:'14px'
  },
  badge: {
    background:'#ef4444',
    color:'#fff',
    padding:'2px 8px',
    borderRadius:'12px',
    fontSize:'12px'
  },
};

export default LowStockAlert;