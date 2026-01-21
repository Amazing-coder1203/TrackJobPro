import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logoutUser } from '../services/auth-service';
import {
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import '../App.css';

const JobTracked = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [counters, setCounters] = useState({ users: 0, applications: 0, interviews: 0 });
  const [visibleElements, setVisibleElements] = useState(new Set());

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const demoRef = useRef(null);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  // Mock data for applications
  const jobsMock = [
    {
      id: 1,
      company: "Google",
      role: "Senior Product Manager",
      status: "Interview",
      date: "2025-06-10",
      logo: "google"
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Software Engineer",
      status: "Applied",
      date: "2025-06-13",
      logo: "microsoft"
    },
    {
      id: 3,
      company: "Apple",
      role: "UX Designer",
      status: "Next Stage",
      date: "2025-06-05",
      logo: "apple"
    }
  ];

  const features = [
    {
      id: 1,
      title: "Smart Application Tracking",
      description: "Automatically capture job details from any website. Never lose track of where you applied or when to follow up.",
      icon: <ClipboardDocumentCheckIcon className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Progress Visualization",
      description: "See your job search pipeline at a glance. Move applications through stages from 'Applied' to 'Offer' with ease.",
      icon: <PresentationChartLineIcon className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Analytics & Insights",
      description: "Get data-driven insights about your job search performance. Identify what's working and optimize your strategy.",
      icon: <ChartBarIcon className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Interview Scheduler",
      description: "Manage interview schedules, set reminders, and prepare with company research tools all in one place.",
      icon: <CalendarIcon className="w-8 h-8" />
    },
    {
      id: 5,
      title: "Document Management",
      description: "Store and organize resumes, cover letters, and portfolio pieces. Access the right version instantly.",
      icon: <DocumentDuplicateIcon className="w-8 h-8" />
    },
    {
      id: 6,
      title: "Team Collaboration",
      description: "Share your job search progress with mentors, career coaches, or accountability partners for better support.",
      icon: <UserGroupIcon className="w-8 h-8" />
    }
  ];

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);

      // Parallax effect for floating cards
      const floatingCards = document.querySelectorAll('.floating-card');
      floatingCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrollTop * speed);
        card.style.transform = `translateY(${yPos}px) rotate(${scrollTop * 0.01}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.dataset.animate));

            // Start counter animation for stats
            if (entry.target.dataset.animate === 'stats' && !visibleElements.has('stats')) {
              animateCounters();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = [heroRef.current, featuresRef.current, demoRef.current, statsRef.current];
    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, [visibleElements]);

  // Counter animation
  const animateCounters = () => {
    const targets = { users: 50, applications: 2000, interviews: 73 };
    const duration = 2000;
    const increment = 50;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const target = targets[key];
      const step = target / (duration / increment);

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, increment);
    });
  };

  // Button click handler with ripple effect
  const handleButtonClick = (event, action) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      transform: scale(0);
      z-index: 1;
      animation: ripple 0.6s ease-out;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    // // Handle specific actions
    // if (action === 'signup') {
    //   showNotification('🎉 Welcome! Sign up functionality coming soon!', 'success');
    // CUSTOM: Go to tracker page when 'signup' (or whatever you want the action to be)
    if (action === 'signup') {
      navigate("/tracker");
    } else if (action === 'demo') {
      showNotification('Demo request received! We\'ll contact you soon.', 'info');
    }
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const colors = {
      success: '#10B981',
      error: '#EF4444',
      info: '#3B82F6'
    };

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      font-weight: 500;
      max-width: 300px;
      transform: translateX(400px);
      opacity: 0;
      animation: slideIn 0.5s ease-out forwards, slideOut 0.3s ease-in 2.7s forwards;
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="6" width="24" height="3" rx="1.5" fill="url(#gradient1)" />
                <rect x="4" y="12" width="18" height="3" rx="1.5" fill="url(#gradient1)" />
                <rect x="4" y="18" width="20" height="3" rx="1.5" fill="url(#gradient1)" />
                <rect x="4" y="24" width="16" height="3" rx="1.5" fill="url(#gradient1)" />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-name">Job Tracked</span>
          </div>

          <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <button className="nav-link" onClick={() => navigate('/features')}>
              Features
            </button>
            <button className="nav-link" onClick={() => scrollToSection('how-it-works')}>
              How It Works
            </button>
            <button className="nav-link" onClick={() => navigate('/about')}>
              About
            </button>

            {isUserLoggedIn() ? (
              <>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate('/tracker')}
                >
                  Dashboard
                </button>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    await logoutUser();
                    navigate('/');
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>

                <button
                  className="btn btn-primary"
                  onClick={(e) => handleButtonClick(e, 'signup')}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <div
            className={`nav-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero"
        ref={heroRef}
        data-animate="hero"
      >
        <div className="hero-background">
          <div className="floating-elements">
            <div className="floating-card card-1"></div>
            <div className="floating-card card-2"></div>
            <div className="floating-card card-3"></div>
          </div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className={`hero-title ${visibleElements.has('hero') ? 'animate-in' : ''}`}>
                <span className="title-line">Transform Your</span>
                <span className="title-line gradient-text">Job Search Journey</span>
              </h1>

              <p className={`hero-description ${visibleElements.has('hero') ? 'animate-in delay-200' : ''}`}>
                Stop losing track of opportunities. Our intelligent platform helps you organize applications,
                track progress, and land your dream job 3x faster with powerful analytics and automation.
              </p>

              <div
                className={`hero-stats ${visibleElements.has('hero') ? 'animate-in delay-400' : ''}`}
                ref={statsRef}
                data-animate="stats"
              >
                <div className="stat-item">
                  <span className="stat-number">{counters.users}k+</span>
                  <span className="stat-label">Job Seekers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{counters.applications >= 1000 ? `${(counters.applications / 1000).toFixed(1)}M+` : `${counters.applications}+`}</span>
                  <span className="stat-label">Applications Tracked</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{counters.interviews}%</span>
                  <span className="stat-label">Interview Rate</span>
                </div>
              </div>

              <div className={`hero-buttons ${visibleElements.has('hero') ? 'animate-in delay-600' : ''}`}>
                <button
                  className="btn btn-primary btn-large"
                  onClick={(e) => handleButtonClick(e, 'signup')}
                >
                  Start Tracking Free
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="btn btn-ghost btn-large"
                  onClick={(e) => handleButtonClick(e, 'demo')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M8 5l7 5-7 5V5z" fill="currentColor" />
                  </svg>
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className={`dashboard-preview ${visibleElements.has('hero') ? 'animate-in delay-800' : ''}`}>
                <div className="dashboard-header">
                  <div className="dashboard-tabs">
                    <div className="tab active">Dashboard</div>
                    <div className="tab">Applications</div>
                    <div className="tab">Calendar</div>
                  </div>
                  <div className="dashboard-actions">
                    <button className="action-btn">+ Add Job</button>
                  </div>
                </div>

                <div className="dashboard-content">
                  <div className="progress-cards">
                    <div className="progress-card applied">
                      <div className="card-header">
                        <span className="card-title">Applied</span>
                        <span className="card-count">12</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div className="progress-card interview">
                      <div className="card-header">
                        <span className="card-title">Interview</span>
                        <span className="card-count">5</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className="progress-card offer">
                      <div className="card-header">
                        <span className="card-title">Offers</span>
                        <span className="card-count">2</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="job-list">
                    {jobsMock.map((job, index) => (
                      <div key={job.id} className="job-item" style={{ animationDelay: `${index * 150}ms` }}>
                        <div className={`company-logo ${job.logo}`}></div>
                        <div className="job-details">
                          <h4>{job.role}</h4>
                          <p>{job.company} • Remote</p>
                        </div>
                        <span className={`status-badge ${job.status.toLowerCase().replace(' ', '-')}`}>
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="features"
        id="features"
        ref={featuresRef}
        data-animate="features"
      >
        <div className="container">
          <div className={`section-header ${visibleElements.has('features') ? 'animate-in' : ''}`}>
            <h2 className="section-title">Everything You Need to Land Your Dream Job</h2>
            <p className="section-description">
              Powerful tools designed to streamline your job search and maximize your success rate
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-card ${visibleElements.has('features') ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="feature-icon text-indigo-600 bg-indigo-50 p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        className="demo-section"
        id="how-it-works"
        ref={demoRef}
        data-animate="demo"
      >
        <div className="container">
          <div className="demo-content">
            <div className="demo-text">
              <h2 className={`${visibleElements.has('demo') ? 'animate-in' : ''}`}>
                See Your Job Search Success Unfold
              </h2>
              <p className={`${visibleElements.has('demo') ? 'animate-in delay-200' : ''}`}>
                Transform chaos into clarity with our intuitive dashboard. Watch as your applications
                move seamlessly through each stage of your journey.
              </p>
              <div className={`demo-features ${visibleElements.has('demo') ? 'animate-in delay-400' : ''}`}>
                <div className="demo-feature">
                  <div className="feature-check flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span>One-click job saving from any site</span>
                </div>
                <div className="demo-feature">
                  <div className="feature-check flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span>Automated follow-up reminders</span>
                </div>
                <div className="demo-feature">
                  <div className="feature-check flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span>Real-time progress tracking</span>
                </div>
                <div className="demo-feature">
                  <div className="feature-check flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span>Interview preparation tools</span>
                </div>
              </div>
            </div>

            <div className="demo-visual">
              <div className={`demo-dashboard ${visibleElements.has('demo') ? 'animate-in delay-600' : ''}`}>
                <div className="demo-cards-container">
                  <div className="demo-card applied-card">
                    <h4>Applied</h4>
                    <div className="card-count">8</div>
                    <div className="card-jobs">
                      <div className="job-pill">Google PM</div>
                      <div className="job-pill">Tesla Engineer</div>
                      <div className="job-pill">Spotify Designer</div>
                    </div>
                  </div>
                  <div className="demo-card interview-card">
                    <h4>Interview</h4>
                    <div className="card-count">3</div>
                    <div className="card-jobs">
                      <div className="job-pill">Microsoft Dev</div>
                      <div className="job-pill">Airbnb PM</div>
                    </div>
                  </div>
                  <div className="demo-card offer-card">
                    <h4>Offers</h4>
                    <div className="card-count">1</div>
                    <div className="card-jobs">
                      <div className="job-pill">Apple Designer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Job Search?</h2>
            <p>Join thousands of successful job seekers who found their dream careers faster with Job Tracked</p>
            <div className="cta-buttons">
              <button
                className="btn btn-primary btn-large"
                onClick={(e) => handleButtonClick(e, 'signup')}
              >
                Get Started Free
              </button>
              <button
                className="btn btn-outline btn-large"
                onClick={(e) => handleButtonClick(e, 'demo')}
              >
                Schedule Demo
              </button>
            </div>
            <div className="cta-guarantee">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#10B981" strokeWidth="1.5" />
              </svg>
              <span>30-day money-back guarantee • No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="about">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="6" width="24" height="3" rx="1.5" fill="url(#gradient-footer)" />
                    <rect x="4" y="12" width="18" height="3" rx="1.5" fill="url(#gradient-footer)" />
                    <rect x="4" y="18" width="20" height="3" rx="1.5" fill="url(#gradient-footer)" />
                    <rect x="4" y="24" width="16" height="3" rx="1.5" fill="url(#gradient-footer)" />
                    <defs>
                      <linearGradient id="gradient-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span>Job Tracked</span>
              </div>
              <p>The all-in-one job application tracker designed for modern professionals. Stay organized, stay ahead, and land your next big role with confidence.</p>
              <div className="footer-socials">
                <a href="#" className="social-link" title="Twitter">𝕏</a>
                <a href="#" className="social-link" title="LinkedIn">in</a>
                <a href="#" className="social-link" title="GitHub">hub</a>
                <a href="#" className="social-link" title="Discord">dis</a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">Workflow</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="/tracker">Dashboard</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Job Search Tips</a></li>
                <li><a href="#">Resume Guide</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-links">
              <a href="#">Status</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobTracked;
