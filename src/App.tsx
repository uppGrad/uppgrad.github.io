import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <h1 className="project-title">UpGrad</h1>
          <p className="project-subtitle">Senior Capstone Project</p>
          <p className="project-description">
            A comprehensive platform designed to enhance educational experiences through innovative technology solutions.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <ul className="nav-list">
            <li><a href="#team">Team</a></li>
            <li><a href="#project">Project</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#repositories">Repositories</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Team Section */}
          <section id="team" className="section">
            <h2>Team Members</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3>John Doe</h3>
                <p>Project Lead & Full-Stack Developer</p>
                <p>john.doe@university.edu</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👩‍💻</div>
                <h3>Jane Smith</h3>
                <p>Frontend Developer & UI/UX Designer</p>
                <p>jane.smith@university.edu</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍🔬</div>
                <h3>Mike Johnson</h3>
                <p>Backend Developer & Database Specialist</p>
                <p>mike.johnson@university.edu</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👩‍🔬</div>
                <h3>Sarah Wilson</h3>
                <p>DevOps Engineer & System Administrator</p>
                <p>sarah.wilson@university.edu</p>
              </div>
            </div>
          </section>

          {/* Project Overview */}
          <section id="project" className="section">
            <h2>Project Overview</h2>
            <div className="project-content">
              <div className="project-info">
                <h3>About UpGrad</h3>
                <p>
                  UpGrad is an innovative educational platform that leverages cutting-edge technology to provide 
                  personalized learning experiences. Our platform integrates advanced algorithms, modern web technologies, 
                  and user-centered design to create an engaging and effective learning environment.
                </p>
                <h4>Key Features:</h4>
                <ul>
                  <li>Adaptive learning algorithms</li>
                  <li>Real-time progress tracking</li>
                  <li>Interactive multimedia content</li>
                  <li>Collaborative learning tools</li>
                  <li>Mobile-responsive design</li>
                </ul>
              </div>
              <div className="tech-stack">
                <h3>Technology Stack</h3>
                <div className="tech-grid">
                  <span className="tech-item">React</span>
                  <span className="tech-item">TypeScript</span>
                  <span className="tech-item">Node.js</span>
                  <span className="tech-item">MongoDB</span>
                  <span className="tech-item">Express</span>
                  <span className="tech-item">Docker</span>
                  <span className="tech-item">AWS</span>
                  <span className="tech-item">Git</span>
                </div>
              </div>
            </div>
          </section>

          {/* Reports Section */}
          <section id="reports" className="section">
            <h2>Project Reports & Documentation</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>📋 Project Proposal</h3>
                <p>Initial project proposal and scope definition</p>
                <a href="#" className="btn">View Report</a>
              </div>
              <div className="report-card">
                <h3>📊 Progress Report</h3>
                <p>Mid-term progress and milestone achievements</p>
                <a href="#" className="btn">View Report</a>
              </div>
              <div className="report-card">
                <h3>📈 Final Report</h3>
                <p>Comprehensive project summary and results</p>
                <a href="#" className="btn">View Report</a>
              </div>
              <div className="report-card">
                <h3>📚 Technical Documentation</h3>
                <p>Detailed technical specifications and API docs</p>
                <a href="#" className="btn">View Documentation</a>
              </div>
            </div>
          </section>

          {/* Repositories Section */}
          <section id="repositories" className="section">
            <h2>GitHub Repositories</h2>
            <div className="repo-grid">
              <div className="repo-card">
                <h3>🔗 Main Repository</h3>
                <p>Primary project repository containing all source code</p>
                <a href="https://github.com/your-username/upgrad" target="_blank" rel="noopener noreferrer" className="btn">
                  View Repository
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 UpGrad Senior Capstone Project. All rights reserved.</p>
          <p>Built with React, TypeScript, and Vite</p>
        </div>
      </footer>
      </div>
  )
}

export default App
