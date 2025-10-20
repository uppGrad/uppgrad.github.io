import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <h1 className="project-title">UppGrad</h1>
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
          

          {/* Project Overview */}
          {/* <section id="project" className="section">
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
            </div>
          </section> */}

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

          <section id="team" className="section">
            <h2>Team Members</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3>Ali Özhavala</h3>
                <p>ali.ozhavala@ug.bilkent.edu.tr</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👩‍💻</div>
                <h3>Begüm Filiz Öz</h3>
                <p>filiz.oz@ug.bilkent.edu.tr</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3>Bertan Turgut</h3>
                <p>bertan.turgut@ug.bilkent.edu.tr</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3>Emre Uçar</h3>
                <p>emre.ucar@ug.bilkent.edu.tr</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3>Koray Sevil</h3>
                <p>koray.sevil@ug.bilkent.edu.tr</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 UpGrad Senior Project. All rights reserved.</p>
        </div>
      </footer>
      </div>
  )
}

export default App
