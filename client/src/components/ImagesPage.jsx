import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/images/')
      .then(res => setImages(res.data))
      .catch(err => console.error('Error fetching images:', err));
  }, []);

  // 🗑️ Delete image handler
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/images/${id}`, {
      // if your backend requires auth cookies
      });

      if (res.status === 200) {
        setImages(prev => prev.filter(img => img._id !== id)); // remove from UI
      } else {
        console.error('Failed to delete image');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
      {images.map((img) => (
        <div key={img._id} style={{
          background: '#222',
          borderRadius: '1rem',
          padding: '1rem',
          boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <img
            src={img.url}
            alt="preview"
            onClick={() => navigate(`/view/${img._id}`)}
            style={{ width: '100%', borderRadius: '0.8rem', cursor: 'pointer' }}
          />
          <p style={{ color: '#ccc' }}>Created: {new Date(img.createdAt).toLocaleDateString()}</p>
          
          {/* 🧨 Delete button */}
          <button
            onClick={() => handleDelete(img._id)}
            style={{
              background: '#822',
              color: '#fff',
              padding: '0.5rem 1rem',
              border: '1px solid #f44',
              borderRadius: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s ease'
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagesPage;