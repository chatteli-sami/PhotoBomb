import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });

    // Optional live validation (one-liner per field)
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!register.firstName.trim()) newErrors.firstName = { message: "First name is required" };
    if (!register.lastName.trim()) newErrors.lastName = { message: "Last name is required" };
    if (!register.email.trim()) {
      newErrors.email = { message: "Email is required" };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email)) {
      newErrors.email = { message: "Email format is invalid" };
    }

    if (!register.password) {
      newErrors.password = { message: "Password is required" };
    } else if (register.password.length < 6) {
      newErrors.password = { message: "Password must be at least 6 characters" };
    }

    if (!register.confirmPassword) {
      newErrors.confirmPassword = { message: "Please confirm your password" };
    } else if (register.password !== register.confirmPassword) {
      newErrors.confirmPassword = { message: "Passwords do not match" };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post('http://localhost:8000/api/register', register)
      .then(() => {
        setRegister({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({});
        navigate('/dashboard');
      })
      .catch(err => {
        setErrors(err.response?.data || {});
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
          Sign Up for PhotoBomb
        </h2>

        {/* Show errors if any */}
        {Object.entries(errors).map(([field, value]) =>
          value?.message && (
            <p key={field} style={{ color: 'red', fontWeight: '500', fontSize: '1rem', marginBottom: '1rem' }}>
              {value.message}
            </p>
          )
        )}

        {/* Form fields */}
        {["firstName", "lastName", "email", "password", "confirmPassword"].map((field) => (
          <div key={field} style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor={field}
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600",
                fontSize: "1.2rem",
                color: "#fff"
              }}
            >
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              id={field}
              className="form-control"
              type={field.toLowerCase().includes("password") ? "password" : "text"}
              name={field}
              value={register[field]}
              onChange={handleChange}
              style={{
                background: "#111",
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: "0.8rem",
                padding: "0.8rem",
                fontSize: "1rem"
              }}
            />
          </div>
        ))}

        {/* Submit button */}
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;