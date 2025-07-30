import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = () => {
    axios.get('http://localhost:8000/api/albums')
      .then(res => setAlbums(res.data))
      .catch(err => console.error('Error fetching albums:', err));
  };

  const handleDeleteAlbum = (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the album "${title}"?`)) return;

    axios.delete(`http://localhost:8000/api/albums/${id}/delete`)
      .then(() => {
        alert('Album deleted!');
        fetchAlbums(); // Refresh list
      })
      .catch(err => {
        console.error('Error deleting album:', err);
        alert('Delete failed.');
      });
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {albums.map(album => (
        <div key={album._id} style={{
          background: '#222',
          padding: '2rem',
          borderRadius: '1.2rem',
          boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
          color: '#fff',
          width: '240px',
          position: 'relative'
        }}>
          <button
            onClick={() => handleDeleteAlbum(album._id, album.title)}
            title="Delete Album"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: '#b30000',
              border: 'none',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            🗑️
          </button>

          <h3 style={{ marginBottom: '0.5rem' }}>{album.title}</h3>
          <p style={{ color: '#aaa' }}>Created: {new Date(album.createdAt).toLocaleDateString()}</p>
          <p style={{ fontSize: '0.9rem' }}>{album.description}</p>
          <p style={{ fontSize: '0.8rem', color: '#999' }}>Images: {album.images.length}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumsPage;