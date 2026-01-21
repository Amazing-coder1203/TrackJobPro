import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isUserLoggedIn } from '../services/auth-service';
import '../App.css';

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Animation Observer for About Page
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // For simple CSS animation triggers:
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-in');
    animatedElements.forEach(el => {
      // Use CSS class to trigger, or directly pause/play if using keyframes
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });

    return () => animatedElements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="app about-page">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="6" width="24" height="3" rx="1.5" fill="url(#grad-about)" />
                <rect x="4" y="12" width="18" height="3" rx="1.5" fill="url(#grad-about)" />
                <rect x="4" y="18" width="20" height="3" rx="1.5" fill="url(#grad-about)" />
                <rect x="4" y="24" width="16" height="3" rx="1.5" fill="url(#grad-about)" />
                <defs>
                  <linearGradient id="grad-about" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-name">Job Tracked</span>
          </div>

          <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/about" className="nav-link active">About</Link>
            {isUserLoggedIn() ? (
              <button className="btn btn-primary" onClick={() => navigate('/tracker')}>Dashboard</button>
            ) : (
              <button className="btn btn-primary" onClick={() => navigate('/signin')}>Get Started</button>
            )}
          </div>

          <div className={`nav-toggle ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content animate-in">
            <h1 className="hero-title">Our Mission: <span className="text-gradient">Humanizing</span> the Job Search</h1>
            <p className="hero-subtitle">We believe that every professional deserves a stress-free transition to their next career chapter.</p>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-container">
            <div className="story-content animate-in">
              <h2>The Story</h2>
              <p>Job Tracked was born out of a simple frustration: the chaos of job hunting. Spanning across multiple browser tabs, hidden emails, and messy spreadsheets, the process was broken.</p>
              <p>We built Job Tracked to be the bridge between effort and results. By combining high-end design with powerful automation, we've created a platform that doesn't just track jobs—it builds confidence.</p>
            </div>
            <div className="story-visual animate-in delay-200">
              {/* Connector Line */}
              <div className="story-connector"></div>

              {/* Glass Card 1 - Origin */}
              <div className="glass-card card-origin">
                <div className="card-icon text-indigo-500">💡</div>
                <h4 className="font-bold text-slate-800 mb-2">The Idea</h4>
                <p className="text-sm text-slate-500">Born from the need to organize chaos.</p>
              </div>

              {/* Glass Card 2 - Mission */}
              <div className="glass-card card-mission">
                <div className="card-icon text-purple-500">🚀</div>
                <h4 className="font-bold text-slate-800 mb-2">The Mission</h4>
                <p className="text-sm text-slate-500">Empowering professionals everywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title animate-in">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card animate-in delay-200">
              <div className="value-icon">🔓</div>
              <h3>Transparency</h3>
              <p>We offer clear insights into your data and progress, always.</p>
            </div>
            <div className="value-card animate-in delay-400">
              <div className="value-icon">⚡</div>
              <h3>Efficiency</h3>
              <p>Tools designed to save your time, so you can focus on the interview.</p>
            </div>
            <div className="value-card animate-in delay-600">
              <div className="value-icon">💎</div>
              <h3>Privacy</h3>
              <p>Your data is yours. We use bank-grade security to keep it that way.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-page {
          background: #f8fafc;
          color: #0f172a;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          padding-top: 80px;
        }

        /* Hero */
        .about-hero {
          padding: 120px 0 100px;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .text-gradient {
          background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #64748b;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Story - Connected Cards Style */
        .about-story {
          padding: 100px 0;
          overflow: hidden;
        }

        .story-container {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 80px;
           align-items: center;
        }

        .story-visual {
           position: relative;
           height: 400px;
        }

        .glass-card {
           background: rgba(255, 255, 255, 0.7);
           backdrop-filter: blur(12px);
           border: 1px solid rgba(255, 255, 255, 0.5);
           border-radius: 20px;
           padding: 24px;
           box-shadow: 0 20px 40px -5px rgba(0,0,0,0.05);
           position: absolute;
           width: 260px;
           transition: transform 0.4s ease;
        }
        
        .glass-card:hover { transform: translateY(-5px) scale(1.02); }

        .card-origin { top: 40px; left: 20px; z-index: 1; }
        .card-mission { bottom: 60px; right: 20px; z-index: 2; border-color: #a855f7; }
        
        .card-icon {
           width: 40px; height: 40px;
           border-radius: 10px;
           display: flex; align-items: center; justify-content: center;
           font-size: 1.25rem;
           margin-bottom: 16px;
           background: white;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }

        /* Connecting Line */
        .story-connector {
           position: absolute;
           top: 50%; left: 50%;
           width: 200px; height: 2px;
           background: linear-gradient(90deg, #cbd5e1 50%, transparent 50%);
           background-size: 10px 10px;
           transform: translate(-50%, -50%) rotate(45deg);
           z-index: 0;
        }

        .story-content h2 { font-size: 2.5rem; margin-bottom: 24px; color: #1e293b; }
        .story-content p { font-size: 1.1rem; color: #475569; line-height: 1.7; margin-bottom: 20px; }

        /* Values - Stepped Style */
        .values-section {
          padding: 100px 0;
          background: white;
        }

        .values-grid {
          display: flex;
          gap: 30px;
          margin-top: 60px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .value-card {
          flex: 1;
          min-width: 280px;
          max-width: 350px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .value-card:hover {
          background: white;
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
          border-color: #cbd5e1;
        }
        
        /* Top accent line */
        .value-card::before {
           content: '';
           position: absolute; top: 0; left: 0; width: 100%; height: 6px;
           background: #e2e8f0;
           transition: background 0.3s;
        }
        
        .value-card:hover::before { background: linear-gradient(90deg, #6366f1, #ec4899); }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 24px;
          display: inline-block;
          filter: grayscale(100%);
          transition: filter 0.3s;
        }
        
        .value-card:hover .value-icon { filter: grayscale(0%); transform: scale(1.1); }

        .value-card h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: #1e293b;
        }

        .value-card p {
          color: #64748b;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .story-container { grid-template-columns: 1fr; }
          .story-visual { height: 350px; }
          .glass-card { width: 220px; }
          .about-hero .hero-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default About;
