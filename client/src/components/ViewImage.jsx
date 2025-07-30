import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');

  // Fetch image and albums on mount
  useEffect(() => {
    axios.get(`http://localhost:8000/api/images/${id}`)
      .then(res => {
        setImage(res.data);
        setIsFavorited(res.data.isFavorited || false);
      })
      .catch(err => console.error('Error fetching image:', err));

    axios.get('http://localhost:8000/api/albums')
      .then(res => setAlbums(res.data))
      .catch(err => console.error('Error fetching albums:', err));
  }, [id]);

  const handleFavorite = () => {
    axios.patch(`http://localhost:8000/api/images/${id}/favorite`)
      .then(() => {
        alert('Image marked as favorite!');
        setIsFavorited(true);
      })
      .catch(err => {
        console.error('Failed to favorite image:', err);
        alert('Favorite action failed.');
      });
  };

  const handleAssignAlbum = () => {
    if (!selectedAlbum) return alert('Please select an album.');

    axios.patch(`http://localhost:8000/api/images/${id}/assign-album`, {
      albumId: selectedAlbum
    })
      .then(() => {
        alert('Image successfully added to album!');
        setSelectedAlbum('');
      })
      .catch(err => {
        console.error('Error assigning to album:', err);
        alert('Could not assign image to album.');
      });
  };

  const handleMetadataUpdate = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:8000/api/images/${id}/update`, {
      description: image.description,
      tags: image.tags
    })
      .then(() => alert('Image metadata updated!'))
      .catch(err => {
        console.error('Metadata update failed:', err);
        alert('Failed to update image info.');
      });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      backgroundColor: '#121212',
      padding: '1rem'
    }}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        width: '80vw',
        maxWidth: '1200px'
      }}>
        {/* Left section: Image + interactions */}
        <div style={{
          flex: 2,
          background: 'rgba(20,20,20,0.85)',
          padding: '2rem',
          borderRadius: '1rem',
          color: '#fff',
          border: '2px solid #fff',
          boxShadow: '0 8px 36px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>📷 View Image</h2>
          {image ? (
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <img src={image.url} alt="full" style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  borderRadius: '1rem',
                  objectFit: 'contain',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
                }} />
              </div>

              <p style={{ marginBottom: '0.5rem', color: '#ccc' }}>🗓 Created: {new Date(image.createdAt).toLocaleDateString()}</p>
              <p style={{ marginBottom: '1.5rem' }}>{image.description}</p>

              <button
                onClick={handleFavorite}
                disabled={isFavorited}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: isFavorited ? '#555' : '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isFavorited ? 'default' : 'pointer',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              >
                {isFavorited ? '❤️ Favorited' : '💙 Favorite This Photo'}
              </button>

              <div style={{ marginTop: '1rem' }}>
                <select
                  value={selectedAlbum}
                  onChange={e => setSelectedAlbum(e.target.value)}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    marginRight: '0.5rem'
                  }}
                >
                  <option value="">📁 Choose Album</option>
                  {albums.map(album => (
                    <option key={album._id} value={album._id}>
                      {album.title}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleAssignAlbum}
                  style={{
                    padding: '0.6rem 1.2rem',
                    background: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  📌 Add to Album
                </button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Right section: Update form */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          padding: '2rem',
          borderRadius: '1rem',
          color: '#fff',
          border: '2px solid #666',
          boxShadow: '0 6px 24px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>✏️ Edit Metadata</h3>
          {image && (
            <form onSubmit={handleMetadataUpdate}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Description</label><br />
                <textarea
                  value={image.description || ''}
                  onChange={e => setImage({ ...image, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    background: '#222',
                    color: '#fff',
                    border: '1px solid #444'
                  }}
                  rows={4}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Tags (comma-separated)</label><br />
                <input
                  type="text"
                  value={image.tags || ''}
                  onChange={e => setImage({ ...image, tags: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    background: '#222',
                    color: '#fff',
                    border: '1px solid #444'
                  }}
                />
              </div>

              <button type="submit" style={{
                padding: '0.6rem 1.2rem',
                background: '#17a2b8',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: 'pointer'
              }}>
                🧾 Update Image
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewImage;