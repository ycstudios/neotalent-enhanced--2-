"use client"

import { useState, useRef, useEffect } from "react"
import Navigation from "./components/Navigation"
import "./App.css"

// Add the useScrollAnimation hook from the first file
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

export default function App() {
  // Add the scroll animation hook
  useScrollAnimation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resumeSubmitted, setResumeSubmitted] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const heroRef = useRef(null)

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
  

  // Stats counters
  const stats = [
    { label: "Successful Placements", value: 3500, symbol: "+" },
    { label: "Corporate Partners", value: 200, symbol: "+" },
    { label: "Years of Experience", value: 15, symbol: "" },
    { label: "Satisfaction Rate", value: 98, symbol: "%" }
  ]

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navigation/>

      {/* Hero Section */}
      <header id="home" className="hero fade-in" ref={heroRef}>
        <div className="hero-content">
          <div className="accent-line"></div>
          <h1>
            <span className="accent">Connecting</span> Exceptional Talent 
            <br/>with Leading Opportunities
          </h1>
          <p>Where expertise meets innovation in the evolving job market</p>
          <div className="hero-buttons">
            <a href="#resume" className="primary-button pulse">
              <span>Submit Your Resume</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#about" className="secondary-button">
              <span>Learn More</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-section fade-in">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}{stat.symbol}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="main-wrapper">
        {/* About Section */}
        <section id="about" className="section fade-in">
          <div className="section-header">
            <span className="section-tag">About Us</span>
            <h2>Redefining Recruitment Excellence</h2>
            <div className="section-underline"></div>
          </div>

          <p className="about-intro">
            NeoTalent connects passionate job seekers with top companies globally. We deliver recruitment excellence
            through <strong>speed</strong>, <strong>transparency</strong>, and <strong>meaningful connections</strong>.
          </p>

          <div className="services-grid">
            <div className="services-header">
              <h3>Our Premium Services</h3>
              <p>Comprehensive recruitment solutions tailored to your specific needs</p>
            </div>
            <div className="services-inner-grid">
              {[
                { 
                  icon: "👔", 
                  title: "Executive Search", 
                  desc: "Premium talent acquisition for leadership and C-suite positions with personalized service." 
                },
                { 
                  icon: "📄", 
                  title: "Contract Staffing", 
                  desc: "Flexible staffing solutions with pre-vetted professionals for time-sensitive projects." 
                },
                { 
                  icon: "💻", 
                  title: "Tech Recruitment", 
                  desc: "Specialized placement for software development, data science, and emerging technology roles." 
                },
                { 
                  icon: "📚", 
                  title: "Industry Expertise", 
                  desc: "Sector-specific recruitment across finance, healthcare, manufacturing, and retail." 
                }
              ].map((service, i) => (
                <div key={i} className="service-card fade-in">
                  <div className="service-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                  <a href="#contact" className="service-link">Learn More</a>
                </div>
              ))}
            </div>
          </div>

          <div className="industries-wrapper fade-in">
            <div className="industries-content">
              <h3>Industries We Serve</h3>
              <p>NeoTalent provides specialized recruitment solutions across diverse sectors</p>
              <div className="industry-grid">
                {[
                  { icon: "🚀", name: "Technology", desc: "Software, IT, and Digital Products" },
                  { icon: "🏦", name: "Finance", desc: "Banking, Insurance, and FinTech" },
                  { icon: "🏥", name: "Healthcare", desc: "Medical, Pharmaceutical, and Biotech" },
                  { icon: "💼", name: "Consulting", desc: "Management, Strategy, and Business Advisory" },
                  { icon: "🌱", name: "Startups", desc: "Early-stage, Growth, and Scale-ups" }
                ].map((industry, i) => (
                  <div key={i} className="industry-card fade-in">
                    <div className="industry-icon">{industry.icon}</div>
                    <div className="industry-text">
                      <h4>{industry.name}</h4>
                      <p>{industry.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="industries-image"></div>
          </div>

          <div className="mission-box fade-in">
            <div className="mission-content">
              <h3>Our Mission</h3>
              <p>
                To empower talent and companies by creating opportunities that drive success, foster innovation, and
                change lives for the better. We believe in building lasting relationships while maintaining the highest
                standards of integrity and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="section fade-in">
          <div className="section-header">
            <span className="section-tag">Career Opportunities</span>
            <h2>Submit Your Resume</h2>
            <div className="section-underline"></div>
          </div>
          <p className="section-subtitle">Get closer to your dream opportunity today!</p>

          <div className="resume-container">
            <div className="resume-content">
              <h3>Join Our Talent Network</h3>
              <div className="resume-benefits">
                {[
                  "Access to exclusive job opportunities",
                  "Career guidance from industry experts",
                  "Personalized job matches based on your skills",
                  "Confidential handling of your information"
                ].map((benefit, i) => (
                  <div key={i} className="benefit-item fade-in">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="resume-form-container fade-in">
                {resumeSubmitted ? (
                  <div className="thank-you-message">
                    <div className="success-icon">✓</div>
                    <h4>Thank You!</h4>
                    <p>Your resume has been submitted successfully. Our team will review your profile and contact you soon.</p>
                  </div>
                ) : (
                  <form
                    action="https://formspree.io/f/mwpopbqv"
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={(e) => handleSubmit(e, setResumeSubmitted)}
                    className="form"
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your full name" required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email address" required />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="experience">Years of Experience</label>
                        <select id="experience" name="experience">
                          <option value="" disabled selected>Select experience</option>
                          <option value="0-1">0-1 year</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group file-input-group">
                      <label htmlFor="resume">Upload Resume</label>
                      <div className="file-input-wrapper">
                        <input type="file" id="resume" name="resume" required />
                        <div className="file-input-text">Browse Files</div>
                      </div>
                      <p className="file-format">Accepted formats: PDF, DOCX (Max 5MB)</p>
                    </div>

                    <button type="submit" className="primary-button">
                      <span>Submit Application</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section fade-in">
          <div className="section-header">
            <span className="section-tag">Connect With Us</span>
            <h2>Let's Start a Conversation</h2>
            <div className="section-underline"></div>
          </div>
          <p className="section-subtitle">Have questions? Looking for opportunities? We're here to help!</p>

          <div className="contact-container">
            <div className="contact-form-container fade-in">
              {contactSubmitted ? (
                <div className="thank-you-message">
                  <div className="success-icon">✓</div>
                  <h4>Message Received!</h4>
                  <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/xjkwkroo"
                  method="POST"
                  onSubmit={(e) => handleSubmit(e, setContactSubmitted)}
                  className="form"
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contact-name">Your Name</label>
                      <input type="text" id="contact-name" name="name" placeholder="Enter your name" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email">Your Email</label>
                      <input type="email" id="contact-email" name="email" placeholder="Enter your email address" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" placeholder="What is this regarding?" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Type your message here..."
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="primary-button">
                    <span>Send Message</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>

            <div className="contact-info fade-in">
              <div className="contact-card">
                <h3>Contact Information</h3>
                <p className="contact-subtitle">Reach out directly or fill out the form</p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 18.5H2.5V5.5H21.5V18.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 6.5L12 12.5L20.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>shalinisrivastava7524@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 4H9L11 9L8.5 10.5C9.5 12.5 11.5 14.5 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14 20.5 10 18.5 7 15.5C4 12.5 2 8.5 1.5 4.5C1.5 3.96957 1.71071 3.46086 2.08579 3.08579C2.46086 2.71071 2.96957 2.5 3.5 2.5H7.5L5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Phone</h4>
                      <p>+91-8400263683</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Office Location</h4>
                      <p>Business Center, Tower A, Sector 62, Noida</p>
                    </div>
                  </div>
                </div>
                
                <div className="social-links">
                  <h4>Follow Us</h4>
                  <div className="social-icons">
                    {[
                      { icon: "in", label: "LinkedIn" },
                      { icon: "𝕏", label: "Twitter" },
                      { icon: "📷", label: "Instagram" },
                      { icon: "f", label: "Facebook" }
                    ].map((social, i) => (
                      <a key={i} href="#" className="social-link" aria-label={social.label}>
                        <div className="social-icon">{social.icon}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="cta-section fade-in">
        <div className="cta-content">
          <h2>Ready to advance your career?</h2>
          <p>Join thousands of professionals who found their dream jobs through NeoTalent</p>
          <a href="#resume" className="primary-button white">
            <span>Submit Your Resume Now</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/check3.png" alt="NeoTalent Logo" />
            </div>
            <p>Connecting exceptional talent with premium opportunities since 2010</p>
          </div>
          
          <div className="footer-links-container">
            <div className="footer-links-group">
              <h4>Quick Links</h4>
              <div className="footer-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#resume">Submit Resume</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            
            <div className="footer-links-group">
              <h4>Services</h4>
              <div className="footer-links">
                <a href="#about">Executive Search</a>
                <a href="#about">Contract Staffing</a>
                <a href="#about">Tech Recruitment</a>
                <a href="#about">HR Consulting</a>
              </div>
            </div>
            
            <div className="footer-links-group">
              <h4>Legal</h4>
              <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">© 2025 NeoTalent. All rights reserved.</div>
          <div className="footer-social">
            {["in", "𝕏", "📷", "f"].map((icon, i) => (
              <a key={i} href="#" className="social-link small" aria-label={["LinkedIn", "Twitter", "Instagram", "Facebook"][i]}>
                <div className="social-icon">{icon}</div>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}