import React, { useMemo, useState } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import {
  User,
  Terminal,
  Sparkles,
  GitPullRequest,
  GitBranch,
  GitCommit,
  Search,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  FileCode2,
  ExternalLink,
  Layers,
  ArrowRight,
} from "lucide-react";

// GitHub SVG Icon component for 100% crisp rendering
function GithubIcon({ size = 16, color = "currentColor", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [guideOpen, setGuideOpen] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Vite loads all markdown files in raw format at build time
  const reflections = useMemo(() => {
    const modules = import.meta.glob("./reflections/*.md", {
      query: "?raw",
      eager: true,
    });

    return Object.entries(modules).map(([filepath, rawContent]) => {
      const { data, content } = matter(rawContent.default || rawContent);

      // Extract student ID from filename if possible
      const fileNameMatch = filepath.match(/\/([^\/]+)\.md$/);
      const fileId = fileNameMatch ? fileNameMatch[1] : "reflection";

      return {
        id: filepath,
        fileId: fileId,
        name: data.name || "Anonymous Student",
        studentId: data.studentId || fileId || "M.Sc. Candidate",
        github: data.githubUsername || "",
        favoriteTopic: data.favoriteTopic || "Bioinformatics Computing",
        quote: data.quote || "",
        body: content,
      };
    });
  }, []);

  // Filter reflections based on search input
  const filteredReflections = useMemo(() => {
    if (!searchQuery.trim()) return reflections;
    const query = searchQuery.toLowerCase();
    return reflections.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.studentId.toLowerCase().includes(query) ||
        item.favoriteTopic.toLowerCase().includes(query) ||
        item.github.toLowerCase().includes(query) ||
        item.body.toLowerCase().includes(query) ||
        item.quote.toLowerCase().includes(query),
    );
  }, [reflections, searchQuery]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const contributionSteps = [
    {
      step: "1",
      title: "Fork the Repository",
      desc: "Go to GitHub and click 'Fork' to create your own copy of the course repository.",
      code: "https://github.com/<your-username>/bioinfo-msc-2026-reflections",
    },
    {
      step: "2",
      title: "Clone Your Fork",
      desc: "Open your terminal and clone your repository locally:",
      code: "git clone https://github.com/<your-username>/bioinfo-msc-2026-reflections.git\ncd bioinfo-msc-2026-reflections",
    },
    {
      step: "3",
      title: "Create Feature Branch",
      desc: "Create a new Git branch named with your student ID:",
      code: "git checkout -b add-reflection-BIO-2026-XXX",
    },
    {
      step: "4",
      title: "Create Your Reflection File",
      desc: "Create src/reflections/<your-id>.md with this frontmatter format:",
      code: `---\nname: "Your Full Name"\nstudentId: "Your Student ID"\ngithubUsername: "your-github-handle"\nfavoriteTopic: "Your Favorite Linux/C++ Topic"\nquote: "One short quote about your experience"\n---\n\n### Course Reflection\n\nWrite 2-3 sentences about what you learned in Unit 1 & Unit 2.`,
    },
    {
      step: "5",
      title: "Stage, Commit & Push",
      desc: "Save your file and push your branch to GitHub:",
      code: `git add src/reflections/<your-id>.md\ngit commit -m "docs: Add reflection for <Your Name>"\ngit push -u origin add-reflection-<your-id>`,
    },
    {
      step: "6",
      title: "Submit Pull Request",
      desc: "Go to GitHub, click 'Compare & pull request', and submit! Once merged, your record appears live below.",
      code: "https://bioinfo-msc-2026-reflections.vercel.app",
    },
  ];

  return (
    <div style={styles.appContainer}>
      {/* Top Banner & Header */}
      <header style={styles.header}>
        <div style={styles.headerBadge}>
          <GraduationCap size={16} color="#38bdf8" />
          <span>M.Sc. Bioinformatics • Class of 2026</span>
          <span style={styles.badgeDivider}>•</span>
          <GitPullRequest size={14} color="#2da44e" />
          <span style={{ color: "#4ade80" }}>Live Git Lab Project</span>
        </div>

        <h1 style={styles.title}>
          Student Lab Reflections{" "}
          <span style={styles.titleGradient}>& Git Showcase</span>
        </h1>

        <p style={styles.subtitle}>
          This live site compiles first-time Git & GitHub open-source
          contributions from M.Sc. Bioinformatics students. Every entry below
          represents a student's first merged Pull Request!
        </p>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{reflections.length}</div>
            <div style={styles.statLabel}>Student Contributors</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>100%</div>
            <div style={styles.statLabel}>Merged via PRs</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>Unit 3</div>
            <div style={styles.statLabel}>Git & GitHub</div>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        {/* First-Time Contributor Guide Accordion */}
        <section style={styles.guideContainer}>
          <div
            style={styles.guideHeader}
            onClick={() => setGuideOpen(!guideOpen)}
            role="button"
            tabIndex={0}
          >
            <div style={styles.guideTitleGroup}>
              <div style={styles.guideIconBadge}>
                <GitBranch size={18} color="#a371f7" />
              </div>
              <div>
                <h2 style={styles.guideTitle}>
                  First-Time Student Contributor Guide
                </h2>
                <p style={styles.guideSub}>
                  Follow these steps to contribute your reflection file to this
                  live project via Git & GitHub
                </p>
              </div>
            </div>
            <div style={styles.guideToggleBtn}>
              {guideOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {guideOpen && (
            <div style={styles.guideBody}>
              <div style={styles.stepsGrid}>
                {contributionSteps.map((stepItem, idx) => (
                  <div key={idx} style={styles.stepCard}>
                    <div style={styles.stepHeader}>
                      <span style={styles.stepNumberBadge}>
                        Step {stepItem.step}
                      </span>
                      <h3 style={styles.stepTitle}>{stepItem.title}</h3>
                    </div>
                    <p
                      style={
                        stepItem.desc ? styles.stepDesc : { display: "none" }
                      }
                    >
                      {stepItem.desc}
                    </p>

                    <div style={styles.codeBlockWrapper}>
                      <pre style={styles.codeBlock}>
                        <code>{stepItem.code}</code>
                      </pre>
                      <button
                        style={styles.copyBtn}
                        onClick={() => copyToClipboard(stepItem.code, idx)}
                        title="Copy to clipboard"
                      >
                        {copiedIndex === idx ? (
                          <Check size={14} color="#4ade80" />
                        ) : (
                          <Copy size={14} color="#cbd5e1" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Search & Filter Header */}
        <div style={styles.controlsBar}>
          <div style={styles.searchWrapper}>
            <Search size={18} color="#64748b" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by student name, ID, favorite topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={styles.clearSearchBtn}
              >
                Clear
              </button>
            )}
          </div>

          <div style={styles.resultsCount}>
            Showing{" "}
            <strong style={{ color: "#38bdf8" }}>
              {filteredReflections.length}
            </strong>{" "}
            of {reflections.length} records
          </div>
        </div>

        {/* Horizontal Student Records List */}
        {filteredReflections.length === 0 ? (
          <div style={styles.emptyState}>
            <FileCode2 size={48} color="#64748b" />
            <h3 style={{ margin: "12px 0 6px 0", color: "#f8fafc" }}>
              No matching student reflections found
            </h3>
            <p style={{ color: "#94a3b8", margin: 0 }}>
              Try clearing your search query or searching for a different
              keyword.
            </p>
          </div>
        ) : (
          <div style={styles.horizontalRecordsList}>
            {filteredReflections.map((item) => (
              <article key={item.id} style={styles.horizontalCard}>
                {/* Left Profile Column */}
                <div style={styles.cardLeftCol}>
                  <div style={styles.avatarWrapper}>
                    {item.github ? (
                      <img
                        src={`https://github.com/${item.github}.png`}
                        alt={item.name}
                        style={styles.avatarImg}
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <div
                      style={{
                        ...styles.avatarFallback,
                        display: item.github ? "none" : "flex",
                      }}
                    >
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div style={styles.studentInfoGroup}>
                    <h2 style={styles.studentName}>{item.name}</h2>
                    <div style={styles.studentIdBadge}>
                      <GraduationCap size={13} style={{ marginRight: 4 }} />
                      <span>{item.studentId}</span>
                    </div>
                  </div>

                  {item.favoriteTopic && (
                    <div style={styles.topicBadge}>
                      <Terminal
                        size={13}
                        style={{
                          marginRight: 6,
                          color: "#38bdf8",
                          flexShrink: 0,
                        }}
                      />
                      <span>{item.favoriteTopic}</span>
                    </div>
                  )}

                  {/* GitHub Profile Link with GitHub Icon */}
                  {item.github && (
                    <a
                      href={`https://github.com/${item.github}`}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.githubBtn}
                    >
                      <GithubIcon size={15} style={{ marginRight: 6 }} />
                      <span>@{item.github}</span>
                      <ExternalLink
                        size={12}
                        style={{ marginLeft: "auto", opacity: 0.6 }}
                      />
                    </a>
                  )}

                  <div style={styles.gitBranchTag}>
                    <GitBranch
                      size={12}
                      color="#a371f7"
                      style={{ marginRight: 4, flexShrink: 0 }}
                    />
                    <span>add-reflection-{item.fileId}</span>
                  </div>
                </div>

                {/* Right Content Section */}
                <div style={styles.cardRightCol}>
                  {item.quote && (
                    <div style={styles.quoteBox}>
                      <span style={styles.quoteMark}>“</span>
                      <p style={styles.quoteText}>{item.quote}</p>
                    </div>
                  )}

                  <div
                    className="markdown-content"
                    style={styles.markdownWrapper}
                  >
                    <ReactMarkdown>{item.body}</ReactMarkdown>
                  </div>

                  <div style={styles.cardFooter}>
                    <div style={styles.verifiedTag}>
                      <Check
                        size={13}
                        color="#2da44e"
                        style={{ marginRight: 4 }}
                      />
                      <span>Verified Pull Request Contribution</span>
                    </div>
                    <span style={styles.filePathTag}>
                      src/reflections/{item.fileId}.md
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLeft}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#f8fafc",
                fontWeight: 600,
              }}
            >
              <GithubIcon size={18} />
              <span>Bioinformatics M.Sc. 2026 Open Source Project</span>
            </div>
            <p
              style={{
                margin: "6px 0 0 0",
                color: "#64748b",
                fontSize: "0.85rem",
              }}
            >
              Designed for first-time Git & GitHub student contributors.
            </p>
          </div>
          <div style={styles.footerRight}>
            <a
              href="https://github.com/nikunj926/bioinfo-msc-2026-reflections"
              target="_blank"
              rel="noreferrer"
              style={styles.footerLink}
            >
              <GitCommit size={14} style={{ marginRight: 4 }} />
              Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  appContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginBottom: "36px",
    animation: "fadeIn 0.6s ease-out",
  },
  headerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "999px",
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#cbd5e1",
    marginBottom: "16px",
    backdropFilter: "blur(8px)",
  },
  badgeDivider: {
    color: "#475569",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "#f8fafc",
    letterSpacing: "-0.03em",
    margin: "0 0 16px 0",
    lineHeight: "1.15",
  },
  titleGradient: {
    background: "linear-gradient(135deg, #a371f7 0%, #38bdf8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#94a3b8",
    maxWidth: "760px",
    margin: "0 auto 28px auto",
    lineHeight: "1.6",
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  statCard: {
    backgroundColor: "rgba(18, 24, 38, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "12px 24px",
    minWidth: "160px",
    backdropFilter: "blur(6px)",
  },
  statNumber: {
    fontSize: "1.4rem",
    fontWeight: "800",
    color: "#38bdf8",
    fontFamily: "var(--font-mono)",
  },
  statLabel: {
    fontSize: "0.78rem",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
    marginTop: "2px",
  },
  mainContent: {
    flexGrow: 1,
  },
  guideContainer: {
    backgroundColor: "rgba(18, 24, 38, 0.8)",
    border: "1px solid rgba(137, 87, 229, 0.25)",
    borderRadius: "16px",
    marginBottom: "32px",
    overflow: "hidden",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
  },
  guideHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    transition: "background-color 0.2s",
  },
  guideTitleGroup: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  guideIconBadge: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    backgroundColor: "rgba(137, 87, 229, 0.15)",
    border: "1px solid rgba(137, 87, 229, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  guideTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#f8fafc",
    margin: "0 0 2px 0",
  },
  guideSub: {
    fontSize: "0.85rem",
    color: "#94a3b8",
    margin: 0,
  },
  guideToggleBtn: {
    color: "#cbd5e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  guideBody: {
    padding: "24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "18px",
  },
  stepCard: {
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  stepNumberBadge: {
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#a371f7",
    backgroundColor: "rgba(137, 87, 229, 0.15)",
    padding: "2px 8px",
    borderRadius: "6px",
    fontFamily: "var(--font-mono)",
  },
  stepTitle: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#f1f5f9",
    margin: 0,
  },
  stepDesc: {
    fontSize: "0.83rem",
    color: "#94a3b8",
    margin: "0 0 10px 0",
    lineHeight: "1.45",
  },
  codeBlockWrapper: {
    position: "relative",
    marginTop: "auto",
  },
  codeBlock: {
    margin: 0,
    padding: "10px 36px 10px 12px",
    backgroundColor: "#070a12",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    color: "#38bdf8",
    fontFamily: "var(--font-mono)",
    fontSize: "0.78rem",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowX: "auto",
  },
  copyBtn: {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "rgba(30, 41, 59, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "6px",
    padding: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#cbd5e1",
    transition: "background 0.2s",
  },

  // Controls bar
  controlsBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  searchWrapper: {
    position: "relative",
    flexGrow: 1,
    maxWidth: "600px",
  },
  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 42px",
    backgroundColor: "rgba(18, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "12px",
    color: "#f8fafc",
    fontSize: "0.92rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  clearSearchBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  resultsCount: {
    fontSize: "0.88rem",
    color: "#94a3b8",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "rgba(18, 24, 38, 0.4)",
    borderRadius: "16px",
    border: "1px dashed rgba(255, 255, 255, 0.1)",
  },

  // Horizontal Card Layout
  horizontalRecordsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  horizontalCard: {
    display: "flex",
    backgroundColor: "rgba(18, 24, 38, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
    backdropFilter: "blur(12px)",
    flexWrap: "wrap",
  },
  cardLeftCol: {
    flex: "0 0 280px",
    padding: "24px",
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    borderRight: "1px solid rgba(255, 255, 255, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    boxSizing: "border-box",
  },
  avatarWrapper: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    backgroundColor: "#1e293b",
    border: "2px solid rgba(137, 87, 229, 0.4)",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 4px 12px rgba(137, 87, 229, 0.2)",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #8957e5 0%, #38bdf8 100%)",
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    fontWeight: "800",
  },
  studentInfoGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  studentName: {
    fontSize: "1.25rem",
    fontWeight: "800",
    color: "#f8fafc",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  studentIdBadge: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#38bdf8",
    fontFamily: "var(--font-mono)",
  },
  topicBadge: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "0.78rem",
    color: "#cbd5e1",
    fontWeight: "500",
    lineHeight: "1.3",
  },
  githubBtn: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgba(137, 87, 229, 0.12)",
    border: "1px solid rgba(137, 87, 229, 0.3)",
    color: "#c084fc",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: "600",
    textDecoration: "none",
    transition: "background-color 0.2s, color 0.2s",
  },
  gitBranchTag: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.75rem",
    color: "#94a3b8",
    fontFamily: "var(--font-mono)",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    marginTop: "auto",
  },

  // Right Column of Card
  cardRightCol: {
    flex: "1 1 400px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  quoteBox: {
    position: "relative",
    padding: "12px 16px 12px 20px",
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    borderLeft: "3px solid #a371f7",
    borderRadius: "0 8px 8px 0",
    display: "flex",
    alignItems: "flex-start",
    gap: "6px",
  },
  quoteMark: {
    fontSize: "1.8rem",
    lineHeight: "0.8",
    color: "#a371f7",
    fontFamily: "serif",
    userSelect: "none",
  },
  quoteText: {
    margin: 0,
    fontSize: "0.92rem",
    fontStyle: "italic",
    color: "#e2e8f0",
    lineHeight: "1.5",
  },
  markdownWrapper: {
    flexGrow: 1,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    paddingTop: "14px",
    marginTop: "auto",
    fontSize: "0.78rem",
    color: "#64748b",
    flexWrap: "wrap",
    gap: "8px",
  },
  verifiedTag: {
    display: "flex",
    alignItems: "center",
    color: "#4ade80",
    fontWeight: "600",
  },
  filePathTag: {
    fontFamily: "var(--font-mono)",
    color: "#64748b",
  },

  // Footer
  footer: {
    marginTop: "60px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    paddingTop: "24px",
    paddingBottom: "24px",
  },
  footerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  footerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  footerLink: {
    display: "inline-flex",
    alignItems: "center",
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: "500",
    transition: "color 0.2s",
  },
};
