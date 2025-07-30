import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });

    // Optional: Clear field-specific error on change
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!login.email.trim()) {
      newErrors.email = { message: "Email is required" };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.email)) {
      newErrors.email = { message: "Invalid email format" };
    }

    if (!login.password.trim()) {
      newErrors.password = { message: "Password is required" };
    } else if (login.password.length < 6) {
      newErrors.password = { message: "Password must be at least 6 characters" };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post('http://localhost:8000/api/login', login)
      .then((res) => {
        const name = res.data?.userFromDB?.firstName || "User";

        // Save user ID if needed
        const userId = res.data?.userFromDB?._id;
        if (userId) {
          localStorage.setItem('userId', userId);
        }

        console.log("Welcome,", name);
        navigate('/dashboard');
      })
      .catch(err => {
        setErrors(err.response?.data || { error: "Invalid credentials" });
      });
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#111',
      padding: '2rem'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(20, 20, 20, 0.85)',
          color: '#fff',
          padding: '3rem',
          borderRadius: '1.5rem',
          boxShadow: '0 8px 36px rgba(0,0,0,0.3)',
          border: '2px solid #fff',
          backdropFilter: 'blur(4px)',
          width: '100%',
          maxWidth: '600px',
          fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
        }}
      >
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          textAlign: 'center',
          textShadow: '0 2px 12px #000'
        }}>
          Login to PhotoBomb
        </h2>

        {/* Global login error */}
        {errors?.error && (
          <p style={{
            color: 'red',
            fontWeight: '500',
            fontSize: '1rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {errors.error}
          </p>
        )}

        {["email", "password"].map((field) => (
          <div key={field} style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor={field}
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600",
                fontSize: "1.2rem"
              }}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type={field === "password" ? "password" : "email"}
              name={field}
              value={login[field]}
              onChange={handleChange}
              style={{
                background: "#111",
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: "0.8rem",
                padding: "0.8rem",
                fontSize: "1rem",
                width: "100%"
              }}
            />
            {errors[field]?.message && (
              <p style={{
                color: 'red',
                fontWeight: '500',
                fontSize: '0.95rem',
                marginTop: '0.5rem'
              }}>
                {errors[field].message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{
            background: '#fff',
            color: '#111',
            padding: '1rem 2rem',
            borderRadius: '1rem',
            fontWeight: '700',
            fontSize: '1.1rem',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          Login
        </button>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#ccc', fontSize: '1rem' }}>
            Don’t have an account?{' '}
            <Link to="/signup" style={{ color: '#00bfff', textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </p>

          <Link
            to="/"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              background: '#444',
              color: '#fff',
              padding: '0.6rem 1.2rem',
              borderRadius: '0.8rem',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'background 0.3s ease'
            }}
          >
            ⬅️ Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;