import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const logoSrc = "/logo.png";

const S = `
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 300;
    height: 70px; display: flex; align-items: center; padding: 0 48px;
    transition: background 0.35s, border-color 0.35s, backdrop-filter 0.35s;
    border-bottom: 1px solid transparent;
  }
  .navbar.solid {
    background: rgba(7,6,15,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-color: rgba(139,92,246,0.1);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; max-width: 1280px; margin: 0 auto;
  }

  /* ── Logo ── */
  .nav-logo {
    display: flex; align-items: center;
    cursor: pointer; flex-shrink: 0; text-decoration: none;
    background: none !important; border: none !important;
    outline: none; box-shadow: none !important; padding: 0;
    transition: transform 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-logo:hover  { transform: translateY(-3px); background: none !important; }
  .nav-logo:focus  { outline: none; background: none !important; }
  .nav-logo:active { background: none !important; }
  .nav-logo-img    { height: 60px; width: auto; object-fit: contain; display: block; }

  /* ── Links ── */
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500; color: #6B7280;
    background: none; border: none; cursor: pointer;
    transition: color 0.15s; padding: 0; letter-spacing: 0.1px;
  }
  .nav-link:hover  { color: #C4B5FD; }
  .nav-link.active { color: #A78BFA; }

  /* ── Services dropdown ── */
  .nav-svc-wrap { position: relative; }
  .nav-dropdown {
    position: absolute; top: calc(100% + 16px); left: 50%;
    transform: translateX(-50%);
    background: rgba(9,7,20,0.97);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(139,92,246,0.14);
    border-radius: 14px; padding: 6px;
    min-width: 268px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.65), 0 0 0 1px rgba(109,40,217,0.07);
    animation: ddIn 0.17s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes ddIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  .nav-dd-row {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    color: #9CA3AF; transition: background 0.14s, color 0.14s;
  }
  .nav-dd-row:hover { background: rgba(109,40,217,0.14); color: #C4B5FD; }
  .nav-dd-icon {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    background: rgba(109,40,217,0.12); border: 1px solid rgba(139,92,246,0.16);
    display: flex; align-items: center; justify-content: center;
  }
  .nav-dd-badge {
    margin-left: auto;
    font-size: 9px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase;
    color: #A78BFA; background: rgba(109,40,217,0.18);
    border: 1px solid rgba(139,92,246,0.28); padding: 2px 7px; border-radius: 999px;
  }
  .nav-dd-divider { height: 1px; background: rgba(139,92,246,0.08); margin: 4px 6px; }

  /* ── CTA button ── */
  .nav-cta {
    background: linear-gradient(135deg, #6D28D9, #8B5CF6);
    color: #fff; border: none; padding: 9px 22px; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; white-space: nowrap; letter-spacing: 0.1px;
  }
  .nav-cta:hover { transform: scale(1.03); box-shadow: 0 0 22px rgba(109,40,217,0.5); }

  /* ── Mobile ── */
  .nav-mob-btn {
    display: none; background: none; border: none;
    cursor: pointer; color: #A78BFA; padding: 4px;
  }
  .nav-mob-menu {
    position: fixed; inset: 0; top: 70px; z-index: 250;
    background: rgba(7,6,15,0.98); backdrop-filter: blur(20px);
    padding: 32px 28px; display: flex; flex-direction: column; gap: 2px;
    animation: mobIn 0.2s ease;
  }
  @keyframes mobIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .nav-mob-item {
    font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700;
    color: #E5E7EB; padding: 15px 0; border-bottom: 1px solid rgba(139,92,246,0.07);
    cursor: pointer; transition: color 0.15s;
  }
  .nav-mob-item:hover { color: #A78BFA; }

  @media (max-width: 900px) {
    .navbar { padding: 0 24px; }
    .nav-links { display: none; }
    .nav-cta   { display: none; }
    .nav-mob-btn { display: flex; }
  }
`;

/* ── Dropdown icon SVGs (all purple) ── */
const di = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "#8B5CF6", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
const DI = {
  Bot:       () => <svg {...di}><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V5.5"/><circle cx="12" cy="4.5" r="1.5" fill="#8B5CF6" stroke="none"/><circle cx="8.5" cy="13" r="1.5" fill="#8B5CF6" stroke="none"/><circle cx="15.5" cy="13" r="1.5" fill="#8B5CF6" stroke="none"/></svg>,
  Zap:       () => <svg {...di}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Diamond:   () => <svg {...di}><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"/></svg>,
  Shield:    () => <svg {...di}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4" stroke="#A78BFA"/></svg>,
  Briefcase: () => <svg {...di}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/></svg>,
  Lightbulb: () => <svg {...di}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/></svg>,
  BarChart:  () => <svg {...di}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Rocket:    () => <svg {...di}><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
  Refresh:   () => <svg {...di}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>,
  Package:   () => <svg {...di}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M12 22V12"/></svg>,
  Wrench:    () => <svg {...di}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
};

