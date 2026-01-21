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
                    <div className="story-grid">
                        <div className="story-content animate-in">
                            <h2>The Story</h2>
                            <p>Job Tracked was born out of a simple frustration: the chaos of job hunting. Spanning across multiple browser tabs, hidden emails, and messy spreadsheets, the process was broken.</p>
                            <p>We built Job Tracked to be the bridge between effort and results. By combining high-end design with powerful automation, we've created a platform that doesn't just track jobs—it builds confidence.</p>
                        </div>
                        <div className="story-visual animate-in delay-200">
                            <div className="abstract-card">
                                <div className="card-dot"></div>
                                <div className="card-line"></div>
                                <div className="card-line short"></div>
                            </div>
                            <div className="abstract-card overlay">
                                <div className="card-dot blue"></div>
                                <div className="card-line"></div>
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
          background: #0f172a;
          color: white;
          min-height: 100vh;
        }

        .about-hero {
          padding: 160px 0 100px;
          text-align: center;
          background: radial-gradient(circle at top, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        }

        .about-hero .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .about-hero .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.6);
          max-width: 700px;
          margin: 0 auto;
        }

        .about-story {
          padding: 100px 0;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .story-content h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        .story-content p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
        }

        .story-visual {
          position: relative;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .abstract-card {
          width: 280px;
          height: 180px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(10px);
          position: relative;
        }

        .abstract-card.overlay {
          position: absolute;
          transform: translate(40px, 40px);
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .card-dot {
          width: 40px;
          height: 40px;
          background: #f472b6;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .card-dot.blue { background: #818cf8; }

        .card-line {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          margin-bottom: 12px;
          width: 100%;
        }

        .card-line.short { width: 60%; }

        .values-section {
          padding: 100px 0 150px;
          text-align: center;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 60px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .value-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 24px;
          transition: all 0.3s ease;
        }

        .value-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-5px);
        }

        .value-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .value-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .value-card p {
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .about-hero .hero-title {
            font-size: 2.25rem;
          }
        }
      `}</style>
        </div>
    );
};

export default About;
