import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/')
      .then(res => {
        const favs = res.data.filter(img => img.favorite === true);
        setFavorites(favs);
      })
      .catch(err => console.error('Error fetching favorites:', err));
  }, []);

  return (
    <div>
      <h2 style={{
        fontSize: '2rem',
        color: '#fff',
        marginBottom: '2rem',
        textAlign: 'center',
        textShadow: '0 2px 10px #000'
      }}>Your Favorite Images</h2>

      {favorites.length === 0 ? (
        <p style={{ color: '#ccc', textAlign: 'center' }}>No favorites yet. Click the star icon to add some magic!</p>
      ) : (
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {favorites.map(img => (
            <div key={img._id} style={{
              background: '#222',
              borderRadius: '1rem',
              padding: '1rem',
              boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
              cursor: 'pointer'
            }} onClick={() => navigate(`/view/${img._id}`)}>
              <img src={img.url} alt="favorite" style={{ width: '100%', borderRadius: '0.8rem' }} />
              <p style={{ color: '#aaa', marginTop: '0.5rem' }}>
                Created: {new Date(img.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
