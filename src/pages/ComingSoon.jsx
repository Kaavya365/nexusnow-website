import { useNavigate } from "react-router-dom";

/* ─── Inline styles injected into <head> so they always win ──────────────── */
const STYLES = `
  html, body, #root {
    background: #07060F !important;
  }

  .cs-page {
    background: #07060F;
    min-height: calc(100vh - 70px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 130px 48px 90px;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* Background layers */
  .cs-glow-top {
    position: absolute;
    width: 600px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%);
    top: -180px; left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .cs-glow-br {
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(45,27,105,0.14) 0%, transparent 70%);
    bottom: 40px; right: 5%;
    pointer-events: none;
  }
  .cs-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 75% 75% at 50% 40%, black, transparent);
    pointer-events: none;
  }

  /* Card content */
  .cs-card {
    position: relative; z-index: 2;
    text-align: center;
    max-width: 600px; width: 100%;
    display: flex; flex-direction: column; align-items: center;
  }

  /* Badge */
  .cs-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(109,40,217,0.15);
    border: 1px solid rgba(139,92,246,0.3);
    border-radius: 999px;
    padding: 6px 18px;
    margin-bottom: 36px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: #A78BFA;
  }
  .cs-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #8B5CF6;
    box-shadow: 0 0 8px #8B5CF6;
    animation: cs-pulse 2s ease-in-out infinite;
  }
  @keyframes cs-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(1.6); }
  }

  /* Icon box */
  .cs-icon-box {
    width: 88px; height: 88px;
    border-radius: 22px;
    background: rgba(109,40,217,0.12);
    border: 1px solid rgba(139,92,246,0.25);
    box-shadow: 0 0 40px rgba(109,40,217,0.2), inset 0 1px 0 rgba(167,139,250,0.1);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 32px;
    transition: box-shadow 0.3s;
  }
  .cs-icon-box:hover {
    box-shadow: 0 0 60px rgba(109,40,217,0.35), inset 0 1px 0 rgba(167,139,250,0.15);
  }

  /* Title */
  .cs-heading {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -2.5px;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #C4B5FD 0%, #A78BFA 40%, #8B5CF6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Description */
  .cs-body {
    font-size: 16px;
    line-height: 1.75;
    color: #6B7280;
    max-width: 460px;
    margin-bottom: 48px;
  }

  /* Buttons */
  .cs-actions {
    display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
    margin-bottom: 56px;
  }
  .cs-btn-solid {
    background: linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%);
    color: #fff;
    border: none;
    padding: 13px 30px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .cs-btn-solid:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(109,40,217,0.5);
  }
  .cs-btn-outline {
    background: transparent;
    color: #A78BFA;
    border: 1px solid rgba(139,92,246,0.3);
    padding: 13px 30px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .cs-btn-outline:hover {
    background: rgba(109,40,217,0.12);
    border-color: #8B5CF6;
    color: #E9D5FF;
  }

  /* Pills */
  .cs-pills-heading {
    font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: #374151;
    margin-bottom: 14px;
  }
  .cs-pills-row {
    display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
  }
  .cs-pill {
    padding: 7px 16px;
    border-radius: 999px;
    border: 1px solid rgba(139,92,246,0.14);
    background: rgba(109,40,217,0.06);
    color: #6B7280;
    font-size: 12px; font-weight: 500;
    transition: all 0.2s;
    cursor: default;
  }
  .cs-pill:hover {
    background: rgba(109,40,217,0.15);
    border-color: rgba(139,92,246,0.35);
    color: #C4B5FD;
  }

  @media (max-width: 600px) {
    .cs-page { padding: 110px 24px 72px; }
    .cs-heading { font-size: 40px; letter-spacing: -1.5px; }
    .cs-body { font-size: 14px; }
    .cs-actions { flex-direction: column; align-items: center; }
    .cs-btn-solid, .cs-btn-outline { width: 100%; max-width: 280px; justify-content: center; }
  }
  @media (max-width: 380px) {
    .cs-page { padding: 90px 18px 56px; }
    .cs-heading { font-size: 32px; }
    .cs-icon-box { width: 68px; height: 68px; border-radius: 16px; }
    .cs-badge { font-size: 9px; padding: 5px 13px; }
    .cs-pills-row { gap: 6px; }
    .cs-pill { font-size: 11px; padding: 5px 11px; }
  }
`;

