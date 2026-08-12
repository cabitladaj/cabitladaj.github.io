import { useState, useEffect } from 'react'
import heroImg from './assets/me.png'
import heroImgDark from './assets/dark.png'
import standImg from './assets/stand.png'
import reachImg from './assets/reach.png'

import './App.css'

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const [activeTab, setActiveTab] = useState('all')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Active Section Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0.1, 
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (e, id) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Pure Text Submission via Web3Forms API
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const message = form.message.value

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'bdd90981-0f4b-415d-b22b-7f7bf9f2b900',
          subject: `Portfolio Message from ${name}`,
          from_name: name,
          replyto: email,
          message: message
        })
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitting(false)
        setSubmitStatus('success')
        form.reset()
      } else {
        setIsSubmitting(false)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setIsSubmitting(false)
      setSubmitStatus('error')
    }
  }

  const projects = [
    {
      title: 'Pink Bites POS',
      category: 'web',
      tech: ['React', 'Supabase', 'Tailwind CSS'],
      description: 'Point of Sale system with automated inventory management, cashier authentication, and structured financial reporting.',
    },
    {
      title: 'Enterprise Microfinance Core',
      category: 'enterprise',
      tech: ['Ruby on Rails', 'PostgreSQL', 'React'],
      description: 'Accounting distribution engines, equity filter validation modules, and member share certificate processing systems.',
    },
    {
      title: 'Developer Portfolio',
      category: 'web',
      tech: ['React', 'Vite', 'CSS3'],
      description: 'Clean, responsive personal portfolio displaying technical stack, project history, and professional background.',
    }
  ]

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab)

  return (
    <div className="portfolio-app-wrapper">
      <div className="portfolio-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">&lt;/&gt; Portfolio</div>
          
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><a href="#hero" className={activeSection === 'hero' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'hero')}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'skills')}>Skills</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'projects')}>Works</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
          </ul>

          <div className="nav-right">
            <div className="nav-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="mailto:your.email@example.com" title="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </a>
            </div>

            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="hero-left">
            <h1 className="hero-title">
              Hello I'm <span className="highlight-name">Jerald</span>
            </h1>
            <h2 className="hero-subtitle">Full-Stack Developer</h2>
            <p className="hero-description">
              Building modern, scalable, and automated web applications with Ruby on Rails, React.js, and PostgreSQL.
            </p>
            <div className="cta-buttons">
              <a href="#projects" className="btn btn-dark" onClick={(e) => scrollToSection(e, 'projects')}>View Projects</a>
              <a href="#contact" className="btn btn-outline" onClick={(e) => scrollToSection(e, 'contact')}>Contact Me</a>
            </div>
          </div>

          <div className="hero-center">
            <div className="avatar-wrapper">
              <div className="speech-bubble">HI!</div>
              <div className="avatar-frame">
                <img 
                  src={heroImg} 
                  className={`avatar-img ${theme === 'light' ? 'active' : ''}`} 
                  alt="Jerald Cabitlada (Light)" 
                />
                <img 
                  src={heroImgDark} 
                  className={`avatar-img ${theme === 'dark' ? 'active' : ''}`} 
                  alt="Jerald Cabitlada (Dark)" 
                />
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="stats-card">
              <div className="stat-row">
                <span className="stat-label">Experience</span>
                <span className="stat-value">2+ Years</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Projects</span>
                <span className="stat-value">50+</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Clients</span>
                <span className="stat-value">30+</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Availability :</span>
                <span className="stat-value status-available">Available for Work</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="about-bg-glow"></div>
          <div className="about-wrapper">
            <div className="about-avatar-container">
              <div className="avatar-backlight"></div>
              <img src={standImg} alt="Jerald Cabitlada" className="about-avatar-img" />
            </div>

            <div className="about-glass-card">
              <div className="about-code-widget">
                <div className="widget-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="widget-body">
                  <code>&lt;dev class="fullstack"&gt;</code>
                  <code>  &lt;React /&gt; &lt;Rails /&gt;</code>
                  <code>&lt;/dev&gt;</code>
                </div>
              </div>

              <div className="floating-badge badge-react">⚛️ React</div>
              <div className="floating-badge badge-rails">💎 Rails</div>

              <div className="about-text-content">
                <span className="about-tag">WHO I AM</span>
                <h2 className="about-card-title">About Me</h2>
                <p>
                  I'm a Full-Stack Developer passionate about building modern, scalable web applications with clean UI design. I focus on writing simple, efficient code and creating seamless, user-friendly digital experiences.
                </p>
                <div className="about-cta-group">
                  <a href="#skills" className="btn btn-about" onClick={(e) => scrollToSection(e, 'skills')}>
                    Learn More <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title">Technical Expertise</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend Development</h3>
              <ul>
                <li>React.js</li>
                <li>JavaScript (ES6+)</li>
                <li>Tailwind CSS / HTML5</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend & Database</h3>
              <ul>
                <li>Ruby on Rails</li>
                <li>PostgreSQL</li>
                <li>Supabase / REST APIs</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Workflow</h3>
              <ul>
                <li>Git / GitHub</li>
                <li>Ubuntu / Linux CLI</li>
                <li>Vite / VS Code</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2 className="section-title">Featured Works</h2>
          <div className="filter-tabs">
            <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
            <button className={`tab ${activeTab === 'web' ? 'active' : ''}`} onClick={() => setActiveTab('web')}>Web Apps</button>
            <button className={`tab ${activeTab === 'enterprise' ? 'active' : ''}`} onClick={() => setActiveTab('enterprise')}>Enterprise</button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div className="project-card" key={project.title}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="tech-tags">
                  {project.tech.map((t, i) => (
                    <span className="tag" key={i}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="contact-container">
            <div className="contact-header">
              <span className="contact-badge">GET IN TOUCH</span>
              <h2 className="section-title">Let's Work Together</h2>
              <p className="contact-subtitle">
                Have a project in mind or want to collaborate? Send me a message and let's discuss!
              </p>
            </div>

            <div className="contact-content-grid">
              
              {/* Left Side: Contact Form */}
              <div className="contact-form-card">
                <form onSubmit={handleSubmit} className="contact-form">
                  
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="e.g. Juan Dela Cruz" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="e.g. juan@example.com" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      placeholder="Tell me about your project or inquiry..." 
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="loading-state">
                        <span className="spinner"></span>
                        Sending message...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <p className="status-msg success-msg">✅ Message sent successfully! I'll get back to you soon.</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="status-msg error-msg">❌ Failed to send message. Please try again or email directly.</p>
                  )}

                </form>
              </div>

              {/* Right Side: Visual Card */}
              <div className="contact-visual-card">
                <div className="chat-bubble-popup">
                  <span className="pulse-dot"></span>
                  Can you reach me!
                </div>

                <div className="contact-avatar-wrapper">
                  <div className="contact-bg-shape"></div>
                  <img 
                    src={theme === 'light' ? reachImg : heroImgDark} 
                    alt="Contact Character" 
                    className="contact-avatar-img"
                  />
                </div>

                <div className="contact-info-badges">
                  <div className="info-badge">
                    <span className="badge-icon">📍</span>
                    <span>Philippines</span>
                  </div>
                  <div className="info-badge">
                    <span className="badge-icon">⚡</span>
                    <span>Fast Response</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-section">
          <div className="footer-content">
            <h2 className="section-title">Jerald Cabitlada</h2>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App