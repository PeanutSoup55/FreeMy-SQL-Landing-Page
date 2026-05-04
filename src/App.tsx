import { useEffect, useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;700&family=Pacifico&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #fff; overflow-x: hidden; }

  :root {
    --g-dark:   #1B3D2F;
    --g-mid:    #2D6A4F;
    --g-accent: #52B788;
    --g-soft:   #95D5B2;
    --g-pastel: #B7E4C7;
    --g-light:  #D8F3DC;
    --g-pale:   #EEF8F2;
  }

  .page { width: 100%; position: relative; }

  .section {
    width: 100%;
    padding: 0 clamp(1.5rem, 6vw, 8rem);
    position: relative;
  }

  /* ══════════════════════════════
     MONO TOP — WHITE / BLACK
  ══════════════════════════════ */

  .hero {
    background: #fff;
    border-bottom: 3px solid #000;
    padding-top: 6rem;
    padding-bottom: 5rem;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-grid-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px),
      repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.08) 79px, rgba(0,0,0,0.08) 80px);
  }

  .hero-tag {
    font-family: 'Courier Prime', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #000;
    border: 1.5px solid #000;
    display: inline-block;
    padding: 0.35rem 0.75rem;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(5rem, 14vw, 12rem);
    line-height: 0.88;
    color: #000;
    letter-spacing: -0.01em;
    position: relative;
    z-index: 1;
  }

  .hero-title span.stroke {
    -webkit-text-stroke: 2.5px #000;
    color: transparent;
  }

  .hero-subtitle {
    font-family: 'Courier Prime', monospace;
    font-size: clamp(0.8rem, 1.4vw, 1rem);
    line-height: 1.7;
    color: #000;
    max-width: 38ch;
    margin-top: 2rem;
    border-left: 3px solid #000;
    padding-left: 1.2rem;
    position: relative;
    z-index: 1;
  }

  .hero-meta {
    display: flex;
    gap: 3rem;
    margin-top: 3rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .hero-meta-item {
    font-family: 'Courier Prime', monospace;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #000;
  }

  .hero-meta-item strong {
    display: block;
    font-size: 1.8rem;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  /* ── SQL SCROLLER ── */
  .sql-scroller {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: clamp(240px, 34vw, 480px);
    overflow: hidden;
    border-left: 2px solid #000;
    mask-image: linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%);
  }

  .sql-scroller-track {
    animation: sqlScroll 45s linear infinite;
    padding: 4rem 2rem 0;
  }

  @keyframes sqlScroll {
    from { transform: translateY(0); }
    to   { transform: translateY(-50%); }
  }

  .sql-line {
    font-family: 'Courier Prime', monospace;
    font-size: 0.78rem;
    line-height: 1.72;
    color: #000;
    white-space: pre;
    opacity: 0.8;
  }

  .sql-comment { opacity: 0.28; }
  .sql-keyword { opacity: 1; font-weight: 700; }
  .sql-divider { opacity: 0.14; margin: 0.4rem 0; letter-spacing: 0.05em; }

  /* ── MANIFESTO ── */
  .manifesto {
    background: #fff;
    border-bottom: 2px solid #000;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .manifesto-inner {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 5rem;
    align-items: center;
  }

  .manifesto-stat {
    text-align: center;
    border-right: 2px solid #000;
    padding-right: 5rem;
    flex-shrink: 0;
  }

  .manifesto-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(5rem, 10vw, 9rem);
    color: #000;
    line-height: 0.85;
    display: block;
  }

  .manifesto-stat-label {
    font-family: 'Courier Prime', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #555;
    display: block;
    margin-top: 0.5rem;
  }

  .manifesto-quote {
    font-family: 'Courier Prime', monospace;
    font-size: clamp(0.95rem, 1.7vw, 1.3rem);
    line-height: 1.65;
    color: #000;
  }

  .manifesto-quote em {
    font-style: italic;
    border-bottom: 1.5px solid #000;
  }

  /* ── PAIN GRID ── */
  .works {
    background: #f5f5f5;
    border-bottom: 3px solid #000;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .works-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 3rem;
    border-bottom: 1.5px solid #000;
    padding-bottom: 1rem;
  }

  .works-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.5rem, 6vw, 5rem);
    color: #000;
  }

  .works-count {
    font-family: 'Courier Prime', monospace;
    font-size: 0.75rem;
    color: #666;
    letter-spacing: 0.15em;
  }

  .works-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1.5px solid #000;
  }

  .work-card {
    border: 1.5px solid #000;
    padding: 2rem 1.5rem;
    background: #fff;
    transition: background 0.2s;
    cursor: pointer;
  }

  .work-card:hover { background: #000; }
  .work-card:hover .work-card-title,
  .work-card:hover .work-card-num,
  .work-card:hover .work-card-desc { color: #fff; }

  .work-card-num {
    font-family: 'Courier Prime', monospace;
    font-size: 0.65rem;
    color: #aaa;
    letter-spacing: 0.2em;
    margin-bottom: 2.5rem;
    transition: color 0.2s;
  }

  .work-card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    color: #000;
    line-height: 1;
    transition: color 0.2s;
  }

  .work-card-desc {
    font-family: 'Courier Prime', monospace;
    font-size: 0.7rem;
    color: #555;
    margin-top: 0.75rem;
    line-height: 1.55;
    transition: color 0.2s;
  }

  /* ── TRANSITION BAND ── */
  .transition-band {
    padding-top: 5rem;
    padding-bottom: 5rem;
    background: linear-gradient(to bottom,
      #f5f5f5 0%,
      #eef8f2 30%,
      #d8f3dc 65%,
      #b7e4c7 100%
    );
    position: relative;
    overflow: hidden;
  }

  .transition-band::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 50%, rgba(45,106,79,0.1) 0%, transparent 60%),
      radial-gradient(circle at 80% 50%, rgba(82,183,136,0.1) 0%, transparent 60%);
  }

  .transition-marquee { overflow: hidden; white-space: nowrap; position: relative; z-index: 1; }
  .transition-marquee-inner { display: inline-block; animation: marquee 18s linear infinite; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .transition-marquee-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4rem, 10vw, 8rem);
    letter-spacing: 0.05em;
    margin-right: 3rem;
    display: inline;
  }

  .tm-mono   { color: #111; }
  .tm-stroke { -webkit-text-stroke: 2px #111; color: transparent; }
  .tm-g1     { color: var(--g-mid); }
  .tm-g2     { color: var(--g-accent); }
  .tm-g3     { color: var(--g-dark); }

  .transition-dots {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 3rem;
    position: relative;
    z-index: 1;
  }

  .transition-dot { border-radius: 50%; }

  /* ══════════════════════════════
     GREEN BRUTALIST BOTTOM
  ══════════════════════════════ */

  .color-zone {
    background: var(--g-pale);
    border-top: 4px solid #000;
    padding-top: 6rem;
    padding-bottom: 6rem;
    position: relative;
    overflow: hidden;
  }

  /* subtle green grid */
  .color-zone::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(45,106,79,0.07) 79px, rgba(45,106,79,0.07) 80px),
      repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(45,106,79,0.07) 79px, rgba(45,106,79,0.07) 80px);
  }

  .color-zone-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3.5rem, 10vw, 9rem);
    color: #000;
    line-height: 0.9;
    position: relative;
    z-index: 1;
  }

  .color-zone-title .whimsy {
    font-family: 'Pacifico', cursive;
    font-size: 0.42em;
    color: var(--g-mid);
    display: block;
    transform: rotate(-2deg);
    margin-bottom: 0.3em;
  }

  .color-zone-stripe {
    height: 4px;
    background: var(--g-mid);
    width: clamp(80px, 15vw, 200px);
    margin-top: 1.5rem;
    margin-bottom: 4rem;
    position: relative;
    z-index: 1;
  }

  /* feature cards — brutalist green */
  .color-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    border: 2.5px solid #000;
    position: relative;
    z-index: 1;
  }

  .color-card {
    background: #fff;
    border: 2.5px solid #000;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    transition: background 0.22s;
    cursor: default;
  }

  /* green left accent bar */
  .color-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 5px;
    height: 100%;
    background: var(--g-mid);
    transition: width 0.22s;
    z-index: 0;
  }

  .color-card:hover::before { width: 100%; }

  .color-card:hover .color-card-icon,
  .color-card:hover .color-card-title,
  .color-card:hover .color-card-accent,
  .color-card:hover .color-card-body { color: #fff; }

  .color-card-icon {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    color: var(--g-mid);
    display: block;
    position: relative;
    z-index: 1;
    transition: color 0.22s;
  }

  .color-card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.7rem;
    color: #000;
    letter-spacing: 0.03em;
    line-height: 1;
    position: relative;
    z-index: 1;
    transition: color 0.22s;
  }

  .color-card-accent {
    font-family: 'Caveat', cursive;
    font-size: 1rem;
    color: var(--g-mid);
    margin-top: 0.4rem;
    display: block;
    position: relative;
    z-index: 1;
    transition: color 0.22s;
  }

  .color-card-body {
    font-family: 'Courier Prime', monospace;
    font-size: 0.72rem;
    color: #444;
    line-height: 1.65;
    margin-top: 1rem;
    position: relative;
    z-index: 1;
    transition: color 0.22s;
  }

  /* ── FOOTER ── */
  .footer-zone {
    background: var(--g-dark);
    border-top: 4px solid var(--g-pastel);
    padding-top: 4rem;
    padding-bottom: 4rem;
    position: relative;
    overflow: hidden;
  }

  .footer-zone::after {
    content: '';
    position: absolute;
    bottom: -40px; right: -40px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: var(--g-mid);
    opacity: 0.35;
  }

  .footer-big {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 9vw, 8rem);
    color: var(--g-pastel);
    line-height: 0.9;
    position: relative;
    z-index: 1;
  }

  .footer-big .script {
    font-family: 'Caveat', cursive;
    color: var(--g-soft);
    font-size: 0.45em;
    display: inline-block;
    transform: rotate(-3deg);
    vertical-align: middle;
    margin-right: 0.5rem;
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    margin-top: 2.5rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .footer-link {
    font-family: 'Courier Prime', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(183,228,199,0.55);
    text-decoration: none;
    border-bottom: 1px solid rgba(183,228,199,0.2);
    padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
  }

  .footer-link:hover { color: var(--g-pastel); border-color: var(--g-pastel); }

  .footer-copy {
    font-family: 'Courier Prime', monospace;
    font-size: 0.65rem;
    color: rgba(183,228,199,0.3);
    margin-top: 3rem;
    letter-spacing: 0.1em;
    position: relative;
    z-index: 1;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .sql-scroller { display: none; }
    .manifesto-inner { grid-template-columns: 1fr; gap: 2rem; }
    .manifesto-stat { border-right: none; border-bottom: 2px solid #000; padding-right: 0; padding-bottom: 2rem; }
    .works-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 560px) {
    .works-grid { grid-template-columns: 1fr; }
    .color-cards { grid-template-columns: 1fr; }
  }
`;

// ── SQL LINES ──
type SqlLine = { text: string; cls: string };

const SQL_LINES: SqlLine[] = [
  { text: "SELECT", cls: "sql-keyword" },
  { text: "  e.first_name,", cls: "sql-line" },
  { text: "  e.last_name,", cls: "sql-line" },
  { text: "  d.name       AS department,", cls: "sql-line" },
  { text: "  p.title      AS project,", cls: "sql-line" },
  { text: "  a.role", cls: "sql-line" },
  { text: "FROM employees e", cls: "sql-keyword" },
  { text: "INNER JOIN departments d", cls: "sql-keyword" },
  { text: "  ON e.dept_id = d.id", cls: "sql-line" },
  { text: "LEFT JOIN assignments a", cls: "sql-keyword" },
  { text: "  ON a.employee_id = e.id", cls: "sql-line" },
  { text: "LEFT JOIN projects p", cls: "sql-keyword" },
  { text: "  ON a.project_id = p.id", cls: "sql-line" },
  { text: "WHERE d.budget > 50000", cls: "sql-line" },
  { text: "  AND e.hired_date < '2023-01-01'", cls: "sql-line" },
  { text: "  AND e.email IS NOT NULL", cls: "sql-line" },
  { text: "ORDER BY d.name ASC,", cls: "sql-line" },
  { text: "         e.last_name ASC;", cls: "sql-line" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "CREATE TABLE employees (", cls: "sql-keyword" },
  { text: "  id         INT PRIMARY KEY", cls: "sql-line" },
  { text: "             AUTO_INCREMENT,", cls: "sql-line" },
  { text: "  first_name VARCHAR(100) NOT NULL,", cls: "sql-line" },
  { text: "  last_name  VARCHAR(100) NOT NULL,", cls: "sql-line" },
  { text: "  email      VARCHAR(255) UNIQUE,", cls: "sql-line" },
  { text: "  dept_id    INT,", cls: "sql-line" },
  { text: "  hired_date DATE,", cls: "sql-line" },
  { text: "  FOREIGN KEY (dept_id)", cls: "sql-line" },
  { text: "    REFERENCES departments(id)", cls: "sql-line" },
  { text: "    ON DELETE SET NULL", cls: "sql-line" },
  { text: ");", cls: "sql-line" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "-- Error Code: 1064", cls: "sql-comment" },
  { text: "-- You have an error in your SQL syntax;", cls: "sql-comment" },
  { text: "-- check the manual that corresponds", cls: "sql-comment" },
  { text: "-- to your MySQL server version", cls: "sql-comment" },
  { text: "-- for the right syntax to use near", cls: "sql-comment" },
  { text: "-- '' at line 1", cls: "sql-comment" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "ALTER TABLE projects", cls: "sql-keyword" },
  { text: "  ADD COLUMN dept_id INT,", cls: "sql-line" },
  { text: "  ADD CONSTRAINT fk_proj_dept", cls: "sql-line" },
  { text: "    FOREIGN KEY (dept_id)", cls: "sql-line" },
  { text: "    REFERENCES departments(id)", cls: "sql-line" },
  { text: "    ON UPDATE CASCADE", cls: "sql-line" },
  { text: "    ON DELETE RESTRICT;", cls: "sql-line" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "UPDATE employees", cls: "sql-keyword" },
  { text: "SET dept_id = (", cls: "sql-line" },
  { text: "  SELECT id", cls: "sql-line" },
  { text: "  FROM departments", cls: "sql-line" },
  { text: "  WHERE name = 'Engineering'", cls: "sql-line" },
  { text: ")", cls: "sql-line" },
  { text: "WHERE email LIKE '%@company.com'", cls: "sql-line" },
  { text: "  AND hired_date > '2022-06-01';", cls: "sql-line" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "GRANT SELECT, INSERT, UPDATE", cls: "sql-keyword" },
  { text: "  ON company.*", cls: "sql-line" },
  { text: "  TO 'app_user'@'localhost'", cls: "sql-line" },
  { text: "  IDENTIFIED BY 'p@ssw0rd!';", cls: "sql-line" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "-- Error Code: 1175", cls: "sql-comment" },
  { text: "-- You are using safe update mode", cls: "sql-comment" },
  { text: "-- and you tried to update a table", cls: "sql-comment" },
  { text: "-- without a WHERE that uses a KEY", cls: "sql-comment" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "DELETE FROM assignments", cls: "sql-keyword" },
  { text: "WHERE employee_id IN (", cls: "sql-line" },
  { text: "  SELECT id FROM employees", cls: "sql-line" },
  { text: "  WHERE dept_id IS NULL", cls: "sql-line" },
  { text: "    AND hired_date < '2020-01-01'", cls: "sql-line" },
  { text: ");", cls: "sql-line" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "SELECT d.name,", cls: "sql-keyword" },
  { text: "  COUNT(e.id)     AS headcount,", cls: "sql-line" },
  { text: "  AVG(p.budget)   AS avg_budget,", cls: "sql-line" },
  { text: "  MAX(p.deadline) AS next_deadline", cls: "sql-line" },
  { text: "FROM departments d", cls: "sql-keyword" },
  { text: "LEFT JOIN employees e ON e.dept_id = d.id", cls: "sql-line" },
  { text: "LEFT JOIN projects p  ON p.dept_id = d.id", cls: "sql-line" },
  { text: "GROUP BY d.name", cls: "sql-line" },
  { text: "HAVING COUNT(e.id) > 3", cls: "sql-line" },
  { text: "ORDER BY headcount DESC;", cls: "sql-line" },
  { text: "────────────────────────────────", cls: "sql-divider" },
  { text: "CREATE INDEX idx_emp_dept", cls: "sql-keyword" },
  { text: "  ON employees (dept_id, last_name);", cls: "sql-line" },
  { text: "CREATE INDEX idx_proj_deadline", cls: "sql-keyword" },
  { text: "  ON projects (deadline DESC);", cls: "sql-line" },
  { text: "────────────────────────────────", cls: "sql-divider" },
];

function SQLScroller() {
  const doubled = [...SQL_LINES, ...SQL_LINES];
  return (
    <div className="sql-scroller">
      <div className="sql-scroller-track">
        {doubled.map((line, i) => (
          <div key={i} className={`sql-line ${line.cls}`}>{line.text}</div>
        ))}
      </div>
    </div>
  );
}

function TransitionLineArt() {
  return (
    <svg width="100%" height="80" viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#000" />
          <stop offset="40%"  stopColor="#2D6A4F" />
          <stop offset="70%"  stopColor="#52B788" />
          <stop offset="100%" stopColor="#B7E4C7" />
        </linearGradient>
      </defs>
      <path d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
      <path d="M0,50 C150,20 350,80 600,50 C850,20 1050,80 1200,50" stroke="url(#lineGrad)" strokeWidth="1" fill="none" strokeDasharray="6 3" opacity="0.5" />
    </svg>
  );
}

const WORK_CARDS = [
  { num: "001", title: "SQL IS A LANGUAGE", desc: "You're a developer, not a DBA. Yet every query demands fluency in a 50-year-old syntax most engineers only ever half-know." },
  { num: "002", title: "INVISIBLE STRUCTURE", desc: "Your schema lives in the terminal. You cannot see or navigate it without writing yet another query to describe itself." },
  { num: "003", title: "NO GUARDRAILS", desc: "A missing WHERE on UPDATE. No confirmation. No undo. SQL executes on live data and never once asks if you are sure." },
  { num: "004", title: "HIRING TAX", desc: "Every new team member must learn your schema AND SQL before contributing anything. The knowledge debt compounds with every hire." },
  { num: "005", title: "MIGRATIONS ARE EVENTS", desc: "Changing a column type means ALTER TABLE, data transforms, downtime, and prayer. Every small fix becomes a production risk." },
  { num: "006", title: "THE TERMINAL IS FOREVER", desc: "No preview. No diff. No visual feedback. Just a cursor blinking in the dark, and your entire dataset riding on your memory." },
];

const COLOR_CARDS = [
  { icon: "⬡", title: "VISUAL SCHEMA", accent: "click, don't type", body: "Build your entire database by clicking. Add tables, columns, types, and constraints — no CREATE TABLE, no semicolons, no syntax errors." },
  { icon: "◈", title: "POINT & CLICK QUERIES", accent: "filter like magic", body: "Pick your columns. Set your filters. Hit run. Free My Query writes the SQL in the background — you never have to see it." },
  { icon: "✦", title: "LIVE RELATIONSHIPS", accent: "draw the line", body: "Connect tables by dragging. FK constraints, joins, and cascades — handled visually. Zero ALTER TABLE commands required." },
  { icon: "◉", title: "ZERO SQL REQUIRED", accent: "seriously. none.", body: "From schema design to complex multi-table queries — 100% GUI, 0% syntax. Everything MySQL Workbench does, minus everything you hated." },
];

const DOT_SIZES  = [8, 14, 10, 18, 6, 22, 12, 8, 16];
const DOT_COLORS = ["#111", "#444", "#2D6A4F44", "#52B78866", "#2D6A4F", "#52B788", "#B7E4C7", "#1B3D2F", "#95D5B2"];

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="page">

        {/* ── HERO ── */}
        <section className="section hero">
          <div className="hero-grid-lines" />
          <div className="hero-tag">MySQL Workbench — The Old Way</div>
          <h1 className="hero-title">
            SQL.<br />
            <span className="stroke">THE</span><br />
            HARD WAY
          </h1>
          <p className="hero-subtitle">
            You wanted to query a database.
            Instead you got 47 lines of JOIN syntax,
            three Stack Overflow tabs, and a career-defining
            semicolon on the wrong line.
          </p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <strong>47</strong>Avg. lines per query
            </div>
            <div className="hero-meta-item">
              <strong>3×</strong>Stack Overflow tabs
            </div>
            <div className="hero-meta-item">
              <strong>01</strong>Missing semicolon
            </div>
          </div>
          <SQLScroller />
        </section>

        {/* ── MANIFESTO ── */}
        <section className="section manifesto">
          <div className="manifesto-inner">
            <div className="manifesto-stat">
              <span className="manifesto-stat-num">50</span>
              <span className="manifesto-stat-label">years of SQL</span>
            </div>
            <p className="manifesto-quote">
              SQL has been the only way to talk to a database for half a century.
              In that time, the syntax grew more powerful and the errors grew{" "}
              <em>more cryptic</em>. MySQL Workbench gives you a GUI, then asks you
              to write raw SQL inside it anyway. The interface is a wrapper around
              the same terminal you were already afraid of.
              Nothing was solved. Everything was repackaged.
            </p>
          </div>
        </section>

        {/* ── PAIN GRID ── */}
        <section className="section works">
          <div className="works-header">
            <h2 className="works-title">THE REAL PROBLEMS</h2>
            <span className="works-count">06 / ROOT CAUSES</span>
          </div>
          <div className="works-grid">
            {WORK_CARDS.map((card) => (
              <div className="work-card" key={card.num}>
                <div className="work-card-num">{card.num}</div>
                <div className="work-card-title">{card.title}</div>
                <p className="work-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRANSITION ── */}
        <section className="transition-band">
          <div className="transition-marquee">
            <div className="transition-marquee-inner">
              {[...Array(2)].map((_, i) => (
                <span key={i}>
                  <span className="transition-marquee-text tm-mono">SELECT * FROM </span>
                  <span className="transition-marquee-text tm-stroke">PAIN </span>
                  <span className="transition-marquee-text tm-mono">WHERE SQL </span>
                  <span className="transition-marquee-text tm-stroke">IS NULL </span>
                  <span className="transition-marquee-text tm-g3">FREE </span>
                  <span className="transition-marquee-text tm-g1">YOUR </span>
                  <span className="transition-marquee-text tm-g2">QUERY </span>
                  <span className="transition-marquee-text tm-stroke">NO SQL </span>
                  <span className="transition-marquee-text tm-g1">EVER </span>
                </span>
              ))}
            </div>
          </div>
          <div className="transition-dots">
            {DOT_SIZES.map((size, i) => (
              <div
                key={i}
                className="transition-dot"
                style={{
                  width: size,
                  height: size,
                  background: DOT_COLORS[i],
                  transform: `translateY(${Math.sin((scrollY / 200) + i) * 8}px)`,
                  transition: "transform 0.1s",
                }}
              />
            ))}
          </div>
          <div style={{ marginTop: "3rem" }}>
            <TransitionLineArt />
          </div>
        </section>

        {/* ── GREEN BRUTALIST FEATURE ZONE ── */}
        <section className="section color-zone">
          <h2 className="color-zone-title">
            <span className="whimsy">no sql required —</span>
            FREE MY<br />QUERY
          </h2>
          <div className="color-zone-stripe" />
          <div className="color-cards">
            {COLOR_CARDS.map((card) => (
              <div className="color-card" key={card.title}>
                <span className="color-card-icon">{card.icon}</span>
                <div className="color-card-title">{card.title}</div>
                <span className="color-card-accent">{card.accent}</span>
                <p className="color-card-body">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <section className="section footer-zone">
          <div className="footer-big">
            <span className="script">finally —</span>FREE MY<br />
            <span className="script">goodbye SQL</span>QUERY
          </div>
          <div className="footer-links">
            {["Features", "Pricing", "Docs", "Download", "Contact"].map((link) => (
              <a key={link} href="#" className="footer-link">{link}</a>
            ))}
          </div>
          <p className="footer-copy">© 2026 — Free My Query — SQL belongs in the past</p>
        </section>

      </div>
    </>
  );
}