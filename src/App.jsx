import { useState, useEffect, useRef } from 'react'
import { 
  FaReact, 
  FaJs, 
  FaDatabase,
  FaPhp,
  FaGithub 
} from 'react-icons/fa'
import { 
  SiRuby, 
  SiTailwindcss, 
  SiPostman 
} from 'react-icons/si'

// 1. I-import ang StarfieldBackground
import StarfieldBackground from './StarfieldBackground'

import heroImg from './assets/me.png'
import heroImgDark from './assets/dark.png'
import standImg from './assets/stand.png'
import reachImg from './assets/reach.png'
import caffe0 from './assets/0.png'
import caffe1 from './assets/1.png'
import caffe2 from './assets/2.png'
import caffe3 from './assets/3.png'
import caffe4 from './assets/4.png'
import caffe5 from './assets/5.png'
import caffe6 from './assets/6.png'
import caffe7 from './assets/7.png'
import coming from './assets/coming.png'
import logo from './assets/logo.png'


import './App.css'

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const [activeTab, setActiveTab] = useState('all')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // States para sa Image Gallery Modal
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // References para sa pag-track ng swipe
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

 // Active Section & Reveal Observer
 useEffect(() => {
    const sections = document.querySelectorAll('section')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          entry.target.classList.add('section-visible')
        } else {
          entry.target.classList.remove('section-visible')
        }
      })
    }, { 
      threshold: 0.15, 
      rootMargin: '-10% 0px -10% 0px' 
    })

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
      element.classList.remove('section-visible')
      
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })

      setTimeout(() => {
        element.classList.add('section-visible')
      }, 50)
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

  const techSkills = [
    { name: 'React.js', percentage: 50, color: 'linear-gradient(90deg, #06b6d4, #22d3ee)', icon: <FaReact /> },
    { name: 'JavaScript (ES6+)', percentage: 60, color: 'linear-gradient(90deg, #eab308, #facc15)', icon: <FaJs /> },
    { name: 'PHP', percentage: 80, color: 'linear-gradient(90deg, #777bb3, #9fa8da)', icon: <FaPhp /> },
    { name: 'Ruby on Rails', percentage: 70, color: 'linear-gradient(90deg, #ef4444, #f87171)', icon: <SiRuby /> },
    { name: 'PostgreSQL', percentage: 60, color: 'linear-gradient(90deg, #3b82f6, #60a5fa)', icon: <FaDatabase /> },
    { name: 'Tailwind CSS', percentage: 40, color: 'linear-gradient(90deg, #06b6d4, #22d3ee)', icon: <SiTailwindcss /> },
    { name: 'Postman', percentage: 85, color: 'linear-gradient(90deg, #ff6c37, #fb923c)', icon: <SiPostman /> },
    { name: 'GitHub', percentage: 90, color: 'linear-gradient(90deg, #333333, #666666)', icon: <FaGithub /> }
  ]

  const workExperience = [
    {
      role: 'System Developer',
      company: 'K-COOP (Matimpiin St., Quezon City)',
      period: 'June 2024 – Present',
      points: [
        'Design and optimize database structures, queries, and stored procedures.',
        'Generate reports and dashboards for loan monitoring and financial analysis.',
        'Troubleshoot system issues and provide technical support to users.',
        'Collaborate with operations and management teams to streamline lending processes.',
        'Ensure data accuracy, security, and compliance with company policies.'
      ]
    },
    {
      role: 'Team Lead Programmer',
      company: 'Capstone Project (Quezon City)',
      period: '2023 - 2025',
      points: [
        'Developed core system features using PHP, JavaScript.',
        'Designed and managed the database structure and system architecture.',
        'Collaborated with advisers and stakeholders to gather requirements and implement feedback.',
        'Performed system testing, debugging, and optimization before final deployment.'
      ]
    }
  ]

  const certificates = [
    {
      title: 'Path to Leadership',
      date: '2026',
      issuer: 'Professional Development'
    },
    {
      title: 'Cyber Security',
      date: '2026',
      issuer: 'Security Governance'
    },
    {
      title: 'Introduction To Laravel Framework',
      date: 'Oct 16, 2023',
      issuer: 'Web Development'
    },
    {
      title: 'Artificial Intelligence: The life that is to come',
      date: 'Oct 14, 2023',
      issuer: 'AI & Innovation'
    }
  ]

 const projects = [
    {
      title: 'Xanne Cafe POS',
      category: 'web',
      tech: [
        { name: 'React', icon: <FaReact />, color: '#06b6d4' },
        { name: 'Supabase', icon: <FaDatabase />, color: '#3ecf8e' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38bdf8' }
      ],
      description: 'Point of Sale system with automated inventory management, cashier authentication, and structured financial reporting.',
      images: [caffe0, caffe1, caffe2,caffe3,caffe4,caffe5,caffe6,caffe7]
    },
    {
      title: 'Enterprise Microfinance Core',
      category: 'enterprise',
      tech: [
        { name: 'Ruby on Rails', icon: <SiRuby />, color: '#ef4444' },
        { name: 'PostgreSQL', icon: <FaDatabase />, color: '#3b82f6' },
        { name: 'React', icon: <FaReact />, color: '#06b6d4' }
      ],
      description: 'Accounting distribution engines, equity filter validation modules, and member share certificate processing systems.',
      images: [coming]
    },
    {
      title: 'Developer Portfolio',
      category: 'web',
      tech: [
        { name: 'React', icon: <FaReact />, color: '#06b6d4' },
        { name: 'Vite', icon: <FaJs />, color: '#646cff' },
        { name: 'CSS3', icon: <SiTailwindcss />, color: '#264de4' }
      ],
      description: 'Clean, responsive personal portfolio displaying technical stack, project history, and professional background.',
      images: [coming]
    }
  ]

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab)

  const openGallery = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const nextImage = (e) => {
    if (e) e.stopPropagation()
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const prevImage = (e) => {
    if (e) e.stopPropagation()
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!selectedProject) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50 

    if (distance > minSwipeDistance) {
      nextImage() 
    } else if (distance < -minSwipeDistance) {
      prevImage() 
    }
  }

  return (
    /* 2. Dito inilagay ang StarfieldBackground para sakupin ang buong background */
    <StarfieldBackground count={400} speed={0.4} twinkle={true}>
      <div className="portfolio-app-wrapper">
        <div className="portfolio-container">
          {/* Navbar */}
          <nav className="navbar">
           <div className="logo" style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', marginTop: '10px' }}>
  <img 
    src={logo} 
    alt="My Logo" 
    className="nav-logo" 
    style={{ height: '150px', width: 'auto', objectFit: 'contain' }} 
  />
</div>
                      
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

              <label className="theme-switch" aria-label="Toggle Theme">
                <input 
                  type="checkbox" 
                  checked={theme === 'dark'} 
                  onChange={toggleTheme} 
                />
                <span className="slider">
                  <span className="mode-text">
                    {theme === 'dark' ? 'LIGHT' : 'DARK'}
                  </span>
                  <span className="icon-circle">
                    {theme === 'dark' ? '🌙' : '☀️'}
                  </span>
                </span>
              </label>

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
                Building modern, scalable, and automated web applications with a focus on resilient backend architecture and seamless user experiences. Specializing in Ruby on Rails, React.js, and PostgreSQL.
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
              <div className="stats-card modern-dashboard-card">
                <div className="dash-header">
                  <span className="dash-dot"></span>
                  <span className="dash-title">Developer Profile</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Core Stack</span>
                  <span className="stat-value">Rails & React</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Experience</span>
                  <span className="stat-value">2+ Years</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Location</span>
                  <span className="stat-value">Philippines 🇵🇭</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Status</span>
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

          {/* Skills, Experience & Certificates Section */}
          <section id="skills" className="section skills-split-section">
            <div className="skills-main-glass-card">
              <div className="skills-split-grid">
                
                {/* Column 1: Technical Skills */}
                <div className="skills-column">
                  <h2 className="split-column-title">Technical <span className="highlight-name">Skills</span></h2>
                  <div className="skills-list-container">
                    {techSkills.map((skill, index) => (
                      <div key={index} className="skill-progress-item">
                        <div className="skill-info-row">
                          <span className="skill-text-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: skill.color, fontSize: '1.2rem', display: 'flex' }}>
                              {skill.icon}
                            </span>
                            {skill.name}
                          </span>
                          <span className="skill-text-percentage">{skill.percentage}%</span>
                        </div>
                        <div className="progress-bar-container">
                          <div 
                            className="progress-bar-fill" 
                            style={{ 
                              width: `${skill.percentage}%`, 
                              background: skill.color 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Work Experience */}
                <div className="experience-column">
                  <h2 className="split-column-title">Work <span className="highlight-name">Experience</span></h2>
                  <div className="experience-list-container">
                    {workExperience.map((exp, index) => (
                      <div key={index} className="experience-card">
                        <div className="exp-card-header">
                          <h3>{exp.role}</h3>
                          <span className="exp-period">{exp.period}</span>
                        </div>
                        <p className="exp-company">💼 {exp.company}</p>
                        <ul className="exp-points-list">
                          {exp.points.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Certificates */}
                <div className="certificates-column">
                  <h2 className="split-column-title">Certificates</h2>
                  <div className="experience-list-container">
                    {certificates.map((cert, index) => (
                      <div key={index} className="experience-card">
                        <div className="exp-card-header">
                          <h3>{cert.title}</h3>
                          <span className="exp-period">{cert.date}</span>
                        </div>
                        <p className="exp-company">📜 {cert.issuer}</p>
                      </div>
                    ))}
                  </div>
                </div>

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
                <div 
                  className="project-card" 
                  key={project.title} 
                  onClick={() => openGallery(project)}
                  style={{ cursor: 'pointer' }}
                >
                  {project.images && project.images.length > 0 && (
                    <div 
                      className="project-image-container" 
                      style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', marginBottom: '15px' }}
                    >
                      <img 
                        src={project.images[0]} 
                        alt={project.title} 
                        style={{ 
                          width: '100%', 
                          height: '220px', 
                          objectFit: 'cover', 
                          transition: 'transform 0.3s ease' 
                        }} 
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0, 0, 0, 0.7)',
                        color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold'
                      }}>
                        📸 {project.images.length} Features
                      </div>
                    </div>
                  )}
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                    {project.tech.map((t, i) => (
                      <span 
                        className="tag" 
                        key={i}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          padding: '5px 10px', 
                          background: 'rgba(255, 255, 255, 0.05)', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px', 
                          fontSize: '0.85rem' 
                        }}
                      >
                        <span style={{ color: t.color, display: 'flex', fontSize: '1rem' }}>
                          {t.icon}
                        </span>
                        {t.name}
                      </span>
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
                <div className="contact-form-card">
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input type="text" id="name" name="name" placeholder="e.g. Juan Dela Cruz" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input type="email" id="email" name="email" placeholder="e.g. juan@example.com" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Your Message</label>
                      <textarea id="message" name="message" rows="4" placeholder="Tell me about your project or inquiry..." required></textarea>
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
                    {submitStatus === 'success' && (
                      <p className="status-msg success-msg">✅ Message sent successfully! I'll get back to you soon.</p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="status-msg error-msg">❌ Failed to send message. Please try again or email directly.</p>
                    )}
                  </form>
                </div>

                <div className="contact-visual-card">
                  <div className="chat-bubble-popup">
                    <span className="pulse-dot"></span>
                   You can reach me!
                  </div>

                  <div className="contact-avatar-wrapper">
                    <div className="contact-bg-shape"></div>
                    
                    {/* Light Mode Image */}
                    <img 
                      src={reachImg} 
                      alt="Reach Out (Light)" 
                      className={`contact-avatar-img ${theme === 'light' ? 'active' : ''}`}
                    />
                    
                    {/* Dark Mode Image (HeroImgDark) */}
                    <img 
                      src={heroImgDark} 
                      alt="Reach Out (Dark)" 
                      className={`contact-avatar-img ${theme === 'dark' ? 'active' : ''}`}
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

        </div>
      </div>

      {/* Modal / Gallery Slideshow */}
      {selectedProject && (
        <div 
          className="image-modal-overlay" 
          onClick={() => setSelectedProject(null)} 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center',
            alignItems: 'center', zIndex: 1000, padding: '20px'
          }}
        >
          <div 
            className="image-modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ position: 'relative', maxWidth: '850px', width: '100%', textAlign: 'center' }}
          >
            <button 
              onClick={() => setSelectedProject(null)} 
              style={{
                position: 'absolute', top: '-45px', right: '0', background: 'none', border: 'none',
                color: '#fff', fontSize: '2rem', cursor: 'pointer', zIndex: 10
              }}
            >
              ✕
            </button>

            <h3 style={{ color: '#fff', marginBottom: '15px' }}>{selectedProject.title} (Feature {currentImageIndex + 1} of {selectedProject.images.length})</h3>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedProject.images.length > 1 && (
                <button 
                  onClick={prevImage}
                  style={{
                    position: 'absolute', left: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff',
                    border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem',
                    cursor: 'pointer', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  ❮
                </button>
              )}

             <img 
                src={selectedProject.images[currentImageIndex]} 
                alt="Feature Preview" 
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '85vh', 
                  borderRadius: '12px', 
                  objectFit: 'cover', 
                  background: '#111', 
                  touchAction: 'pan-y',
                  cursor: 'grab' 
                }} 
              />

              {selectedProject.images.length > 1 && (
                <button 
                  onClick={nextImage}
                  style={{
                    position: 'absolute', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff',
                    border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem',
                    cursor: 'pointer', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  ❯
                </button>
              )}
            </div>

            {selectedProject.images.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
                {selectedProject.images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img}
                    alt="Thumbnail"
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer',
                      border: currentImageIndex === idx ? '2px solid #06b6d4' : '2px solid transparent',
                      opacity: currentImageIndex === idx ? '1' : '0.6',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </StarfieldBackground>
  )
}

export default App