import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isUserLoggedIn } from '../services/auth-service';
import {
  ViewColumnsIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CommandLineIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
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

  // Scroll Story Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.3, rootMargin: "-50px" });

    const chapters = document.querySelectorAll('.story-chapter');
    chapters.forEach(chapter => observer.observe(chapter));

    return () => chapters.forEach(chapter => observer.unobserve(chapter));
  }, []);

  const featureCards = [
    {
      title: "Smart Kanban Board",
      description: "Visualize your entire job search pipeline. Drag and drop applications between stages with smooth animations and instant cloud sync.",
      icon: <ViewColumnsIcon className="w-6 h-6" />,
      color: "blue",
      details: ["Drag & Drop Interface", "Status Auto-Updates", "Real-time Sync"]
    },
    {
      title: "Powerful Analytics",
      description: "Track your success rates and identify bottlenecks. See which companies respond fastest and optimize your application strategy.",
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: "purple",
      details: ["Success Rate Charts", "Time-to-Offer Tracking", "Company Response Stats"]
    },
    {
      title: "Unified Document Vault",
      description: "Keep every resume, cover letter, and portfolio version organized. Attach them directly to your applications for instant access.",
      icon: <DocumentTextIcon className="w-6 h-6" />,
      color: "indigo",
      details: ["Multiple Version Support", "Cloud Storage Integration", "Instant Preview"]
    },
    {
      title: "Interview Intelligent Hub",
      description: "Never miss a beat with our intelligent interview manager. Automated reminders, company research tools, and preparation checklists.",
      icon: <CalendarIcon className="w-6 h-6" />,
      color: "cyan",
      details: ["Automatic Reminders", "Company Research Feed", "Preparation Checklists"]
    },
    {
      title: "Salary Comparison Tool",
      description: "Benchmark your offers against industry standards. View salary ranges for similar roles and locations to negotiate with confidence.",
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      color: "emerald",
      details: ["Industry Benchmarking", "Negotiation Guides", "Location Adjustments"]
    },
    {
      title: "Browser Extension",
      description: "Clip jobs directly from LinkedIn, Indeed, and glassdoor with a single click. No more manual data entry or switching tabs.",
      icon: <CommandLineIcon className="w-6 h-6" />,
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

      {/* Hero Section - "Build in AI Speed" Style */}
      <header className="features-hero-v2">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content-left animate-in">
              <h1 className="hero-title">Build Your <br /><span className="text-gradient-purple">Career at Speed</span></h1>
              <p className="hero-subtitle">
                Compose your dream career with enterprise-grade tracking, analytics, and automation tools.
              </p>

              <div className="prompt-box-simulation">
                <div className="prompt-icon">✨</div>
                <div className="prompt-text">
                  <span className="typing-text">Help me land a Senior Product Manager role at Google...</span>
                  <span className="cursor">|</span>
                </div>
                <button className="prompt-btn"><ArrowRightIcon className="w-5 h-5" /></button>
              </div>

              <div className="hero-tags">
                <span><CheckCircleIcon className="w-4 h-4" /> Auto-Parsing</span>
                <span><CheckCircleIcon className="w-4 h-4" /> AI Insights</span>
                <span><CheckCircleIcon className="w-4 h-4" /> Salary Benchmarking</span>
              </div>
            </div>

            <div className="hero-visual-right animate-in delay-200">
              <div className="app-window glassy">
                <div className="window-header">
                  <div className="dots"><span></span><span></span><span></span></div>
                  <div className="address-bar">job-tracked.app/dashboard</div>
                </div>
                <div className="window-content">
                  <div className="sidebar-mock"></div>
                  <div className="main-mock">
                    <div className="mock-card card-applied">
                      <div className="mock-icon bg-blue-500">G</div>
                      <div className="mock-lines"></div>
                    </div>
                    <div className="connecting-arrow-curved"></div>
                    <div className="mock-card card-interview">
                      <div className="mock-icon bg-purple-500">M</div>
                      <div className="mock-lines"></div>
                      <div className="status-badge-mock">Interview</div>
                    </div>
                  </div>
                </div>
                {/* Floating "Composable" elements */}
                <div className="floating-badge badge-1">
                  <BriefcaseIcon className="w-4 h-4" /> Application Added
                </div>
                <div className="floating-badge badge-2">
                  <ChartBarIcon className="w-4 h-4" /> Analytics Updated
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Process Flow - "Performance Testing" Stepped Style */}
      <section className="process-flow-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">The Performance Workflow</h2>
            <p className="section-description">A streamlined path from application to offer.</p>
          </div>

          <div className="process-steps">
            {/* Step 1 */}
            <div className="process-card step-1">
              <div className="card-top-accent purple"></div>
              <div className="step-icon-circle"><CommandLineIcon className="w-5 h-5" /></div>
              <h3>Capture</h3>
              <ul className="step-list">
                <li>One-click extension</li>
                <li>Auto-fill details</li>
                <li>Screenshot job description</li>
              </ul>
            </div>

            {/* Connector */}
            <div className="step-connector">
              <svg width="100" height="40" viewBox="0 0 100 40">
                <path d="M0,20 C50,20 50,20 100,20" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="process-card step-2">
              <div className="card-top-accent pink"></div>
              <div className="step-icon-circle"><ViewColumnsIcon className="w-5 h-5" /></div>
              <h3>Track</h3>
              <ul className="step-list">
                <li>Kanban Board</li>
                <li>Status Timelines</li>
                <li>interview Reminders</li>
              </ul>
            </div>

            {/* Connector */}
            <div className="step-connector">
              <svg width="100" height="40" viewBox="0 0 100 40">
                <path d="M0,20 C50,20 50,20 100,20" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="process-card step-3">
              <div className="card-top-accent blue"></div>
              <div className="step-icon-circle"><CurrencyDollarIcon className="w-5 h-5" /></div>
              <h3>Negotiate</h3>
              <ul className="step-list">
                <li>Offer comparison</li>
                <li>Equity calculator</li>
                <li>Email templates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Architecture - "Micro Frontends" Network Style */}
      <section className="ecosystem-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Composable Career Architecture</h2>
            <p className="section-description">Your data, connected and working together in harmony.</p>
          </div>

          <div className="architecture-diagram">
            {/* Center Node */}
            <div className="arch-node center-node">
              <div className="node-header">
                <span className="dot yellow"></span>
                <strong>Core Dashboard</strong>
              </div>
              <div className="node-body">
                Central Source of Truth
              </div>
              <div className="node-pill">v2.4.0</div>
            </div>

            {/* Connected Nodes */}
            <div className="arch-node node-docs">
              <div className="node-header"><strong className="text-purple-600">Documents</strong></div>
              <div className="node-body">Resumes & Cover Letters</div>
              <div className="node-status"><CheckCircleIcon className="w-3 h-3 text-green-500" /> Synced</div>
            </div>

            <div className="arch-node node-analytics">
              <div className="node-header"><strong className="text-blue-600">Analytics</strong></div>
              <div className="node-body">Success Rate & Insights</div>
              <div className="node-status"><CheckCircleIcon className="w-3 h-3 text-green-500" /> Live</div>
            </div>

            <div className="arch-node node-calendar">
              <div className="node-header"><strong className="text-pink-600">Scheduler</strong></div>
              <div className="node-body">Interviews & Follow-ups</div>
              <div className="node-status"><CheckCircleIcon className="w-3 h-3 text-green-500" /> Active</div>
            </div>

            {/* Connecting Lines (Decorative via CSS/SVG) */}
            <svg className="arch-connections" width="100%" height="100%">
              <path className="conn-line" d="M50% 50% L25% 25%" />
              <path className="conn-line" d="M50% 50% L75% 25%" />
              <path className="conn-line" d="M50% 50% L50% 80%" />
            </svg>
          </div>
        </div>
      </section>

      {/* Scroll Story Section - "Zoom In Experience" */}
      <section className="scroll-story-section">
        <div className="container">
          <div className="story-intro center animate-in">
            <h2 className="section-title">Your Journey to the <span className="text-gradient-purple">Perfect Offer</span></h2>
            <p className="section-description">Scroll to experience the workflow used by top 1% of job seekers.</p>
          </div>

          <div className="story-timeline">
            <div className="timeline-line"></div>

            {/* Chapter 1: Capture */}
            <div className="story-chapter zoom-effect">
              <div className="chapter-content">
                <span className="chapter-number">01</span>
                <h3>Capture Opportunity</h3>
                <p>Stop copy-pasting. Our browser extension detects job details from LinkedIn, Indeed, and Glassdoor instantly.</p>
                <ul className="chapter-list">
                  <li><CheckCircleIcon className="w-5 h-5 text-indigo-500" /> One-click Save</li>
                  <li><CheckCircleIcon className="w-5 h-5 text-indigo-500" /> screenshot Job Description</li>
                </ul>
              </div>
              <div className="chapter-visual">
                <div className="visual-card browser-mockup">
                  <div className="browser-header">
                    <div className="dots"><span></span><span></span><span></span></div>
                  </div>
                  <div className="browser-body">
                    <div className="job-post-mock">
                      <div className="post-header"></div>
                      <div className="post-lines"></div>
                      <div className="save-btn-floating">
                        <BriefcaseIcon className="w-4 h-4 text-white" /> Save Job
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter 2: Organize */}
            <div className="story-chapter zoom-effect reverse">
              <div className="chapter-content">
                <span className="chapter-number">02</span>
                <h3>Visual Organization</h3>
                <p>Transform your messy spreadsheet into a dynamic Kanban board. Drag, drop, and visualize your progress.</p>
                <ul className="chapter-list">
                  <li><CheckCircleIcon className="w-5 h-5 text-pink-600" /> Drag & Drop Interface</li>
                  <li><CheckCircleIcon className="w-5 h-5 text-pink-600" /> Smart Status Tags</li>
                </ul>
              </div>
              <div className="chapter-visual">
                <div className="visual-card kanban-mockup">
                  <div className="kanban-col-mock">
                    <div className="card-mock"></div>
                    <div className="card-mock"></div>
                  </div>
                  <div className="kanban-col-mock active">
                    <div className="card-mock accent"></div>
                  </div>
                  <div className="hand-cursor">👆</div>
                </div>
              </div>
            </div>

            {/* Chapter 3: Optimize */}
            <div className="story-chapter zoom-effect">
              <div className="chapter-content">
                <span className="chapter-number">03</span>
                <h3>Data-Driven Insights</h3>
                <p>Understand your conversion rates. Know which resumes work, which companies respond, and where to focus.</p>
                <ul className="chapter-list">
                  <li><CheckCircleIcon className="w-5 h-5 text-blue-500" /> Funnel Visualization</li>
                  <li><CheckCircleIcon className="w-5 h-5 text-blue-500" /> A/B Test Resumes</li>
                </ul>
              </div>
              <div className="chapter-visual">
                <div className="visual-card analytics-mockup">
                  <div className="chart-area">
                    <div className="bar" style={{ height: '40%' }}></div>
                    <div className="bar" style={{ height: '60%' }}></div>
                    <div className="bar active" style={{ height: '85%' }}></div>
                    <div className="bar" style={{ height: '55%' }}></div>
                  </div>
                  <div className="floating-stat">
                    <span className="label">Start Rate</span>
                    <span className="value">+24%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter 4: Succeed */}
            <div className="story-chapter zoom-effect reverse">
              <div className="chapter-content">
                <span className="chapter-number">04</span>
                <h3>Negotiate & Accept</h3>
                <p>Don't leave money on the table. Use our salary benchmarking and offer comparison tools to get what you deserve.</p>
                <ul className="chapter-list">
                  <li><CheckCircleIcon className="w-5 h-5 text-green-500" /> Salary Data</li>
                  <li><CheckCircleIcon className="w-5 h-5 text-green-500" /> Equity Calculator</li>
                </ul>
              </div>
              <div className="chapter-visual">
                <div className="visual-card offer-mockup">
                  <div className="party-popper">🎉</div>
                  <h3>Offer Letter</h3>
                  <div className="offer-price">$145,000</div>
                  <button className="accept-btn">Accept Offer</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Usage Examples / Crazy Good Section (Renamed/Integrated) */}
      <section className="usage-examples-section">
        <div className="container">
          <div className="usage-header animate-in">
            <h2>Real-World <span className="text-gradient">Workflows</span></h2>
            <p>See how top professionals use Job Tracked to stay ahead.</p>
          </div>

          <div className="crazy-cards-grid">
            {/* Crazy Card 1: Job Application Card */}
            <div className="crazy-card job-card animate-in delay-200">
              <div className="crazy-card-header">
                <div className="company-logo-placeholder bg-blue-500">G</div>
                <div className="crazy-card-info">
                  <h4>Senior Product Manager</h4>
                  <p>Google • Remote</p>
                </div>
                <span className="status-pill status-interview">Interview</span>
              </div>
              <div className="crazy-card-body">
                <div className="mini-stat">
                  <span className="label">Applied</span>
                  <span className="value">2 days ago</span>
                </div>
                <div className="mini-stat">
                  <span className="label">Salary</span>
                  <span className="value">$180k - $220k</span>
                </div>
              </div>
              <div className="crazy-card-footer">
                <button className="btn-mini">View Notes</button>
                <div className="avatars">
                  <div className="avatar">JD</div>
                </div>
              </div>
            </div>

            {/* Crazy Card 2: Analytics Graph Visual */}
            <div className="crazy-card analytics-card animate-in delay-400">
              <div className="crazy-card-header">
                <h4>Weekly Activity</h4>
                <span className="trend-up">
                  <ArrowRightIcon className="w-4 h-4 transform -rotate-44" /> +12%
                </span>
              </div>
              <div className="graph-bars">
                <div className="bar" style={{ height: '40%' }}></div>
                <div className="bar" style={{ height: '65%' }}></div>
                <div className="bar active" style={{ height: '85%' }}></div>
                <div className="bar" style={{ height: '55%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
              </div>
              <div className="graph-labels">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span>
              </div>
            </div>

            {/* Crazy Card 3: Offer Letter */}
            <div className="crazy-card offer-card animate-in delay-600">
              <div className="crazy-card-header">
                <BriefcaseIcon className="w-6 h-6 text-emerald-500" />
                <span className="status-pill status-accepted">Offer Received</span>
              </div>
              <div className="offer-amount">
                <span className="currency">$</span>145,000
              </div>
              <div className="offer-details">
                <div className="detail-row">
                  <span>Equity</span>
                  <strong>0.05%</strong>
                </div>
                <div className="detail-row">
                  <span>Bonus</span>
                  <strong>15%</strong>
                </div>
              </div>
              <button className="btn-full-width btn-primary">Review Offer</button>
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
          background: #f8fafc;
          color: #0f172a;
          min-height: 100vh;
          padding-top: 80px;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        /* --- V2 HERO SECTION (Build in AI Speed) --- */
        .features-hero-v2 {
           padding: 80px 0;
           background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 60%);
        }

        .hero-grid {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 60px;
           align-items: center;
        }

        .hero-title {
           font-size: 4rem;
           font-weight: 800;
           line-height: 1.1;
           margin-bottom: 24px;
           color: #1e293b;
        }

        .text-gradient-purple {
           background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
           font-size: 1.25rem;
           color: #64748b;
           margin-bottom: 40px;
           max-width: 90%;
           line-height: 1.6;
        }

        /* Prompt Box Simulation */
        .prompt-box-simulation {
           background: white;
           border: 1px solid #e2e8f0;
           border-radius: 16px;
           padding: 16px 20px;
           display: flex;
           align-items: center;
           gap: 16px;
           box-shadow: 0 10px 30px -5px rgba(0,0,0,0.08);
           margin-bottom: 32px;
           max-width: 500px;
        }

        .prompt-icon {
           font-size: 1.25rem;
        }

        .prompt-text {
           flex: 1;
           font-family: 'Courier New', monospace;
           font-size: 0.95rem;
           color: #334155;
           display: flex;
           align-items: center;
        }
        
        .cursor {
           animation: blink 1s infinite;
           color: #6366f1;
           margin-left: 2px;
        }
        
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .prompt-btn {
           background: #1e293b;
           color: white;
           border: none;
           width: 36px;
           height: 36px;
           border-radius: 8px;
           display: flex;
           align-items: center;
           justify-content: center;
           cursor: pointer;
           transition: background 0.2s;
        }
        
        .prompt-btn:hover { background: #6366f1; }

        .hero-tags {
           display: flex;
           gap: 20px;
           color: #64748b;
           font-size: 0.9rem;
           font-weight: 500;
        }
        
        .hero-tags span { display: flex; align-items: center; gap: 6px; }

        /* Window Mockup */
        .app-window.glassy {
           background: rgba(255, 255, 255, 0.7);
           backdrop-filter: blur(20px);
           border: 1px solid rgba(255, 255, 255, 0.5);
           border-radius: 20px;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
           padding: 20px;
           position: relative;
           height: 400px;
           width: 100%;
        }

        .window-header {
           display: flex;
           gap: 16px;
           margin-bottom: 20px;
           align-items: center;
        }

        .dots { display: flex; gap: 6px; }
        .dots span { width: 10px; height: 10px; border-radius: 50%; background: #e2e8f0; }
        .dots span:nth-child(1) { background: #ef4444; }
        .dots span:nth-child(2) { background: #f59e0b; }
        .dots span:nth-child(3) { background: #22c55e; }

        .address-bar {
           background: #f1f5f9;
           flex: 1;
           height: 28px;
           border-radius: 6px;
           display: flex;
           align-items: center;
           padding-left: 12px;
           font-size: 0.8rem;
           color: #94a3b8;
        }

        .floating-badge {
           position: absolute;
           background: white;
           padding: 10px 16px;
           border-radius: 12px;
           box-shadow: 0 10px 20px rgba(0,0,0,0.1);
           display: flex;
           align-items: center;
           gap: 8px;
           font-size: 0.85rem;
           font-weight: 600;
           color: #1e293b;
           border: 1px solid #e2e8f0;
           animation: float 4s ease-in-out infinite;
        }
        
        .badge-1 { top: 60px; right: -20px; animation-delay: 0s; }
        .badge-2 { bottom: 40px; left: -20px; animation-delay: 2s; }
        
        @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }


        /* --- PROCESS FLOW (Performance Testing Style) --- */
        .process-flow-section {
           padding: 100px 0;
           background: white;
        }

        .process-steps {
           display: flex;
           align-items: center;
           justify-content: center;
           margin-top: 60px;
           flex-wrap: wrap;
           gap: 20px;
        }

        .process-card {
           background: white;
           border: 1px solid #e2e8f0;
           border-radius: 16px;
           padding: 24px;
           width: 280px;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
           position: relative;
           overflow: hidden;
           transition: transform 0.3s;
        }

        .process-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }

        .card-top-accent { height: 6px; width: 100%; position: absolute; top: 0; left: 0; }
        .card-top-accent.purple { background: #a855f7; }
        .card-top-accent.pink { background: #ec4899; }
        .card-top-accent.blue { background: #3b82f6; }

        .step-icon-circle {
           width: 48px;
           height: 48px;
           background: #f8fafc;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           margin-bottom: 20px;
           color: #475569;
        }

        .process-card h3 { font-size: 1.25rem; margin-bottom: 12px; color: #1e293b; }

        .step-list { list-style: none; padding: 0; color: #64748b; font-size: 0.9rem; }
        .step-list li { margin-bottom: 8px; position: relative; padding-left: 16px; }
        .step-list li::before { content: '•'; position: absolute; left: 0; color: #cbd5e1; }
        
        .step-connector { display: none; }
        @media (min-width: 1024px) {
           .step-connector { display: block; width: 80px; }
        }


        /* --- ECOSYSTEM (Micro Frontends Style) --- */
        .ecosystem-section {
           padding: 100px 0;
           background: #f8fafc;
           overflow: hidden;
        }

        .architecture-diagram {
           position: relative;
           height: 500px;
           background: white;
           border-radius: 32px;
           border: 1px solid #e2e8f0;
           margin-top: 60px;
           display: flex;
           align-items: center;
           justify-content: center;
           box-shadow: inset 0 0 100px rgba(0,0,0,0.02);
        }

        .arch-node {
           background: white;
           padding: 20px;
           border-radius: 16px;
           box-shadow: 0 10px 30px -5px rgba(0,0,0,0.1);
           border: 1px solid #e2e8f0;
           width: 220px;
           position: absolute;
           z-index: 10;
        }

        .center-node {
           z-index: 20;
           border-width: 2px;
           border-color: #3b82f6;
           transform: scale(1.1);
        }

        .arch-connections {
           position: absolute;
           top: 0; left: 0;
           pointer-events: none;
        }
        
        .conn-line {
           stroke: #cbd5e1;
           stroke-width: 2;
           fill: none;
           stroke-dasharray: 6 6;
        }

        .node-docs { top: 60px; left: 10%; }
        .node-analytics { top: 60px; right: 10%; }
        .node-calendar { bottom: 60px; left: 50%; transform: translateX(-50%); }

        .node-header { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; margin-bottom: 8px; }
        .node-body { font-size: 0.85rem; color: #64748b; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.yellow { background: #facc15; }
        
        .node-pill {
           background: #eff6ff;
           color: #3b82f6;
           font-size: 0.75rem;
           padding: 2px 8px;
           border-radius: 99px;
           display: inline-block;
           margin-top: 8px;
        }
        
        .node-status {
           margin-top: 12px;
           padding-top: 12px;
           border-top: 1px solid #f1f5f9;
           font-size: 0.75rem;
           display: flex;
           align-items: center;
           gap: 6px;
           color: #1e293b;
           font-weight: 500;
        }

        @media (max-width: 1024px) {
           .hero-grid { grid-template-columns: 1fr; text-align: center; }
           .prompt-box-simulation { margin: 0 auto 32px; }
           .hero-tags { justify-content: center; }
           .architecture-diagram { height: auto; padding: 40px; display: flex; flex-direction: column; gap: 40px; }
           .arch-node { position: static; transform: none !important; width: 100%; }
           .arch-connections { display: none; }
           
           .story-container { grid-template-columns: 1fr; }
           .story-chapter { flex-direction: column !important; text-align: center; }
           .chapter-list { align-items: center; }
        }

        /* --- SCROLL STORY STYLES --- */
        .scroll-story-section {
           padding: 120px 0;
           background: #ffffff;
        }

        .story-intro { margin-bottom: 80px; text-align: center; }
        .story-intro .section-description { max-width: 600px; margin: 0 auto; color: #64748b; font-size: 1.2rem; }

        .story-timeline {
           position: relative;
           max-width: 1000px;
           margin: 0 auto;
        }

        .timeline-line {
           position: absolute;
           top: 0; bottom: 0; left: 50%;
           width: 2px;
           background: #e2e8f0;
           transform: translateX(-50%);
           z-index: 0;
           display: none; /* Hidden on mobile, shown on desktop if needed or kept minimal */
        }
        
        .story-chapter {
           display: flex;
           align-items: center;
           gap: 60px;
           margin-bottom: 120px;
           opacity: 0;
           transform: scale(0.9) translateY(40px);
           transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .story-chapter.active {
           opacity: 1;
           transform: scale(1) translateY(0);
        }

        .story-chapter.reverse { flex-direction: row-reverse; }

        .chapter-content { flex: 1; z-index: 2; }
        .chapter-visual { flex: 1.2; z-index: 2; }

        .chapter-number {
           font-size: 5rem;
           font-weight: 900;
           color: #f1f5f9;
           line-height: 1;
           display: block;
           margin-bottom: -20px;
           position: relative;
           z-index: -1;
        }

        .chapter-content h3 { font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; }
        .chapter-content p { font-size: 1.1rem; color: #64748b; margin-bottom: 1.5rem; line-height: 1.7; }

        .chapter-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .chapter-list li { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #334155; }

        .visual-card {
           background: #f8fafc;
           border-radius: 20px;
           border: 1px solid #e2e8f0;
           padding: 24px;
           box-shadow: 0 20px 40px -5px rgba(0,0,0,0.1);
           transition: transform 0.4s ease;
           overflow: hidden;
           height: 300px;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           position: relative;
        }
        
        .story-chapter.active .visual-card { transform: translateY(-10px); }

        /* Mockup Specifics */
        .browser-mockup { justify-content: flex-start; padding: 0; background: white; }
        .browser-header { width: 100%; height: 32px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; padding: 0 16px; }
        .browser-body { width: 100%; padding: 20px; }
        .job-post-mock { background: #f8fafc; border-radius: 8px; height: 160px; position: relative; border: 1px solid #e2e8f0; }
        .post-header { width: 60%; height: 20px; background: #cbd5e1; border-radius: 4px; margin: 20px; }
        .post-lines { width: 80%; height: 10px; background: #e2e8f0; margin: 0 20px 10px; border-radius: 2px; }
        .save-btn-floating { position: absolute; bottom: 20px; right: 20px; background: #3b82f6; color: white; padding: 8px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; gap: 6px; box-shadow: 0 5px 15px rgba(59,130,246,0.3); animation: bounce 2s infinite; }

        .kanban-mockup { flex-direction: row; gap: 12px; align-items: flex-start; padding-top: 40px; background: white; }
        .kanban-col-mock { width: 45%; background: #f1f5f9; border-radius: 8px; height: 100%; padding: 10px; }
        .kanban-col-mock.active { background: #eff6ff; border: 1px dashed #3b82f6; }
        .card-mock { width: 100%; height: 60px; background: white; border-radius: 6px; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .card-mock.accent { border-left: 4px solid #ec4899; }
        .hand-cursor { font-size: 2rem; position: absolute; bottom: 20px; right: 30%; animation: moveHand 3s infinite; }
        @keyframes moveHand { 0% { transform: translate(0, 0); } 50% { transform: translate(50px, -50px); } 100% { transform: translate(0, 0); } }

        .analytics-mockup { background: white; }
        .chart-area { display: flex; align-items: flex-end; gap: 12px; height: 150px; }
        .floating-stat { position: absolute; top: 20px; left: 20px; background: white; padding: 8px 12px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 5px 15px rgba(0,0,0,0.05); text-align: center; }
        .floating-stat .label { display: block; font-size: 0.7rem; color: #94a3b8; }
        .floating-stat .value { font-weight: 700; color: #10b981; }

        .offer-mockup { background: #f0fdf4; border-color: #86efac; }
        .offer-price { font-size: 2.5rem; font-weight: 800; color: #15803d; margin: 20px 0; }
        .accept-btn { background: #15803d; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; }
        .party-popper { font-size: 3rem; animation: wobble 2s infinite; }
        @keyframes wobble { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }

        /* --- USAGE EXAMPLES / CRAZY CARDS SECTION --- */
        .usage-examples-section {
          padding: 100px 0;
          background: #f8fafc;
        }

        .usage-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .usage-header h2 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #0f172a;
        }

        .usage-header p {
          font-size: 1.2rem;
          color: #64748b;
        }

        .crazy-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-top: 60px;
        }

        .crazy-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          overflow: hidden;
        }

        .crazy-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.15);
          border-color: #cbd5e1;
        }

        /* Card 1: Job Application Card */
        .crazy-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 4px;
        }

        .company-logo-placeholder {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .crazy-card-info {
          flex: 1;
          min-width: 0;
        }

        .crazy-card-info h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .crazy-card-info p {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .status-pill {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .status-interview { background: #dbeafe; color: #2563eb; }
        .status-accepted { background: #dcfce7; color: #16a34a; }

        .crazy-card-body {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          gap: 16px;
        }

        .mini-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mini-stat .label {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mini-stat .value {
          font-size: 0.95rem;
          color: #334155;
          font-weight: 700;
        }

        .crazy-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
        }

        .btn-mini {
          background: transparent;
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 600;
          border: 1px solid #e2e8f0;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-mini:hover {
          background: #f1f5f9;
          color: #334155;
          border-color: #cbd5e1;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        /* Card 2: Analytics Card */
        .analytics-card .crazy-card-header {
          justify-content: space-between;
          width: 100%;
        }

        .analytics-card h4 {
          color: #1e293b;
          font-weight: 700;
          margin: 0;
          font-size: 1.1rem;
        }

        .trend-up {
          color: #10b981;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .graph-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 140px;
          padding: 0 8px;
          gap: 8px;
        }

        .bar {
          flex: 1;
          background: #e2e8f0;
          border-radius: 6px 6px 0 0;
          transition: all 0.3s ease;
          min-height: 20px;
        }

        .bar.active {
          background: #6366f1;
        }

        .bar:hover {
          opacity: 0.8;
        }

        .graph-labels {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px 0;
          color: #94a3b8;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Card 3: Offer Card */
        .offer-card {
          border-top: 4px solid #10b981;
        }

        .offer-card .crazy-card-header {
          justify-content: space-between;
        }

        .offer-amount {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin: 16px 0;
        }

        .offer-amount .currency {
          font-size: 1.5rem;
          margin-top: 4px;
          margin-right: 4px;
          color: #64748b;
        }

        .offer-details {
          background: #f0fdf4;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          justify-content: space-around;
          gap: 16px;
        }

        .detail-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .detail-row span {
          font-size: 0.75rem;
          color: #15803d;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-row strong {
          font-size: 1.25rem;
          color: #14532d;
          font-weight: 800;
        }

        .btn-full-width {
          width: 100%;
          border-radius: 12px;
          padding: 14px;
          font-weight: 700;
          margin-top: 8px;
          font-size: 0.95rem;
        }

        /* CTA Section */
        .features-cta {
          padding: 100px 0;
          background: white;
        }

        .cta-box {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 32px;
          padding: 80px 40px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .cta-box::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-box h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 800;
          position: relative;
          z-index: 1;
        }

        .cta-box p {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 1;
        }

        .cta-box .btn {
          position: relative;
          z-index: 1;
        }

        /* Footer */
        .features-footer {
          padding: 40px 0;
          text-align: center;
          color: #94a3b8;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .features-footer p {
          margin: 0;
          font-size: 0.95rem;
        }

      `}</style>
    </div>
  );
};

export default Features;
