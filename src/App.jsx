import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import Login from './Login'
import './index.css'

const DEFAULT_CONTENT = {
  hero: {
    subtitle: "Premium Real Estate",
    title: "Experience the Art of Living Well",
    description: "Discover a curated collection of the world's most exquisite properties. Ajim Real Estate brings you unparalleled luxury and sophistication."
  },
  about: {
    subtitle: "About Us",
    title: "Redefining Luxury",
    description: "Ajim Real Estate is a boutique firm specializing in high-end residential and commercial properties. With over a decade of experience, we have built a reputation for excellence, integrity, and discretion.",
    address: "Hazi Nagar Demra Dhaka"
  },
  services: [
    {
      title: "Pre‑construction & Planning",
      items: [
        "Feasibility assessment: site constraints, planning policies",
        "Cost estimating and budgeting: detailed takeoffs",
        "Design coordination: architects and engineers",
        "Permits and approvals",
        "Scheduling & Milestone setting"
      ]
    },
    {
      title: "Procurement & Commercial",
      items: [
        "Tendering and subcontractor selection",
        "Material procurement and lead-time management",
        "Contract administration & Variations",
        "Cost control and cashflow forecasting"
      ]
    },
    {
      title: "Site Management",
      items: [
        "Site setup & temporary works",
        "Project management & trade supervision",
        "Construction execution (Structural, MEP, Finishes)",
        "Health, safety and environmental compliance"
      ]
    },
    {
      title: "Quality & Inspections",
      items: [
        "Quality control & inspection checklists",
        "Statutory inspections coordination",
        "Snagging and defects list management"
      ]
    },
    {
      title: "Handover & Closeout",
      items: [
        "Systems commissioning (HVAC, Electrical)",
        "O&M Documentation & warranties",
        "Client handover & walkthroughs"
      ]
    },
    {
      title: "Post-Completion",
      items: [
        "Defects liability period management",
        "Post-occupancy maintenance contracts",
        "Facility upgrade services"
      ]
    }
  ],
  sections: {
    showServices: true,
    showAbout: true,
    showLearnMore: false
  },
  announcement: ""
}

function LandingPage({ content }) {
  return (
    <div className="app">
      {content.announcement && (
        <div className="announcement-bar" style={{
          background: 'var(--accent-gold)',
          color: '#000',
          padding: '0.8rem',
          textAlign: 'center',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          {content.announcement}
        </div>
      )}

      <nav className="navbar">
        <div className="nav-logo">AJIM REAL ESTATE</div>
        <div className="nav-links">
          <a href="#hero">Home</a>
          {content.sections.showServices && <a href="#services">Services</a>}
          {content.sections.showAbout && <a href="#about">About</a>}
          <a href="#contact">Contact</a>
        </div>
        <button className="btn-contact">Get in Touch</button>
      </nav>

      <section id="hero" className="hero">
        <div className="hero-content">
          <span className="hero-subtitle">{content.hero.subtitle}</span>
          <h1 className="hero-title">{content.hero.title}</h1>
          <p className="hero-description">{content.hero.description}</p>
          <div className="hero-cta">
            {content.sections.showServices && <a href="#services" className="btn-primary">Our Services</a>}
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {content.sections.showServices && (
        <section id="services" className="section container">
          <div className="section-header">
            <span className="section-subtitle">What we do</span>
            <h2 className="section-title">Comprehensive Contractor Services</h2>
          </div>

          <p className="service-intro">
            A building contractor coordinates, manages and delivers construction works from project start to completion.
          </p>

          <div className="services-grid">
            {content.services.map((service, idx) => (
              <div key={idx} className="service-category">
                <h3>{service.title}</h3>
                <ul className="service-list">
                  {service.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.sections.showAbout && (
        <section id="about" className="section container" style={{ textAlign: 'center' }}>
          <div className="section-header">
            <span className="section-subtitle">{content.about.subtitle}</span>
            <h2 className="section-title">{content.about.title}</h2>
          </div>
          <p style={{ maxWidth: '800px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
            {content.about.description}
          </p>
          <div style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>
            <p>Address: {content.about.address}</p>
          </div>
        </section>
      )}

      <footer id="contact">
        <div className="container">
          <div className="footer-grid">
            <div>
              <span className="footer-logo">AJIM REAL ESTATE</span>
              <p className="footer-desc">The standard of excellence in luxury real estate.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                {content.sections.showServices && <li><a href="#services">Services</a></li>}
                {content.sections.showAbout && <li><a href="#about">About</a></li>}
              </ul>
            </div>
            <div className="footer-links">
              <h4>Contact Us</h4>
              <ul>
                <li>{content.about.address}</li>
                <li>contact@ajimre.com</li>
                <li>+1 (212) 555-0199</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} Ajim Real Estate. All rights reserved. | <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isCMSAuth') === 'true'
  })

  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('cmsContent')
    return saved ? JSON.parse(saved) : DEFAULT_CONTENT
  })

  useEffect(() => {
    localStorage.setItem('isCMSAuth', isAuthenticated)
  }, [isAuthenticated])

  useEffect(() => {
    localStorage.setItem('cmsContent', JSON.stringify(content))
  }, [content])

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/admin" /> : <Login onLogin={setIsAuthenticated} />
        } />
        <Route
          path="/admin"
          element={
            isAuthenticated ?
              <AdminDashboard content={content} setContent={setContent} onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={<LandingPage content={content} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
