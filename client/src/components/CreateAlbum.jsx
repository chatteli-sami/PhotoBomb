import React, { useState } from 'react';
import axios from 'axios';

const CreateAlbum = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/albums/create', formData);
      setMessage(res.data.msg || 'Album created!');
      setFormData({ title: '', description: '' });
    } catch (err) {
      console.error('Album creation failed:', err);
      setMessage('Failed to create album.');
    }
  };

  return (
    <div style={pageWrapperStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Create Album</h2>
        {message && <p style={{ color: '#0af', marginBottom: '1rem' }}>{message}</p>}
        <label htmlFor="title" style={labelStyle}>Album Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
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
        <button type="submit" style={buttonStyle}>Create</button>
      </form>
    </div>
  );
};

// ✅ Fullscreen layout for centered form
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

export default CreateAlbum;
