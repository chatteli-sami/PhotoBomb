import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [formData, setFormData] = useState({
    url: '',
    description: '',
    tags: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      const res = await axios.post('http://localhost:8000/api/images/upload', payload);
      setMessage(res.data.msg || 'Image uploaded!');
      setFormData({ url: '', description: '', tags: '' });
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Failed to upload image.');
    }
  };

  return (
    <div style={pageWrapperStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Upload Image</h2>
        {message && <p style={{ color: '#0af', marginBottom: '1rem' }}>{message}</p>}
        <label htmlFor="url" style={labelStyle}>Image URL</label>
        <input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          style={inputStyle}
        />
        <label htmlFor="description" style={labelStyle}>Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <label htmlFor="tags" style={labelStyle}>Tags (comma-separated)</label>
        <input
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Upload</button>
      </form>
    </div>
  );
};

const pageWrapperStyle = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#111',
  padding: '2rem'
};

const formStyle = {
  width: '100%',
  maxWidth: '700px',
  padding: '3rem',
  background: 'rgba(20,20,20,0.85)',
  borderRadius: '1.2rem',
  border: '2px solid #fff',
  color: '#fff',
  boxShadow: '0 8px 36px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(5px)',
  fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '2rem',
  fontSize: '2.2rem',
  fontWeight: '700'
};

const labelStyle = {
  fontWeight: '600',
  fontSize: '1.1rem',
  marginBottom: '0.5rem',
  display: 'block'
};

const inputStyle = {
  width: '100%',
  padding: '0.9rem',
  fontSize: '1rem',
  borderRadius: '0.8rem',
  background: '#111',
  color: '#fff',
  border: '1px solid #fff',
  marginBottom: '1.5rem'
};

const buttonStyle = {
  width: '100%',
  background: '#fff',
  color: '#111',
  padding: '1rem 2rem',
  borderRadius: '1rem',
  fontWeight: '700',
  fontSize: '1.1rem',
  cursor: 'pointer',
  boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
};

export default UploadImage;
