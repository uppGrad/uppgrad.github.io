import { useState } from 'react'
import './App.css'

// ─── Screenshot Placeholder ───────────────────────────────────────────────────

interface ScreenshotProps {
  id: string
  label: string
  caption: string
  src?: string
  portrait?: boolean  // narrow centered display for modal/panel screenshots
}

function Screenshot({ id, label, caption, src, portrait = false }: ScreenshotProps) {
  const wrapClass = portrait ? 'screenshot-figure screenshot-figure--portrait' : 'screenshot-figure'
  return (
    <figure className={wrapClass}>
      {src ? (
        <div className="screenshot-box screenshot-box--real">
          <img src={src} alt={label} className="screenshot-img" loading="lazy" />
        </div>
      ) : (
        <div className="screenshot-box">
          <div className="screenshot-inner">
            <svg className="screenshot-camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
            <span className="screenshot-id">{id}</span>
            <span className="screenshot-label">{label}</span>
            <span className="screenshot-hint">Screenshot coming soon</span>
          </div>
        </div>
      )}
      <figcaption className="screenshot-caption">
        <strong className="screenshot-caption-id">{id}</strong>{caption}
      </figcaption>
    </figure>
  )
}

// Side-by-side portrait screenshots (for modal / panel pairs)
function ScreenshotPair({ left, right }: { left: ScreenshotProps; right: ScreenshotProps }) {
  return (
    <div className="screenshot-pair">
      <Screenshot {...left}  portrait />
      <Screenshot {...right} portrait />
    </div>
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

type Role = 'student' | 'employer'

const ROLE_LABELS: Record<Role, string> = {
  student: 'Student',
  employer: 'Employer',
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
            AI-powered career platform for students and employers
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
                  Open the deployed UppGrad application to try the student and employer
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
                <h4 className="manual-sub">1.1 Signing In</h4>
                <p className="manual-p">
                  Navigate to the UppGrad login page. Select your role — <strong>Student</strong> or
                  <strong> Employer</strong> — then enter your username or university email and
                  password. Tick <em>Remember me</em> to stay signed in across sessions. If you
                  have forgotten your password, click <em>Forgot password?</em> to receive a
                  reset link by email.
                </p>

                <Screenshot
                  id="SS-01"
                  label="Login page"
                  caption="The login page. Select your role, enter your credentials, and click Sign In. New users should click Sign up."
                  src="/screenshots/ss-01.png"
                />

                <h4 className="manual-sub">1.2 Creating an Account</h4>
                <p className="manual-p">
                  Click <em>Sign up</em> on the login page. Choose your role — Student (looking
                  for opportunities) or Employer (hiring). Fill in your first name, last name,
                  and university email, then click <em>Send Verification Code</em>. Enter the
                  six-digit code delivered to your inbox, set a strong password, accept the Terms
                  of Service, and click <em>Create Account</em>.
                </p>

                <Screenshot
                  id="SS-02"
                  label="Registration form"
                  caption="The registration form. A verification code is sent to your university email before the account is created."
                  src="/screenshots/ss-02.png"
                />

                <h4 className="manual-sub">1.3 Your Profile</h4>
                <p className="manual-p">
                  After signing in, navigate to <em>Profile</em> from the top navigation bar.
                  Here you can upload a profile picture, edit your bio, add education and work
                  experience entries, list your skills, and link your GitHub, LinkedIn, and
                  portfolio. Click <em>Add CV</em> to attach a default CV file that will be
                  pre-selected in document feedback sessions and auto-apply flows. A complete
                  profile significantly improves AI recommendation accuracy.
                </p>

                <Screenshot
                  id="SS-03"
                  label="Student profile page"
                  caption="The Profile page showing personal details, education, and skills. Use Add CV to attach a default document."
                  src="/screenshots/ss-03.png"
                />

                <h4 className="manual-sub">1.4 The Dashboard</h4>
                <p className="manual-p">
                  The Dashboard is the first page you see after logging in. It shows at a glance
                  how many applications you have submitted, interviews scheduled, opportunities
                  saved, and AI-recommended matches. The <em>Recent Opportunities</em> panel
                  surfaces new listings relevant to your profile. Use the top navigation bar to
                  move between sections.
                </p>

                <Screenshot
                  id="SS-04"
                  label="Student dashboard"
                  caption="The student dashboard. Quick-stat cards on top, upcoming events on the left, and recommended recent opportunities on the right."
                  src="/screenshots/ss-04.png"
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
                      label="Documental Feedback page"
                      caption="The Documental Feedback page. An active session banner appears at the top when a review is in progress. The upload form is below it, and completed session history at the bottom."
                      src="/screenshots/ss-05.png"
                    />

                    <Screenshot
                      id="SS-06"
                      label="Request New Feedback — form filled in"
                      caption="The upload form with a CV attached, a target opportunity selected, and custom instructions entered before clicking AI Review."
                      src="/screenshots/ss-06.png"
                    />

                    <p className="manual-p" style={{ marginTop: '1.25rem' }}>
                      After submission, a status banner appears at the top of the page with the
                      session number and current status. When status changes to{' '}
                      <em>Awaiting Your Review</em>, a highlighted <em>Review Proposals</em>{' '}
                      button appears. Click it to open the review panel. The full pipeline
                      typically completes in 30 to 90 seconds.
                    </p>

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
                      caption="Review Proposals modal. Left: original PDF with highlighted passage. Right: ranked proposal cards with accept and reject controls."
                      src="/screenshots/ss-07.png"
                    />

                    <p className="manual-p">
                      Once every proposal has a decision, the <em>Submit Review</em> button in
                      the footer activates. Click it to finalise. The system applies accepted
                      changes, compiles the revised document, and adds a download link to your
                      session history within approximately 30 seconds. Return to the{' '}
                      <em>Documental Feedback</em> page and look for the completed session card
                      with a <strong>Download</strong> button to save the revised PDF.
                    </p>

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
                      label="Browse Opportunities"
                      caption="The Opportunities page. Each listing shows the employer, type, location, post date, and an AI-calculated match percentage. Click any row to expand full details."
                      src="/screenshots/ss-10.png"
                    />

                    <h4 className="manual-sub">Auto-Apply</h4>
                    <p className="manual-p">
                      Auto-Apply delegates application drafting to the AI agent. Navigate to{' '}
                      <em>Auto-Apply</em>, select a target opportunity from the dropdown, add any
                      custom instructions to guide the agent (e.g. "highlight my embedded systems
                      experience"), and click <em>Start session</em>.
                    </p>

                    <Screenshot
                      id="SS-11"
                      label="Auto-Apply — start a new session"
                      caption="Select an opportunity, optionally add guidance, and click Start session to launch the agent."
                      src="/screenshots/ss-11.png"
                    />

                    <p className="manual-p">
                      The agent analyses the job requirements and identifies the documents needed
                      (CV, Cover Letter, etc.). A modal opens asking how you want to handle each
                      document — <em>Upload</em> an existing file, <em>Auto-generate</em> using
                      your profile, <em>Skip</em> to exclude it, or <em>Ignore for now</em> to
                      handle it yourself. Add per-document guidance in the text box below each
                      card, then click <em>Generate my materials</em>.
                    </p>

                    <ScreenshotPair
                      left={{
                        id: 'SS-11b',
                        label: 'Document selection',
                        caption: 'Choose Upload, Auto-generate, Skip, or Ignore for each required document. Add custom guidance per document.',
                        src: '/screenshots/ss-11b.png',
                      }}
                      right={{
                        id: 'SS-11c',
                        label: 'Review tailored package',
                        caption: 'The agent returns a tailored CV and Cover Letter. Expand each to review, then click Approve & auto-fill.',
                        src: '/screenshots/ss-11c.png',
                      }}
                    />

                    <p className="manual-p">
                      After generation, the <em>Review your tailored package</em> modal shows the
                      produced documents. Expand each to read the content and copy it if needed.
                      If <em>Try to fill the form for me</em> is checked, clicking{' '}
                      <em>Approve &amp; auto-fill</em> launches a headless browser that fills the
                      application form on the employer's site. You review the filled form at its
                      URL before anything is submitted.
                    </p>
                  </div>
                )}

                {/* ── EMPLOYER ── */}
                {role === 'employer' && (
                  <div className="role-content">

                    <h4 className="manual-sub">Employer Dashboard</h4>
                    <p className="manual-p">
                      After signing in as an employer, you land on the Employer Dashboard. The
                      four stat cards at the top show your Active Job Postings, Applications
                      Received, Interviews Scheduled, and Candidates Hired. The Quick Actions
                      panel provides direct shortcuts to post a new opportunity or view your
                      existing listings.
                    </p>

                    <Screenshot
                      id="SS-12"
                      label="Employer Dashboard"
                      caption="The Employer Dashboard showing activity stats and quick actions for managing postings."
                      src="/screenshots/ss-12.png"
                    />

                    <h4 className="manual-sub">Posting an Opportunity</h4>
                    <p className="manual-p">
                      Click <em>Post Opportunity</em> in the top navigation. Fill in all required
                      fields: job title, location, job type, work mode, experience level, salary
                      range, application deadline, and a full job description. Add key
                      responsibilities, requirements, and skill keywords so the platform can
                      calculate accurate match scores for student profiles. Choose the{' '}
                      <em>Application Method</em> — <strong>Agentic Apply (AI-Powered)</strong>{' '}
                      lets students apply directly through UppGrad's auto-apply pipeline. Click{' '}
                      <em>Post Opportunity</em> to publish immediately.
                    </p>

                    <ScreenshotPair
                      left={{
                        id: 'SS-12b',
                        label: 'Post Opportunity — basic info and compensation',
                        caption: 'Top of the Post Opportunity form: job title, type, location, salary range, and deadline.',
                        src: '/screenshots/ss-12b.png',
                      }}
                      right={{
                        id: 'SS-12c',
                        label: 'Post Opportunity — details and application method',
                        caption: 'Lower portion: responsibilities, requirements, skill keywords, benefits, and the application method selector.',
                        src: '/screenshots/ss-12c.png',
                      }}
                    />

                    <h4 className="manual-sub">Managing Postings and Reviewing Applicants</h4>
                    <p className="manual-p">
                      Navigate to <em>Postings</em> in the top navigation to see all your listings
                      with aggregate stats: Total Postings, Active Postings, and Total Applicants.
                      Each listing card shows the job title, status badge, location, salary range,
                      and post date. Use the <em>View Applicants</em> button to review candidates,{' '}
                      <em>Analytics</em> to see engagement metrics, or <em>Close Posting</em> to
                      deactivate the listing.
                    </p>

                    <Screenshot
                      id="SS-13"
                      label="Job Postings — manage listings and applicants"
                      caption="The Postings page listing all active opportunities with applicant counts and management actions."
                      src="/screenshots/ss-13.png"
                    />

                    <ol className="manual-steps">
                      <li>Open <em>Postings</em> from the top navigation bar.</li>
                      <li>Click <em>View Applicants</em> on a listing to see all candidates who applied.</li>
                      <li>Click a student's name to view their full profile, CV, and application materials.</li>
                      <li>Use <em>Analytics</em> to track views and application conversion for that posting.</li>
                      <li>Click <em>Close Posting</em> when the position is filled or the deadline passes.</li>
                    </ol>
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
              <div className="report-card">
                <h3>Final Report</h3>
                <p>Complete final project report covering all phases and outcomes.</p>
                <a href="/reports/T2528_Final_Report.pdf" target="_blank" rel="noopener noreferrer" className="btn">View Report</a>
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
              <div className="report-card">
                <h3>Emre Uçar — Logbook</h3>
                <p>PDF logbook documenting individual contributions.</p>
                <a href="/logbooks/emre_logbook.pdf" target="_blank" rel="noopener noreferrer" className="btn">View Logbook</a>
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
