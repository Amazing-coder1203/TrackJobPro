import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isUserLoggedIn } from '../services/auth-service';
import '../App.css';

const Features = () => {
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

  const featureCards = [
    {
      title: "Smart Kanban Board",
      description: "Visualize your entire job search pipeline. Drag and drop applications between stages with smooth animations and instant cloud sync.",
      image: "🎯",
      color: "blue",
      details: ["Drag & Drop Interface", "Status Auto-Updates", "Real-time Sync"]
    },
    {
      title: "Powerful Analytics",
      description: "Track your success rates and identify bottlenecks. See which companies respond fastest and optimize your application strategy.",
      image: "📊",
      color: "purple",
      details: ["Success Rate Charts", "Time-to-Offer Tracking", "Company Response Stats"]
    },
    {
      title: "Unified Document Vault",
      description: "Keep every resume, cover letter, and portfolio version organized. Attach them directly to your applications for instant access.",
      image: "📂",
      color: "indigo",
      details: ["Multiple Version Support", "Cloud Storage Integration", "Instant Preview"]
    },
    {
      title: "Interview Intelligent Hub",
      description: "Never miss a beat with our intelligent interview manager. Automated reminders, company research tools, and preparation checklists.",
      image: "🗓️",
      color: "cyan",
      details: ["Automatic Reminders", "Company Research Feed", "Preparation Checklists"]
    },
    {
      title: "Salary Comparison Tool",
      description: "Benchmark your offers against industry standards. View salary ranges for similar roles and locations to negotiate with confidence.",
      image: "💰",
      color: "emerald",
      details: ["Industry Benchmarking", "Negotiation Guides", "Location Adjustments"]
    },
    {
      title: "Browser Extension",
      description: "Clip jobs directly from LinkedIn, Indeed, and glassdoor with a single click. No more manual data entry or switching tabs.",
      image: "🧩",
      color: "orange",
      details: ["One-Click Saving", "Auto-Parsing", "Direct Sync to Kanban"]
    }
  ];

  return (
    <div className="app features-page">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="6" width="24" height="3" rx="1.5" fill="url(#grad-feat)" />
                <rect x="4" y="12" width="18" height="3" rx="1.5" fill="url(#grad-feat)" />
                <rect x="4" y="18" width="20" height="3" rx="1.5" fill="url(#grad-feat)" />
                <rect x="4" y="24" width="16" height="3" rx="1.5" fill="url(#grad-feat)" />
                <defs>
                  <linearGradient id="grad-feat" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-name">Job Tracked</span>
          </div>

          <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/features" className="nav-link active">Features</Link>
            <Link to="/about" className="nav-link">About</Link>
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

      {/* Hero Section */}
      <header className="features-hero">
        <div className="container">
          <h1 className="hero-title animate-in">The Power of <span className="text-gradient">Organization</span></h1>
          <p className="hero-subtitle animate-in delay-200">Our suite of tools is designed to turn the chaos of job hunting into a structured path to success.</p>
        </div>
      </header>

      {/* Feature Showcases */}
      <section className="features-grid-section">
        <div className="container">
          <div className="features-showcase">
            {featureCards.map((card, index) => (
              <div key={index} className={`feature-showcase-card dashboard-preview animate-in`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className="feature-card-content">
                  <div className="feature-icon-wrapper" style={{ fontSize: '3rem' }}>{card.image}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul className="feature-details-list">
                    {card.details.map((detail, i) => (
                      <li key={i}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 10l3 3 7-7" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Examples / Crazy Good Section */}
      <section className="usage-examples-section">
        <div className="container">
          <div className="usage-header animate-in">
            <h2>Real-World <span className="text-gradient">Workflows</span></h2>
            <p>See how top professionals use Job Tracked to stay ahead.</p>
          </div>

          <div className="usage-steps">
            <div className="usage-step-card animate-in delay-200">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>One-Click Import</h3>
                <p>Browsing LinkedIn and found a match? Use our extension to sync it to 'Applied' instantly. No manual typing, ever.</p>
              </div>
            </div>
            <div className="usage-step-card animate-in delay-400">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Auto-Preparation</h3>
                <p>When you move a card to 'Interview', we automatically pull company news and recent stock performance for your research.</p>
              </div>
            </div>
            <div className="usage-step-card animate-in delay-600">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Negotiation Power</h3>
                <p>Use our offer breakdown tool to compare benefits, equity, and base salary against industry averages before you sign.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="features-cta">
        <div className="container">
          <div className="cta-box animate-in">
            <h2>Experience the future of hiring.</h2>
            <p>Free for individuals. No credit card required.</p>
            <button className="btn btn-primary btn-large" onClick={() => navigate('/signin')}>Create Your Free Account</button>
          </div>
        </div>
      </section>

      <footer className="features-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Job Tracked. Empowering your next move.</p>
        </div>
      </footer>

      <style>{`
        .features-page {
          background: #ffffff;
          color: #0f172a;
          min-height: 100vh;
          padding-top: 100px;
          font-family: 'Inter', sans-serif;
        }

        .features-hero {
          text-align: center;
          padding: 100px 0 60px;
          background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.05) 0%, transparent 60%);
        }

        .features-hero .hero-title {
          font-size: 4.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
          color: #1e293b;
          letter-spacing: -0.04em;
        }

        .features-hero .hero-subtitle {
          font-size: 1.5rem;
          color: #64748b;
          max-width: 800px;
          margin: 0 auto;
        }

        .features-grid-section {
          padding: 40px 0 100px;
        }

        .features-showcase {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 32px;
        }

        .feature-showcase-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 32px;
          padding: 48px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .feature-showcase-card:hover {
          transform: translateY(-8px);
          border-color: #cbd5e1;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.1);
        }

        .feature-card-content h3 {
          font-size: 1.85rem;
          margin: 1.5rem 0 1rem;
          color: #0f172a;
          font-weight: 700;
        }

        .feature-card-content p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .feature-details-list {
          list-style: none;
          padding: 0;
        }

        .feature-details-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          font-weight: 600;
          color: #334155;
        }

        .usage-examples-section {
          background: #f8fafc;
          padding: 120px 0;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }

        .usage-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .usage-header h2 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .usage-header p {
          font-size: 1.25rem;
          color: #64748b;
        }

        .usage-steps {
          display: flex;
          gap: 40px;
        }

        .usage-step-card {
          flex: 1;
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .step-number {
          font-size: 3rem;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px #e2e8f0;
          line-height: 1;
        }

        .usage-step-card h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: #0f172a;
        }

        .usage-step-card p {
          color: #64748b;
          line-height: 1.7;
        }

        .features-cta {
          padding: 120px 0;
          text-align: center;
        }

        .cta-box {
          background: #0f172a;
          border-radius: 48px;
          padding: 100px 40px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .cta-box h2 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }

        .cta-box p {
          font-size: 1.4rem;
          color: #94a3b8;
          margin-bottom: 3rem;
        }

        .features-footer {
          padding: 40px 0;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #94a3b8;
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .usage-steps {
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .features-hero .hero-title {
            font-size: 3rem;
          }
          .cta-box h2 {
            font-size: 2.5rem;
          }
        }
        
        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e2e8f0;
        }
        
        .navbar .nav-link {
          color: #475569;
        }
        
        .navbar .brand-name {
          color: #0f172a;
        }
      `}</style>
    </div>
  );
};

export default Features;
