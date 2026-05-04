import { useState } from 'react'
import './App.css'

// ─── Screenshot Placeholder ───────────────────────────────────────────────────

interface ScreenshotProps {
  id: string        // e.g. "SS-01"
  label: string     // short title shown inside the box
  caption: string   // descriptive text below the box
  wide?: boolean    // 16:9 (default) vs 4:3
}

function Screenshot({ id, label, caption, wide = true }: ScreenshotProps) {
  return (
    <figure className="screenshot-figure">
      <div className={`screenshot-box${wide ? '' : ' screenshot-box--tall'}`}>
        <div className="screenshot-inner">
          <svg className="screenshot-camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
          <span className="screenshot-id">{id}</span>
          <span className="screenshot-label">{label}</span>
          <span className="screenshot-hint">Replace with screenshot</span>
        </div>
      </div>
      <figcaption className="screenshot-caption">{caption}</figcaption>
    </figure>
  )
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'What file formats can I upload for document feedback?',
    a: 'UppGrad accepts PDF, DOCX, and DOC files up to 10 MB. For best results, upload a single-column PDF exported directly from your word processor.',
  },
  {
    q: 'How long does the AI Review (Interactive) take?',
    a: 'The agentic workflow typically takes 30 to 90 seconds depending on document length and server load. A live status banner tracks progress from "Processing" to "Awaiting Review".',
  },
  {
    q: 'What is the difference between AI Review and Quick Review?',
    a: 'AI Review (Interactive) runs a multi-step pipeline that generates granular, section-level proposals you can accept or reject individually. Quick Review produces a single structured feedback report in seconds with no proposal stage.',
  },
  {
    q: 'Can I re-review the same document after submitting my decisions?',
    a: 'Yes. Upload the finalised document as a new session to get a fresh round of proposals. Each session is independent and stored in your history.',
  },
  {
    q: 'What happens after I accept or reject proposals and click Submit Review?',
    a: 'UppGrad sends your decisions to the backend, which applies accepted changes, compiles a polished PDF, and makes it available for download — usually within 20 to 40 seconds.',
  },
  {
    q: 'Is my document data kept private?',
    a: 'Documents are stored on encrypted cloud storage and are only accessible by your account. They are never shared with employers or other users.',
  },
  {
    q: 'I posted an opportunity but no students are applying. What should I check?',
    a: 'Make sure the opportunity status is set to Active and that the deadline has not passed. You can edit the posting from the My Postings page.',
  },
  {
    q: 'Can I target a specific job or programme when requesting document feedback?',
    a: 'Yes. Before submitting, select the target opportunity from the dropdown — job posting, master\'s programme, or scholarship. The AI will tailor its proposals to that opportunity\'s requirements.',
  },
]

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? ' faq-item--open' : ''}`}>
          <button
            className="faq-question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <svg className="faq-chevron" viewBox="0 0 20 20" fill="currentColor">
              {open === i
                ? <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 0 1-1.06-.02L10 8.832l-3.71 3.938a.75.75 0 1 1-1.08-1.04l4.25-4.5a.75.75 0 0 1 1.08 0l4.25 4.5a.75.75 0 0 1-.02 1.06Z" clipRule="evenodd" />
                : <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
              }
            </svg>
          </button>
          {open === i && <p className="faq-answer">{item.a}</p>}
        </div>
      ))}
    </div>
  )
}

// ─── Role Tab Manual ──────────────────────────────────────────────────────────

type Role = 'student' | 'employer' | 'admin'

const ROLE_LABELS: Record<Role, string> = {
  student: 'Student',
  employer: 'Employer',
  admin: 'Admin',
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [role, setRole] = useState<Role>('student')

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="project-title">UppGrad</h1>
          <p className="project-description">
            AI-powered career platform for students, employers, and administrators
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <ul className="nav-list">
            <li><a href="https://uppgrad.up.railway.app/" target="_blank" rel="noopener noreferrer">Visit UppGrad</a></li>
            <li><a href="#manual">User Manual</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#logbooks">Logbooks</a></li>
            <li><a href="#repositories">Repositories</a></li>
            <li><a href="#team">Team</a></li>
          </ul>
        </div>
      </nav>

      <main className="main">
        <div className="container">

          {/* Visit */}
          <section id="visit" className="section">
            <h2>Visit UppGrad</h2>
            <div className="visit-panel">
              <div>
                <h3>Explore the live platform</h3>
                <p>
                  Open the deployed UppGrad application to try the student, employer, and admin
                  workflows built for the senior project.
                </p>
              </div>
              <a href="https://uppgrad.up.railway.app" target="_blank" rel="noopener noreferrer" className="btn">
                Launch UppGrad
              </a>
            </div>
          </section>

          {/* ── USER MANUAL ──────────────────────────────────────────────────── */}
          <section id="manual" className="section">
            <h2>User Manual</h2>

            {/* ── 1. Getting Started ── */}
            <div className="manual-card">
              <div className="manual-card-header">
                <h3>1. Getting Started</h3>
              </div>

              <div className="manual-body">
                <h4 className="manual-sub">1.1 Creating an Account</h4>
                <p className="manual-p">
                  Navigate to the UppGrad login page. If you do not have an account, click
                  <strong> Register</strong>. Choose your role — <strong>Student</strong> or
                  <strong> Employer</strong> — enter your email address and a password, then
                  submit the form. A verification step may be required depending on your
                  institution's configuration.
                </p>

                <Screenshot
                  id="SS-01"
                  label="Login page"
                  caption="Figure 1.1 — The login page. New users should click Register to create an account."
                />

                <Screenshot
                  id="SS-02"
                  label="Registration form with role selector"
                  caption="Figure 1.2 — Registration form. Select Student or Employer before submitting."
                />

                <h4 className="manual-sub">1.2 Completing Onboarding</h4>
                <p className="manual-p">
                  After your first login you are directed to the onboarding wizard. For student
                  accounts this collects your name, profile picture, biography, skills, and
                  contact links. Complete every field — the AI feedback and recommendation engines
                  rely on this data. You can return to the Profile page at any time to update your
                  information.
                </p>

                <Screenshot
                  id="SS-03"
                  label="Onboarding wizard — profile setup"
                  caption="Figure 1.3 — Onboarding wizard. Fill in all fields to unlock AI-powered features."
                />

                <h4 className="manual-sub">1.3 The Dashboard</h4>
                <p className="manual-p">
                  Once onboarding is complete you land on the Dashboard. The left sidebar
                  provides navigation to all features available for your role. The main area
                  surfaces recent activity, upcoming deadlines, and quick-access cards.
                </p>

                <Screenshot
                  id="SS-04"
                  label="Student dashboard — home page"
                  caption="Figure 1.4 — Student dashboard. Use the left sidebar to navigate between sections."
                />
              </div>
            </div>

            {/* ── 2. Role-Based Guide ── */}
            <div className="manual-card" style={{ marginTop: '2rem' }}>
              <div className="manual-card-header">
                <h3>2. Feature Guide</h3>
              </div>

              <div className="manual-body">
                <div className="role-tabs">
                  {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                    <button
                      key={r}
                      className={`role-tab${role === r ? ' role-tab--active' : ''}`}
                      onClick={() => setRole(r)}
                    >
                      {ROLE_LABELS[r]}
                    </button>
                  ))}
                </div>

                {/* ── STUDENT ── */}
                {role === 'student' && (
                  <div className="role-content">

                    <h4 className="manual-sub">Document Feedback</h4>
                    <p className="manual-p">
                      Document Feedback is the core feature of UppGrad. It uses an agentic AI
                      pipeline to analyse your CV, Statement of Purpose, or Cover Letter and
                      produce a ranked list of improvement proposals.
                    </p>

                    <ol className="manual-steps">
                      <li>
                        <strong>Upload your document.</strong> Go to <em>Document Feedback</em> in
                        the sidebar. Drag and drop a PDF or DOCX file onto the upload zone, or
                        click to browse. Maximum file size is 10 MB.
                      </li>
                      <li>
                        <strong>Select a target opportunity (optional but recommended).</strong>{' '}
                        Use the dropdown to link the session to a specific job posting, master's
                        programme, or scholarship. The AI will tailor every proposal to that
                        listing's requirements.
                      </li>
                      <li>
                        <strong>Add custom instructions (optional).</strong> The text area below
                        the upload zone accepts free-form guidance, e.g. "Focus on the experience
                        section" or "Keep the tone formal".
                      </li>
                      <li>
                        <strong>Choose the review mode.</strong> Click <em>AI Review (Interactive)</em>{' '}
                        for the full agentic pipeline with granular proposals, or{' '}
                        <em>Quick Review</em> for a faster single-pass summary.
                      </li>
                    </ol>

                    <Screenshot
                      id="SS-05"
                      label="Document Feedback — upload screen"
                      caption="Figure 2.1 — Upload screen. Drop your file, choose an opportunity target, then click AI Review (Interactive)."
                    />

                    <p className="manual-p" style={{ marginTop: '1.25rem' }}>
                      After submission, a status banner appears at the top of the page. It
                      transitions through <em>Processing</em>, <em>Awaiting Review</em>, and{' '}
                      <em>Finalizing</em>. The full pipeline typically completes in 30 to 90
                      seconds.
                    </p>

                    <Screenshot
                      id="SS-06"
                      label="Active session — Processing status banner"
                      caption="Figure 2.2 — Status banner during AI processing. Do not close the tab while the session is running."
                    />

                    <h4 className="manual-sub">Reviewing Proposals</h4>
                    <p className="manual-p">
                      When the status changes to <em>Awaiting Review</em>, a{' '}
                      <strong>Review Proposals</strong> button appears. Clicking it opens a
                      split-pane modal. The left pane displays your original document as a PDF;
                      the right pane lists proposals sorted by priority — Critical, High, Medium,
                      Low.
                    </p>
                    <p className="manual-p">
                      Click any proposal card to highlight the matching passage in the PDF on the
                      left. Use the check button to <strong>accept</strong> a change or the X
                      button to <strong>reject</strong> it. You can also use{' '}
                      <em>Accept All</em> or <em>Reject All</em> at the top of the modal for
                      bulk decisions.
                    </p>

                    <Screenshot
                      id="SS-07"
                      label="Review Proposals panel — full split-pane view"
                      caption="Figure 2.3 — Review Proposals modal. Left: original PDF with highlighted passage. Right: ranked proposal cards."
                      wide={true}
                    />

                    <Screenshot
                      id="SS-08"
                      label="Proposal card — Current / Suggested / Accept / Reject"
                      caption="Figure 2.4 — A single proposal card. The red box shows the current text; the green box shows the suggested replacement. Use the check and X buttons to decide."
                      wide={false}
                    />

                    <p className="manual-p" style={{ marginTop: '1.25rem' }}>
                      Once every proposal has a decision, the <em>Submit Review</em> button in
                      the footer activates. Click it to finalise. The system applies accepted
                      changes, compiles the revised document, and adds a download link to your
                      session history within approximately 30 seconds.
                    </p>

                    <Screenshot
                      id="SS-09"
                      label="Session history — completed session with Download button"
                      caption="Figure 2.5 — Session history card after finalisation. Click Download to save the revised PDF."
                    />

                    <h4 className="manual-sub">Browse Opportunities</h4>
                    <p className="manual-p">
                      Go to <em>Browse Opportunities</em> to explore job postings, master's
                      programmes, and scholarships. Use the filter controls to narrow by
                      opportunity type, field of study, and application deadline. Click the
                      bookmark icon on any card to save it for later. Bookmarked items appear
                      under the <em>Bookmarks</em> section and are pinned to your Calendar.
                    </p>

                    <Screenshot
                      id="SS-10"
                      label="Browse Opportunities — filters applied"
                      caption="Figure 2.6 — Browse Opportunities page with type and deadline filters applied."
                    />

                    <h4 className="manual-sub">Auto-Apply</h4>
                    <p className="manual-p">
                      The Auto-Apply feature delegates application drafting and submission to the
                      AI agent. Navigate to <em>Auto-Apply</em>, select a target opportunity from
                      the list, choose which document version to attach (your latest revised PDF
                      is selected by default), and click <em>Start Auto-Apply</em>. The agent
                      drafts a cover letter, fills the application form, and submits on your
                      behalf. You will receive a confirmation notification when the submission is
                      complete.
                    </p>

                    <Screenshot
                      id="SS-11"
                      label="Auto-Apply page"
                      caption="Figure 2.7 — Auto-Apply page. Select an opportunity and document version, then start the agent."
                    />
                  </div>
                )}

                {/* ── EMPLOYER ── */}
                {role === 'employer' && (
                  <div className="role-content">

                    <h4 className="manual-sub">Posting an Opportunity</h4>
                    <p className="manual-p">
                      After logging in as an employer, navigate to <em>Post Opportunity</em> via
                      the sidebar. Fill in the opportunity title, description, requirements,
                      location, application deadline, and type (Job, Internship, or Part-Time).
                      Click <em>Publish</em> to make the listing immediately visible to students.
                      Drafts can be saved and published later.
                    </p>

                    <Screenshot
                      id="SS-12"
                      label="Post Opportunity form — employer view"
                      caption="Figure 2.8 — Post Opportunity form. All required fields must be completed before publishing."
                    />

                    <h4 className="manual-sub">Managing Postings and Reviewing Applicants</h4>
                    <p className="manual-p">
                      Your active and past listings appear under <em>My Postings</em> (accessible
                      via the Applications link in the sidebar). Each card shows the view count and
                      application count. Click a listing to expand the applicant list. Click a
                      student's name to view their full profile, CV, and application message. You
                      can edit a posting's details or mark it as Closed at any time from this
                      screen.
                    </p>

                    <ol className="manual-steps">
                      <li>Open <em>My Postings</em> from the sidebar.</li>
                      <li>Click the listing you want to manage.</li>
                      <li>Use the <em>Edit</em> button to update the description, deadline, or status.</li>
                      <li>Click an applicant's name to view their profile and documents.</li>
                    </ol>
                  </div>
                )}

                {/* ── ADMIN ── */}
                {role === 'admin' && (
                  <div className="role-content">

                    <h4 className="manual-sub">Analytics Dashboard</h4>
                    <p className="manual-p">
                      The Admin Analytics page provides platform-wide metrics: new registrations
                      over time, feedback sessions per day, and application volume by opportunity
                      type. Use the date-range picker in the top-right corner to filter by period.
                      Charts update in real time as the range is adjusted.
                    </p>

                    <Screenshot
                      id="SS-13"
                      label="Admin Analytics dashboard"
                      caption="Figure 2.9 — Admin Analytics. Use the date-range picker to filter metrics by period."
                    />

                    <h4 className="manual-sub">Managing Users</h4>
                    <p className="manual-p">
                      Go to <em>Admin &rarr; Manage Users</em> to view all registered accounts.
                      Use the search bar to find a user by name or email. The action menu on each
                      row allows you to activate, deactivate, or permanently delete an account.
                      Deactivated accounts cannot log in but their data is retained.
                    </p>

                    <h4 className="manual-sub">Moderating Postings</h4>
                    <p className="manual-p">
                      <em>Admin &rarr; Postings</em> lists every opportunity on the platform
                      regardless of employer. You can approve pending listings, edit any field, or
                      remove postings that violate the platform's guidelines. Changes take effect
                      immediately.
                    </p>

                    <h4 className="manual-sub">System Settings</h4>
                    <p className="manual-p">
                      Under <em>System Settings</em> you can configure global parameters such as
                      the maximum file upload size, the set of allowed opportunity types, and
                      maintenance-mode toggles. Changes require admin credentials and take effect
                      without a server restart.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── 3. Sample Scenario ── */}
            <div className="manual-card" style={{ marginTop: '2rem' }}>
              <div className="manual-card-header">
                <h3>3. Sample Scenario</h3>
              </div>
              <div className="manual-body">
                <p className="manual-p">
                  The following walkthrough illustrates a complete end-to-end session for a
                  student applying to a software engineering internship.
                </p>
                <ol className="manual-steps">
                  <li>
                    <strong>Browse.</strong> Go to Browse Opportunities, filter by Type = Internship,
                    and bookmark the target posting.
                  </li>
                  <li>
                    <strong>Request Feedback.</strong> Open Document Feedback, upload your CV PDF,
                    select the bookmarked internship from the opportunity dropdown, and click
                    AI Review (Interactive).
                  </li>
                  <li>
                    <strong>Wait for Processing.</strong> The status banner moves from Processing
                    to Awaiting Review in approximately 45 seconds.
                  </li>
                  <li>
                    <strong>Review Proposals.</strong> The modal opens with 12 proposals. Accept
                    the 9 that rewrite weak bullet points and strengthen the skills section.
                    Reject the 3 that alter your tone beyond preference.
                  </li>
                  <li>
                    <strong>Submit and Download.</strong> Click Submit Review. After approximately
                    25 seconds a finalised PDF appears in Session History. Download it.
                  </li>
                  <li>
                    <strong>Auto-Apply.</strong> Navigate to Auto-Apply, select the same internship,
                    confirm the revised PDF is attached, and start the agent. A confirmation
                    notification appears when the application is submitted.
                  </li>
                  <li>
                    <strong>Track.</strong> Check the Calendar page — the application deadline is
                    pinned so you can schedule a follow-up.
                  </li>
                </ol>
              </div>
            </div>

            {/* ── 4. FAQ ── */}
            <div className="manual-card" style={{ marginTop: '2rem' }}>
              <div className="manual-card-header">
                <h3>4. Frequently Asked Questions</h3>
              </div>
              <div className="manual-body" style={{ paddingTop: 0 }}>
                <FaqAccordion />
              </div>
            </div>

          </section>

          {/* Reports */}
          <section id="reports" className="section">
            <h2>Project Reports & Documentation</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>Project Specification Document</h3>
                <p>Initial project scope and requirements definition.</p>
                <a href="/reports/T2528_Project_Specification_Document.pdf" target="_blank" rel="noopener noreferrer" className="btn">View Report</a>
              </div>
              <div className="report-card">
                <h3>Analysis and Requirements Report</h3>
                <p>Comprehensive system requirements and analysis.</p>
                <a href="/reports/T2528_Analysis_and_Requirements_Report.pdf" target="_blank" rel="noopener noreferrer" className="btn">View Report</a>
              </div>
              <div className="report-card">
                <h3>Detailed Design Report</h3>
                <p>Technical architecture and implementation design details.</p>
                <a href="/reports/T2528_Detailed_Design_Report.pdf" target="_blank" rel="noopener noreferrer" className="btn">View Report</a>
              </div>
            </div>
          </section>

          {/* Logbooks */}
          <section id="logbooks" className="section">
            <h2>Project Logbooks</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>Begüm Filiz Öz — Logbook</h3>
                <p>PDF logbook documenting individual contributions.</p>
                <a href="/logbooks/begum_logbook.pdf" target="_blank" rel="noopener noreferrer" className="btn">View Logbook</a>
              </div>
              <div className="report-card">
                <h3>Bertan Turgut — Logbook</h3>
                <p>PDF logbook documenting individual contributions.</p>
                <a href="/logbooks/bertan_logbook.pdf" target="_blank" rel="noopener noreferrer" className="btn">View Logbook</a>
              </div>
            </div>
          </section>

          {/* Repositories */}
          <section id="repositories" className="section">
            <h2>GitHub Repositories</h2>
            <div className="repo-grid">
              <div className="repo-card">
                <h3>Main Repository</h3>
                <p>Primary project repository containing all source code.</p>
                <a href="https://github.com/uppGrad" target="_blank" rel="noopener noreferrer" className="btn">View Repository</a>
              </div>
            </div>
          </section>

          {/* Team */}
          <section id="team" className="section">
            <h2>Team Members</h2>
            <div className="team-grid">
              {[
                { name: 'Ali Özhavala',    email: 'ali.ozhavala@ug.bilkent.edu.tr' },
                { name: 'Begüm Filiz Öz',  email: 'filiz.oz@ug.bilkent.edu.tr' },
                { name: 'Bertan Turgut',   email: 'bertan.turgut@ug.bilkent.edu.tr' },
                { name: 'Emre Uçar',       email: 'emre.ucar@ug.bilkent.edu.tr' },
                { name: 'Koray Sevil',     email: 'koray.sevil@ug.bilkent.edu.tr' },
              ].map((m) => (
                <div key={m.email} className="team-member">
                  <div className="member-avatar">&#128105;&#8205;&#128187;</div>
                  <h3>{m.name}</h3>
                  <p>{m.email}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 UppGrad Senior Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