const SVC_ITEMS = [
  { Ico: DI.Bot,       label: "Agentic AI",              path: "/services/agentic-ai",             badge: "New" },
  { Ico: DI.Zap,       label: "ServiceNow",              path: "/services/servicenow",             badge: "New" },
  { Ico: DI.Diamond,   label: "SAP",                     path: "/services/sap",                    badge: "New" },
  { Ico: DI.Shield,    label: "Cyber Security",          path: "/services/cyber-security",         badge: "New" },
  { Ico: DI.Briefcase, label: "CIO as a Service",        path: "/services/cio-as-a-service",       badge: "New" },
  null,
  { Ico: DI.Lightbulb, label: "Advisory Services",       path: "/services/advisory" },
  { Ico: DI.BarChart,  label: "AI-Powered Insights",     path: "/services/ai-insights" },
  { Ico: DI.Rocket,    label: "Value Accelerators",      path: "/services/value-accelerators" },
  { Ico: DI.Refresh,   label: "Workflow Automation",     path: "/services/workflow-automation" },
  { Ico: DI.Package,   label: "Migration & Impl.",       path: "/services/migration-implementation" },
  { Ico: DI.Wrench,    label: "Managed Services",        path: "/services/managed-services" },
];

const NAV_ITEMS = [
  { label: "About",      path: "/about" },
  { label: "Services",   path: "/services", hasDrop: true },
  { label: "Industries", path: "/industries" },
  { label: "Leaders",    path: "/leaders" },
  { label: "Learning",   path: "/learning" },
];

export default function Navbar() {
  const [solid,   setSolid]   = useState(false);
  const [drop,    setDrop]    = useState(false);
  const [mob,     setMob]     = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === "/";

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMob(false); setDrop(false); }, [location]);

  const go = (p) => navigate(p);
  const navClass = `navbar${(!isHome || solid) ? " solid" : ""}`;

  return (
    <>
      <style>{S}</style>

      <nav className={navClass}>
        <div className="nav-inner">

          {/* Logo */}
          <button className="nav-logo" onClick={() => go("/")}>
            <img src={logoSrc} alt="NexusNow.ai logo" className="nav-logo-img" />
          </button>

          {/* Desktop nav */}
          <div className="nav-links">
            {NAV_ITEMS.map(item =>
              item.hasDrop ? (
                <div
                  key="services"
                  className="nav-svc-wrap"
                  onMouseEnter={() => setDrop(true)}
                  onMouseLeave={() => setDrop(false)}
                >
                  <button
                    className={`nav-link${location.pathname.startsWith("/services") ? " active" : ""}`}
                    onClick={() => go("/services")}
                  >
                    Services ▾
                  </button>

                  {drop && (
                    <div className="nav-dropdown">
                      {SVC_ITEMS.map((s, i) =>
                        s === null
                          ? <div key={i} className="nav-dd-divider" />
                          : (
                            <div key={s.path} className="nav-dd-row" onClick={() => go(s.path)}>
                              <div className="nav-dd-icon"><s.Ico /></div>
                              <span>{s.label}</span>
                              {s.badge && <span className="nav-dd-badge">{s.badge}</span>}
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.path}
                  className={`nav-link${location.pathname === item.path ? " active" : ""}`}
                  onClick={() => go(item.path)}
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          <button className="nav-cta" onClick={() => go("/contact")}>Get in Touch</button>

          {/* Mobile toggle */}
          <button className="nav-mob-btn" onClick={() => setMob(o => !o)} aria-label="Menu">
            {mob
              ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              : <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mob && (
        <div className="nav-mob-menu">
          {[["Home","/"],["About","/about"],["Services","/services"],["Industries","/industries"],["Leaders","/leaders"],["Learning","/learning"],["Careers","/careers"],["Contact","/contact"]]
            .map(([label, path]) => (
              <div key={path} className="nav-mob-item" onClick={() => go(path)}>{label}</div>
            ))}
        </div>
      )}
    </>
  );
}