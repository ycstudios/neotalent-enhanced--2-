"use client"

import { useEffect, useState } from "react"
import "./App.css"

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resumeSubmitted, setResumeSubmitted] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // Scroll animation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible")
      }),
      { threshold: 0.2 }
    )

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Form submission handlers
  const handleSubmit = (e, setSubmitted) => {
    e.preventDefault()
    fetch(e.target.action, {
      method: e.target.method,
      body: new FormData(e.target),
      headers: { Accept: "application/json" },
    })
      .then(() => {
        setSubmitted(true)
        e.target.reset()
      })
      .catch(() => alert("Something went wrong. Please try again later."))
  }

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/assets/check3.png" alt="NeoTalent Logo" />
        </div>

        <div className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`}>
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? "mobile-active" : ""}`}>
          {["about", "resume", "contact"].map(link => (
            <a key={link} href={`#${link}`} onClick={() => setMobileMenuOpen(false)}>
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Connecting Talent to Opportunity</h1>
          <p>Your dream job is just a resume away</p>
          <a href="#resume" className="cta-button pulse">Submit Your Resume</a>
        </div>
      </header>

      <div className="main-wrapper">
        {/* About Section */}
        <section id="about" className="section fade-in">
          <div className="section-header">
            <h2>About NeoTalent</h2>
            <div className="section-underline"></div>
          </div>

          <p className="about-intro">
            NeoTalent connects passionate job seekers with top companies globally. We deliver recruitment excellence
            through <strong>speed</strong>, <strong>transparency</strong>, and <strong>meaningful connections</strong>.
          </p>

          <div className="services-grid">
            <h3>Our Services</h3>
            <div className="services-inner-grid">
              {[
                { icon: "👔", title: "Permanent Hiring", desc: "Finding full-time talents who align with your company's mission, culture, and long-term goals." },
                { icon: "📄", title: "Contract Hiring", desc: "Flexible hiring solutions with skilled professionals available on-demand to meet project needs." },
                { icon: "💻", title: "Technology Hiring", desc: "Specialized recruitment for IT, Software Development, Cloud, and emerging tech roles." },
                { icon: "📚", title: "Non-Tech Hiring", desc: "Efficient hiring across HR, Sales, Finance, Marketing, Admin, and other business domains." }
              ].map((service, i) => (
                <div key={i} className="service-item">
                  <div className="service-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="industry-section">
            <h3>Industries We Serve</h3>
            <div className="industry-grid">
              {[
                { icon: "🚀", name: "Technology" },
                { icon: "🏦", name: "Finance" },
                { icon: "🏥", name: "Healthcare" },
                { icon: "💼", name: "Consulting" },
                { icon: "🌱", name: "Startups" }
              ].map((industry, i) => (
                <div key={i} className="industry-card">
                  <span className="industry-icon">{industry.icon}</span>
                  <span>{industry.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mission-box fade-in">
            <h3>Our Mission</h3>
            <p>
              To empower talent and companies by creating opportunities that drive success, foster innovation, and
              change lives for the better.
            </p>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="section fade-in">
          <div className="section-header">
            <h2>Submit Your Resume</h2>
            <div className="section-underline"></div>
          </div>
          <p className="section-subtitle">Get closer to your dream opportunity today!</p>

          <div className="resume-container">
            <div className="resume-image-container">
              <div className="resume-image"></div>
            </div>
            <div className="resume-form-container">
              {resumeSubmitted ? (
                <div className="thank-you-message">
                  <div className="success-icon">✓</div>
                  <p>Thank you! Your resume has been submitted successfully.</p>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/mwpopbqv"
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={(e) => handleSubmit(e, setResumeSubmitted)}
                  className="form"
                >
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email address" required />
                  </div>

                  <div className="form-group file-input-group">
                    <label htmlFor="resume">Upload Resume</label>
                    <input type="file" id="resume" name="resume" required />
                  </div>

                  <button type="submit" className="button">
                    <span>Upload Resume</span>
                    <span className="icon">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section fade-in">
          <div className="section-header">
            <h2>Let's Connect 🤝</h2>
            <div className="section-underline"></div>
          </div>
          <p className="section-subtitle">Have questions? Looking for opportunities? Reach out to us!</p>

          <div className="contact-container">
            <div className="contact-form-container">
              {contactSubmitted ? (
                <div className="thank-you-message">
                  <div className="success-icon">✓</div>
                  <p>Thank you! We have received your message. We'll get back to you soon.</p>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/xjkwkroo"
                  method="POST"
                  onSubmit={(e) => handleSubmit(e, setContactSubmitted)}
                  className="form"
                >
                  <div className="form-group">
                    <label htmlFor="contact-name">Your Name</label>
                    <input type="text" id="contact-name" name="name" placeholder="Enter your name" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Your Email</label>
                    <input type="email" id="contact-email" name="email" placeholder="Enter your email address" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" placeholder="Type your message here..." rows="5" required></textarea>
                  </div>

                  <button type="submit" className="button">
                    <span>Send Message</span>
                    <span className="icon">→</span>
                  </button>
                </form>
              )}
            </div>

            <div className="contact-info">
              <div className="contact-card">
                <h3>Contact Information</h3>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <p>shalinisrivastava7524@gmail.com</p>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <p>+91-8400263683</p>
                </div>
                <div className="social-links">
                  {["in", "𝕏", "📷"].map((icon, i) => (
                    <a key={i} href="#" className="social-link" aria-label={["LinkedIn", "Twitter", "Instagram"][i]}>
                      <div className="social-icon">{icon}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/assets/check3.png" alt="NeoTalent Logo" />
          </div>
          <div className="footer-links">
            {["about", "resume", "contact"].map(link => (
              <a key={link} href={`#${link}`}>
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>
          <div className="footer-copyright">© 2025 NeoTalent. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}