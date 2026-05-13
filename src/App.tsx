import { useEffect, useState, useRef } from 'react';
import { Terminal, Rocket, User, FolderGit2, Radio, BookOpen, ExternalLink, Code, Briefcase, Mail, ChevronRight } from 'lucide-react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['> SYSTEM INITIALIZED. TYPE "HELP" FOR COMMANDS.']);
  const [inputValue, setInputValue] = useState('');
  const [isBlackhole, setIsBlackhole] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim().toLowerCase();
      let response = '';

      switch (cmd) {
        case 'help':
          response = 'AVAILABLE COMMANDS: HELP, WHOAMI, STATUS, CLEAR, SUDO';
          break;
        case 'whoami':
          response = 'GUEST USER @ COMMAND CENTER';
          break;
        case 'status':
          response = 'ALL SYSTEMS NOMINAL. REACTOR AT 94%.';
          break;
        case 'clear':
          setTerminalHistory([]);
          setInputValue('');
          return;
        case 'blackhole':
          response = 'WARNING: GRAVITATIONAL ANOMALY DETECTED. EVENT HORIZON IMMINENT.';
          setIsBlackhole(true);
          break;
        case 'sudo':
          response = 'ACCESS DENIED. THIS INCIDENT WILL BE REPORTED.';
          break;
        case '':
          response = '';
          break;
        default:
          response = `COMMAND NOT FOUND: ${cmd}`;
      }

      if (cmd) {
        setTerminalHistory(prev => [...prev, `> ${inputValue}`, response]);
      } else {
        setTerminalHistory(prev => [...prev, `>`]);
      }

      setInputValue('');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`dashboard-container ${isBlackhole ? 'blackhole-active' : ''}`}>
      {/* Header / Current Mission */}
      <header className="header-section">
        <div className="hud-title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
          <Terminal size={28} color="var(--neon-cyan)" />
          <span>CF // COMMAND CENTER</span>
        </div>

        <div className="glass-panel" style={{ padding: '12px 24px', display: 'flex', gap: '32px' }}>
          <div className="mission-status">
            <div className="status-dot pulse"></div>
            <div>
              <div className="mono-text" style={{ fontSize: '0.7rem' }}>CURRENT MISSION</div>
              <div style={{ fontFamily: 'var(--font-hud)', color: 'var(--text-main)' }}>3 body problem webapp</div>
            </div>
          </div>
          <div className="mission-status">
            <div>
              <div className="mono-text" style={{ fontSize: '0.7rem' }}>LOCAL TIME</div>
              <div className="mono-text" style={{ color: 'var(--text-main)' }}>{time}</div>
            </div>
          </div>
        </div>
      </header>

      {/* About Me Panel */}
      <section className="glass-panel panel-about">
        <div className="scanline"></div>
        <h2 className="hud-title">
          <User size={20} />
          PERSONNEL DOSSIER
        </h2>
        <div className="panel-content">
          <div className="profile-header">
            <div className="profile-avatar"></div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-hud)', fontSize: '1.2rem', marginBottom: '4px' }}>CRISTIAN FORTUNA</h3>
              <p className="mono-text" style={{ color: 'var(--neon-cyan)' }}>Software Engineer & Computational Researcher</p>
            </div>
          </div>

          <p className="bio-text mono-text">
            Engineer with experience across enterprise systems, cloud infrastructure, APIs, and scalable backend development. Passionate about combining software engineering with scientific research, especially in computational physics, AI, and space technologies.

            I enjoy solving complex technical problems, designing clean architectures, and building products that balance performance, usability, and innovation. My long-term mission is to contribute to technologies that expand both human capability and scientific understanding.
          </p>

          <h4 className="hud-title" style={{ fontSize: '0.9rem', marginTop: '32px' }}>CORE SYSTEMS (TECH STACK)</h4>
          <div className="skills-list">
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Go</span>
            <span className="skill-tag">FastAPI</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">React / Next.js</span>
            <span className="skill-tag">PostgreSQL</span>
            <span className="skill-tag">AWS</span>
          </div>
        </div>
      </section>

      {/* Projects Panel */}
      <section className="glass-panel panel-projects">
        <div className="scanline"></div>
        <h2 className="hud-title" style={{ color: 'var(--neon-blue)' }}>
          <FolderGit2 size={20} />
          MISSION LOGS (PROJECTS)
        </h2>
        <div className="panel-content">

          <div className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 className="project-title">VRP - Optimization with Pyomo and CBC</h3>
              <a href="https://github.com/CristianFortunaR/vrp-pyomo" target="_blank" rel="noreferrer" style={{ color: 'var(--neon-blue)' }}><ExternalLink size={16} /></a>
            </div>
            <p className="mono-text" style={{ marginBottom: '12px' }}>
              Vehicle Routing Problem (VRP) is a combinatorial optimization problem that seeks to find the optimal set of routes for a fleet of vehicles to serve a set of customers, minimizing total travel distance or cost while satisfying various constraints.
            </p>
            <div className="skills-list">
              <span className="skill-tag" style={{ color: 'var(--neon-blue)', borderColor: 'var(--neon-blue)' }}>Python</span>
            </div>
          </div>

          <div className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 className="project-title">Consultant Dashboard Hub</h3>
              <a href="#" style={{ color: 'var(--neon-blue)' }}><ExternalLink size={16} /></a>
            </div>
            <p className="mono-text" style={{ marginBottom: '12px' }}>
              Local management dashboard for SAP consultants, featuring dual-mode time tracking and Gantt charts.
            </p>
            <div className="skills-list">
              <span className="skill-tag" style={{ color: 'var(--neon-blue)', borderColor: 'var(--neon-blue)' }}>Next.js</span>
              <span className="skill-tag" style={{ color: 'var(--neon-blue)', borderColor: 'var(--neon-blue)' }}>SQLite</span>
            </div>
          </div>

          <div className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 className="project-title">Edge AI - Threat Identificator</h3>
              <a href="https://github.com/CristianFortunaR/threatIdentificator" target="_blank" rel="noreferrer" style={{ color: 'var(--neon-blue)' }}><ExternalLink size={16} /></a>
            </div>
            <p className="mono-text" style={{ marginBottom: '12px' }}>
              Threat identification using computer vision for real-time threat detection and alerts.
            </p>
            <div className="skills-list">
              <span className="skill-tag" style={{ color: 'var(--neon-blue)', borderColor: 'var(--neon-blue)' }}>Python</span>
              <span className="skill-tag" style={{ color: 'var(--neon-blue)', borderColor: 'var(--neon-blue)' }}>APIs</span>
            </div>
          </div>

        </div>
      </section>

      {/* Blog Panel */}
      <section className="glass-panel panel-blog">
        <h2 className="hud-title" style={{ color: 'var(--neon-orange)' }}>
          <BookOpen size={20} />
          TRANSMISSIONS (BLOG)
        </h2>
        <div className="panel-content">
          <div className="blog-item">
            <div>
              <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--neon-orange)' }}>2025.09.25</div>
              <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.9rem' }}>How Quantum Communication Can Revolutionize Global Connectivity</div>
            </div>
            <a href="https://github.com/CristianFortunaR/Articles/blob/main/Quantum%20Communication.md" target="_blank" rel="noreferrer" style={{ color: 'var(--neon-orange)' }}><ExternalLink size={14} color="var(--neon-orange)" /></a>
          </div>
          <div className="blog-item">
            <div>
              <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--neon-orange)' }}>2025.10.31</div>
              <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.9rem' }}>Post-Quantum Cryptography</div>
            </div>
            <a href="https://github.com/CristianFortunaR/Articles/blob/main/PQC.md#post-quantum-cryptography-pqc" target="_blank" rel="noreferrer" style={{ color: 'var(--neon-orange)' }}><ExternalLink size={14} color="var(--neon-orange)" /></a>
          </div>
        </div>
      </section>

      {/* Contact Panel & Terminal */}
      <section className="glass-panel panel-contact">
        <h2 className="hud-title" style={{ color: 'var(--neon-purple)' }}>
          <Radio size={20} />
          COMMS ARRAY
        </h2>
        <div className="panel-content" style={{ display: 'flex', flexDirection: 'column' }}>
          <p className="mono-text" style={{ marginBottom: '16px' }}>
            Open frequencies for collaboration, telemetry requests, or general inquiries.
          </p>
          <div className="contact-list" style={{ marginBottom: 'auto' }}>
            <a href="mailto:contact@example.com" className="contact-link">
              <Mail size={18} color="var(--neon-purple)" />
              cristianfortunareis@gmail.com
            </a>
            <a href="https://github.com/CristianFortunaR" target="_blank" rel="noreferrer" className="contact-link">
              <Code size={18} color="var(--neon-purple)" />
              github.com/CristianFortunaR
            </a>
            <a href="https://www.linkedin.com/in/cristianfortunareis/" target="_blank" rel="noreferrer" className="contact-link">
              <Briefcase size={18} color="var(--neon-purple)" />
              linkedin.com/in/cristianfortunareis
            </a>
          </div>
        </div>
      </section>

      {/* Standalone Terminal Panel */}
      <section className="glass-panel panel-terminal">
        <h2 className="hud-title" style={{ color: 'var(--text-main)', fontSize: '1rem', marginBottom: '8px' }}>
          <Terminal size={18} />
          UPLINK TERMINAL
        </h2>
        <div>
          <div className="terminal-output" ref={outputRef}>
            {terminalHistory.map((line, i) => (
              <div key={i} className="mono-text" style={{ color: line.startsWith('>') ? 'var(--text-muted)' : 'var(--text-main)', fontSize: '0.8rem' }}>
                {line}
              </div>
            ))}
          </div>
          <div className="terminal-input-row">
            <ChevronRight size={16} color="var(--text-main)" />
            <input
              type="text"
              className="terminal-input"
              placeholder="Enter command..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleCommand}
            />
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
