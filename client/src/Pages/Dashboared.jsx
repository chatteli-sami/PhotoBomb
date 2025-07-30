import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaCamera, FaImages, FaStar, FaFolder } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('images');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace with actual user ID (from auth/session)
    const userId = 'your-user-id-here';

    axios.get(`http://localhost:8000/api/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error('Error fetching user:', err));
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/logout', {
        method: 'POST'
      });

      if (res.ok) {
        navigate('/signin');
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: '#111',
      color: '#fff',
      fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
    }}>
      
      {/* Sidebar */}
      <nav style={{
        width: '80px',
        background: '#1a1a1a',
        borderRight: '2px solid #fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2rem',
        gap: '2.5rem'
      }}>
        <FaImages size={28} style={{ cursor: 'pointer' }} title="All Images"
          onClick={() => { setActive('images'); navigate('/dashboard/images'); }} />
        <FaStar size={28} style={{ cursor: 'pointer' }} title="Favorites"
          onClick={() => { setActive('favorites'); navigate('/dashboard/favorites'); }} />
        <FaFolder size={28} style={{ cursor: 'pointer' }} title="Albums"
          onClick={() => { setActive('albums'); navigate('/dashboard/albums'); }} />
      </nav>

      {/* Main Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Bar */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          background: 'rgba(20,20,20,0.85)',
          borderBottom: '2px solid #fff'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FaCamera size={28} />
              <h1 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0,
                color: '#fff',
                textShadow: '0 2px 6px #000'
              }}>
                {user ? user.name : 'PhotoBomb'}
              </h1>
            </div>
            {user && (
              <p style={{ marginTop: '0.3rem', color: '#ccc', fontSize: '0.95rem' }}>
                {user.email}
              </p>
            )}
          </div>

          <input
            type="text"
            placeholder="Search photos or albums..."
            style={{
              flex: 1,
              margin: '0 2rem',
              padding: '0.6rem 1rem',
              borderRadius: '1rem',
              background: '#222',
              color: '#fff',
              border: '1px solid #fff',
              fontSize: '1rem'
            }}
          />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/albums/create" style={navLinkStyle}>Create</Link>
            <Link to="/upload" style={navLinkStyle}>Upload</Link>
            <button
              onClick={handleLogout}
              style={{
                ...navLinkStyle,
                background: '#822',
                borderColor: '#f44',
                fontWeight: '700'
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div style={{
          flex: 1,
          padding: '2rem',
          background: '#0f0f0f',
          overflowY: 'auto'
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const navLinkStyle = {
  color: '#fff',
  padding: '0.5rem 1.2rem',
  background: '#222',
  borderRadius: '1rem',
  fontWeight: '600',
  textDecoration: 'none',
  border: '1px solid #fff',
  transition: 'all 0.3s ease'
};

export default Dashboard;