/* ─── Purple SVG Icon system ─────────────────────────────────────────────── */
/* All icons use the same purple palette — #8B5CF6 stroke, #6D28D9 accents */
const P = {
  fill: "none",
  stroke: "#8B5CF6",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Ico = (props) => (
  <svg width="40" height="40" viewBox="0 0 24 24" {...P} {...props} />
);

const ICONS = {
  /* Company pages */
  AboutUs: () => (
    <Ico>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M9 3v18M3 9h6M3 15h6" />
      <path d="M15 9h3M15 12h3M15 15h3" />
    </Ico>
  ),
  WhyUs: () => (
    <Ico>
      <path d="M12 2l2.9 6.1 6.6.95-4.8 4.6 1.15 6.55L12 17.1l-5.85 3.1 1.15-6.55L2.5 9.05l6.6-.95Z" />
      <circle cx="12" cy="12" r="2.5" fill="rgba(109,40,217,0.3)" stroke="#A78BFA" strokeWidth="1" />
    </Ico>
  ),
  Services: () => (
    <Ico>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </Ico>
  ),
  Leaders: () => (
    <Ico>
      <circle cx="9" cy="7" r="3.5" />
      <path d="M3 21v-1.5A4.5 4.5 0 0 1 7.5 15h3A4.5 4.5 0 0 1 15 19.5V21" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M19 21v-1a3 3 0 0 0-2-2.83" />
    </Ico>
  ),
  Learning: () => (
    <Ico>
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3.5 3.5 0 0 0-3.5-3.5H2Z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v13a3.5 3.5 0 0 1 3.5-3.5H22Z" />
    </Ico>
  ),
  Careers: () => (
    <Ico>
      <rect x="2" y="7" width="20" height="14" rx="2.5" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <circle cx="12" cy="14" r="2" fill="rgba(109,40,217,0.25)" />
      <path d="M2 13h8M14 13h8" />
    </Ico>
  ),
  Contact: () => (
    <Ico>
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="M22 7 13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="M7 17h3M7 13.5h2" stroke="#A78BFA" strokeWidth="1.2" />
    </Ico>
  ),

  /* New services */
  AgenticAI: () => (
    <Ico>
      <rect x="3" y="8" width="18" height="11" rx="2.5" />
      <path d="M12 8V5.5" />
      <circle cx="12" cy="4.5" r="1.5" fill="#8B5CF6" stroke="none" />
      <circle cx="8.5" cy="13" r="1.8" fill="rgba(109,40,217,0.35)" />
      <circle cx="15.5" cy="13" r="1.8" fill="rgba(109,40,217,0.35)" />
      <path d="M8.5 16.5h7" strokeWidth="1.8" />
      <path d="M5 8.5 3 6M19 8.5l2-2.5" stroke="#A78BFA" strokeWidth="1.2" />
    </Ico>
  ),
  ServiceNow: () => (
    <Ico>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="rgba(109,40,217,0.15)" />
    </Ico>
  ),
  SAP: () => (
    <Ico>
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z" fill="rgba(109,40,217,0.12)" />
      <path d="M9 12h6M12 9v6" stroke="#A78BFA" />
    </Ico>
  ),
  CyberSec: () => (
    <Ico>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(109,40,217,0.1)" />
      <path d="m9 12 2 2 4-4" stroke="#A78BFA" strokeWidth="2" />
    </Ico>
  ),
  CIOaaS: () => (
    <Ico>
      <rect x="2" y="7" width="20" height="14" rx="2.5" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 12.5h20" />
      <path d="M8 16.5h3M13 16.5h3" stroke="#A78BFA" />
    </Ico>
  ),

  /* Existing services */
  Advisory: () => (
    <Ico>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </Ico>
  ),
  AIInsights: () => (
    <Ico>
      <path d="M3 20h18" />
      <path d="M6 20V10" />
      <path d="M10 20V4" />
      <path d="M14 20V13" />
      <path d="M18 20V7" />
      <circle cx="10" cy="4" r="1.5" fill="#8B5CF6" stroke="none" />
      <circle cx="18" cy="7" r="1.5" fill="#8B5CF6" stroke="none" />
    </Ico>
  ),
  ValueAcc: () => (
    <Ico>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="rgba(109,40,217,0.15)" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill="rgba(109,40,217,0.1)" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </Ico>
  ),
  Workflow: () => (
    <Ico>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </Ico>
  ),
  Migration: () => (
    <Ico>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" fill="rgba(109,40,217,0.08)" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </Ico>
  ),
  Managed: () => (
    <Ico>
      <circle cx="12" cy="12" r="3" fill="rgba(109,40,217,0.2)" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </Ico>
  ),

  /* Industries */
  Industries: () => (
    <Ico>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Ico>
  ),
  Banking: () => (
    <Ico>
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="M5 6l7-3 7 3" />
      <path d="M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
    </Ico>
  ),
  Insurance: () => (
    <Ico>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(109,40,217,0.08)" />
      <path d="M12 8v5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="1" fill="#A78BFA" stroke="none" />
    </Ico>
  ),
  Telecom: () => (
    <Ico>
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2.5" fill="rgba(109,40,217,0.2)" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </Ico>
  ),
  Manufacturing: () => (
    <Ico>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" fill="rgba(109,40,217,0.08)" />
      <path d="M17 18h1M12 18h1M7 18h1" stroke="#A78BFA" strokeWidth="1.8" />
    </Ico>
  ),
  Retail: () => (
    <Ico>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill="rgba(109,40,217,0.08)" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </Ico>
  ),

  /* 404 */
  NotFound: () => (
    <Ico>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M8.5 11h5M11 8.5v5" stroke="#A78BFA" strokeWidth="1.8" />
    </Ico>
  ),
};

/* ─── Per-page configuration ─────────────────────────────────────────────── */
const PAGE_CONFIG = {
  "About Us":                   { Icon: ICONS.AboutUs,      badgeText: "Coming Soon",  pills: ["Our Story", "Mission & Values", "Global Offices", "Leadership Team", "Partner Ecosystem"] },
  "Why Choose Us":              { Icon: ICONS.WhyUs,        badgeText: "Coming Soon",  pills: ["12+ Years Experience", "150+ Certified Experts", "50+ Enterprise Clients", "Premier Partner Status", "Proven ROI Framework"] },
  "Our Services":               { Icon: ICONS.Services,     badgeText: "Coming Soon",  pills: ["Agentic AI", "ServiceNow", "SAP", "Cyber Security", "CIO as a Service"] },
  "Agentic AI":                 { Icon: ICONS.AgenticAI,    badgeText: "New Service",  pills: ["Multi-Agent Orchestration", "Autonomous Workflows", "Human-in-the-Loop", "LLM Integration", "Enterprise Safety"] },
  "ServiceNow":                 { Icon: ICONS.ServiceNow,   badgeText: "New Service",  pills: ["ITSM", "HRSD", "CSM", "App Engine", "ServiceNow AI"] },
  "SAP":                        { Icon: ICONS.SAP,          badgeText: "New Service",  pills: ["S/4HANA Migration", "SAP BTP", "AI Co-pilots", "ServiceNow Integration", "Managed SAP"] },
  "Cyber Security":             { Icon: ICONS.CyberSec,     badgeText: "New Service",  pills: ["Threat Intelligence", "Zero Trust", "SIEM / SOAR", "GDPR Compliance", "Security Operations"] },
  "CIO as a Service":           { Icon: ICONS.CIOaaS,       badgeText: "New Service",  pills: ["IT Strategy Roadmaps", "Vendor Management", "Digital Transformation", "Board Reporting", "Budget Optimisation"] },
  "Advisory Services":          { Icon: ICONS.Advisory,     badgeText: "Coming Soon",  pills: ["Digital Strategy", "AI Roadmapping", "Technology Assessment", "Change Management", "ROI Planning"] },
  "AI-Powered Insights":        { Icon: ICONS.AIInsights,   badgeText: "Coming Soon",  pills: ["Predictive Analytics", "Machine Learning", "Generative AI", "Data Engineering", "AI Operations"] },
  "Value Accelerators":         { Icon: ICONS.ValueAcc,     badgeText: "Coming Soon",  pills: ["Quick-Start Programme", "ServiceNow Intelligence", "Risk Reduction", "Rapid Outcomes", "Pro & Enterprise Package"] },
  "Workflow Automation":        { Icon: ICONS.Workflow,     badgeText: "Coming Soon",  pills: ["Process Automation", "ServiceNow Workflows", "Inbox Elimination", "Employee Experience", "Error Reduction"] },
  "Migration & Implementation": { Icon: ICONS.Migration,    badgeText: "Coming Soon",  pills: ["New Implementation", "Re-implementation", "Custom Applications", "Data Migration", "Go-Live Support"] },
  "Managed Services":           { Icon: ICONS.Managed,      badgeText: "Coming Soon",  pills: ["Platform Management", "Continuous Development", "24/7 Support", "Proactive Monitoring", "Enhancement Roadmap"] },
  "Industries":                 { Icon: ICONS.Industries,   badgeText: "Coming Soon",  pills: ["Banking", "Insurance", "Telecom & Media", "Manufacturing", "Retail & Supply Chain"] },
  "Banking":                    { Icon: ICONS.Banking,      badgeText: "Coming Soon",  pills: ["AI Fraud Detection", "Risk Management", "Regulatory Compliance", "Customer AI", "Core Banking AI"] },
  "Insurance":                  { Icon: ICONS.Insurance,    badgeText: "Coming Soon",  pills: ["Claims Automation", "Intelligent Underwriting", "Policy Operations", "Loss Prevention AI", "Customer Self-Service"] },
  "Telecom & Media":            { Icon: ICONS.Telecom,      badgeText: "Coming Soon",  pills: ["Network AI Ops", "CX Transformation", "Billing Automation", "Content Operations", "Churn Prediction"] },
  "Manufacturing":              { Icon: ICONS.Manufacturing, badgeText: "Coming Soon", pills: ["Predictive Maintenance", "Smart Factory", "Supply Chain AI", "Quality Automation", "ERP Integration"] },
  "Retail & Supply Chain":      { Icon: ICONS.Retail,       badgeText: "Coming Soon",  pills: ["Demand Forecasting", "Intelligent Fulfilment", "Inventory AI", "Customer Personalisation", "Supplier Automation"] },
  "Our Leaders":                { Icon: ICONS.Leaders,      badgeText: "Coming Soon",  pills: ["Executive Team", "Advisory Board", "Regional Leaders", "Technical Experts", "Client Partners"] },
  "Learning":                   { Icon: ICONS.Learning,     badgeText: "Coming Soon",  pills: ["Whitepapers", "Case Studies", "Webinars", "Blog & Insights", "AI Glossary"] },
  "Careers":                    { Icon: ICONS.Careers,      badgeText: "We're Hiring", pills: ["Singapore", "Mumbai", "Bengaluru", "Amsterdam", "Remote Roles"] },
  "Contact Us":                 { Icon: ICONS.Contact,      badgeText: "Get in Touch", pills: ["Singapore HQ", "Mumbai Office", "Bengaluru Centre", "Amsterdam Office", "info@nexusnow.ai"] },
  "Page Not Found":             { Icon: ICONS.NotFound,     badgeText: "404 Error",    pills: ["Go to Home", "Our Services", "About Us", "Contact Us"] },
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ComingSoon({ page, desc, tag }) {
  const navigate = useNavigate();

  const config = PAGE_CONFIG[page] ?? {
    Icon: ICONS.Services,
    badgeText: "Coming Soon",
    pills: [],
  };

  const { Icon: PageIcon, pills } = config;
  const badgeLabel = tag ?? config.badgeText;

  return (
    <>
      {/* Inject styles into <head> — guarantees dark bg regardless of cascade */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <main className="cs-page">
        {/* Background decoration */}
        <div className="cs-glow-top" />
        <div className="cs-glow-br" />
        <div className="cs-grid" />

        <div className="cs-card">
          {/* Badge */}
          <div className="cs-badge">
            <div className="cs-badge-dot" />
            {badgeLabel}
          </div>

          {/* Icon */}
          <div className="cs-icon-box">
            <PageIcon />
          </div>

          {/* Heading */}
          <h1 className="cs-heading">{page}</h1>

          {/* Description */}
          <p className="cs-body">{desc}</p>

          {/* Buttons */}
          <div className="cs-actions">
            <button className="cs-btn-solid" onClick={() => navigate("/")}>
              ← Back to Home
            </button>
            <button className="cs-btn-outline" onClick={() => navigate("/contact")}>
              Get in Touch
            </button>
          </div>

          {/* Pills */}
          {pills.length > 0 && (
            <>
              <p className="cs-pills-heading">What's coming</p>
              <div className="cs-pills-row">
                {pills.map((p) => (
                  <span key={p} className="cs-pill">{p}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}