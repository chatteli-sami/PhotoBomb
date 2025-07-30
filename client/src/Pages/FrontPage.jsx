import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Particles from '../components/Particles'
import Magnet from '../components/Magnet'
import SplitText from '../components/SplitText';

const IMAGE_API = "https://picsum.photos/v2/list?page=1&limit=60"; // Increased limit for more images

const FrontPage = () => {
  const [images, setImages] = useState([]);
  const nav = useNavigate();

  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

  useEffect(() => {
    fetch(IMAGE_API)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(() => setImages([]));
  }, []);


  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative', margin: 0, padding: 0 }}>
      {/* Particles as background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={1000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
        {/* Title */}
        <h1
          style={{
            margin: '2rem 0 1rem 0',
            color: '#fff',
            textShadow: '0 4px 16px #000',
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
            fontWeight: 900,
            fontSize: "3.5rem",
            letterSpacing: "0.08em",
            textAlign: "center"
          }}
        >
          <SplitText
            text="PhotoBomb!"
            className="text-2xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            />
        </h1>
        {/* Description */}
        <p
          style={{
            color: "#e0e0e0",
            fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
            fontSize: "1.5rem",
            fontWeight: 500,
            margin: "0 0 2.5rem 0",
            textAlign: "center",
            maxWidth: "600px",
            textShadow: "0 2px 8px #000a"
          }}
        >
          Instantly enhance your photos with creative effects and interactive visuals. PhotoBomb makes your images pop with style and fun!
        </p>
        {/* Magnet button further below the title */}
        <Magnet>
          <button style={{
            marginTop: "4rem",
            padding: "2rem 4rem",
            fontSize: "2rem",
            borderRadius: "1.5rem",
            background: "#222",
            color: "#fff",
            border: "2px solid #fff",
            fontWeight: "bold",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            cursor: "pointer",
            opacity: 0.75
          }}
            onClick={() => nav('/signin')}
          >
            Get Started 
          </button>
        </Magnet>
        {/* Horizontal Scrolling Image List */}
        <div style={{
          width: "200vw",
          overflow: "hidden",
          margin: "3rem 0 2rem 0",
          position: "relative"
        }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              animation: "scroll-left 30s linear infinite"
            }}
          >
            {[...images, ...images].slice(0, 20).map((img, idx) => (
              <div
                key={img.id + '-' + idx}
                style={{
                  borderRadius: "1.2rem",
                  overflow: "hidden",
                  boxShadow: "0 6px 32px rgba(0,0,0,0.18)",
                  border: "3px solid #fff",
                  background: "#222",
                  width: "180px",
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={img.download_url}
                  alt={img.author}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Add this style tag for animation */}
        <style>
          {`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
      </div>
      {/* About Section */}
        <div style={{
          maxWidth: "900px",
          background: "#222",
          color: "#eee",
          margin: "2rem auto 4rem auto",
          padding: "2.5rem",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 36px rgba(0,0,0,0.25)",
          textAlign: "center",
          border: "2px solid #fff",
          fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1.2rem",
            color: "#fff",
            textShadow: "0 2px 12px #000"
          }}>
            About PhotoBomb
          </h2>
          <p style={{
            fontSize: "1.3rem",
            lineHeight: "1.8",
            fontWeight: "500",
            color: "#ccc",
            textShadow: "0 1px 6px #000a"
          }}>
            PhotoBomb is your go-to platform for transforming ordinary images into extraordinary experiences. 
            Using intuitive design and a sprinkle of visual magic, it lets users manage albums, tag friends, 
            and play with AI-driven enhancements. Whether you're creating memories or crafting digital art, 
            PhotoBomb gives your photos the spotlight they deserve.
          </p>
        </div>
        {/* Social Links */}
<div style={{
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
  marginBottom: "4rem",
  flexWrap: "wrap"
}}>
  {[
    "Facebook",
    "Instagram",
    "TikTok",
    "Gmail",
    "Snapchat",
    "X"
  ].map(name => (
    <a
      key={name}
      href="#"
      style={{
        padding: "0.8rem 2rem",
        background: "rgba(20, 20, 20, 0.8)",
        borderRadius: "2rem",
        color: "#fff",
        fontWeight: "600",
        textDecoration: "none",
        boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
        transition: "all 0.3s ease",
        fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
        border: "1px solid #fff",
        backdropFilter: "blur(4px)"
      }}
      onClick={(e) => e.preventDefault()}
    >
      {name}
    </a>
  ))}
</div>
{/* Contact Me Form */}
<div style={{
  maxWidth: "900px",
  margin: "0 auto 4rem auto",
  padding: "2.5rem",
  borderRadius: "1.5rem",
  background: "rgba(20, 20, 20, 0.85)",
  boxShadow: "0 8px 36px rgba(0,0,0,0.3)",
  border: "2px solid #fff",
  backdropFilter: "blur(4px)",
  color: "#fff",
  fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
}}>
  <h2 style={{
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "1.2rem",
    textAlign: "center",
    textShadow: "0 2px 10px #000"
  }}>
    Contact Me
  </h2>
  <form>
    <div style={{ marginBottom: "1.5rem" }}>
      <label htmlFor="name" style={{ fontWeight: "600", fontSize: "1.2rem" }}>Name</label><br />
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Your full name"
        style={{
          width: "100%",
          padding: "0.8rem",
          borderRadius: "0.8rem",
          border: "1px solid #fff",
          background: "#111",
          color: "#fff",
          fontSize: "1rem"
        }}
      />
    </div>
    <div style={{ marginBottom: "1.5rem" }}>
      <label htmlFor="phone" style={{ fontWeight: "600", fontSize: "1.2rem" }}>Phone Number</label><br />
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="+216 xxx xxx xxx"
        style={{
          width: "100%",
          padding: "0.8rem",
          borderRadius: "0.8rem",
          border: "1px solid #fff",
          background: "#111",
          color: "#fff",
          fontSize: "1rem"
        }}
      />
    </div>
    <div style={{ marginBottom: "2rem" }}>
      <label htmlFor="description" style={{ fontWeight: "600", fontSize: "1.2rem" }}>Message</label><br />
      <textarea
        id="description"
        name="description"
        rows="5"
        placeholder="Let me know how I can help!"
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "0.8rem",
          border: "1px solid #fff",
          background: "#111",
          color: "#fff",
          fontSize: "1rem",
          resize: "vertical"
        }}
      ></textarea>
    </div>
    <button
      type="submit"
      style={{
        padding: "1rem 2.5rem",
        borderRadius: "1.2rem",
        background: "#fff",
        color: "#111",
        fontWeight: "700",
        fontSize: "1.1rem",
        cursor: "pointer",
        border: "none",
        transition: "all 0.3s ease",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
      }}
      onClick={(e) => e.preventDefault()} // Prevent submission for now
    >
      Send Message
    </button>
  </form>
</div>

    </div>
  )
}

export default FrontPage