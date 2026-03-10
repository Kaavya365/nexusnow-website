import { useNavigate } from "react-router-dom";
const logoSrc = "/logo.png";

const footerStyles = `
  .footer {
    background: var(--bg);
    border-top: 1px solid rgba(167,139,250,0.07);
    padding: 64px 48px 32px;
  }
  .footer-inner { max-width: 1280px; margin: 0 auto; }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px; margin-bottom: 48px;
  }
  .footer-logo {
    font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 20px;
    color: #fff; display: flex; align-items: center; gap: 9px; margin-bottom: 14px;
    cursor: pointer;
  }
  .footer-logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: linear-gradient(135deg, #6D28D9, #A78BFA);
    box-shadow: 0 0 10px #A78BFA;
  }
  .footer-tagline {
    font-size: 14px; color: #6B7280; line-height: 1.7;
    margin-bottom: 24px; max-width: 280px;
  }
  .footer-socials { display: flex; gap: 10px; }
  .footer-social-btn {
    width: 34px; height: 34px; border-radius: 8px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(167,139,250,0.1);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; font-size: 13px; font-weight: 700;
    color: #6B7280;
  }
  .footer-social-btn:hover { background: rgba(109,40,217,0.2); border-color: rgba(139,92,246,0.4); color: #A78BFA; }
  .footer-col-head {
    font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700;
    color: #fff; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 18px;
  }
  .footer-link-list { display: flex; flex-direction: column; gap: 10px; }
  .footer-link {
    font-size: 13px; color: #6B7280; cursor: pointer; transition: color 0.15s;
    background: none; border: none; text-align: left; padding: 0;
  }
  .footer-link:hover { color: #C4B5FD; }
  .footer-link.accent { color: #A78BFA; }
  .footer-bottom {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
    padding-top: 28px; border-top: 1px solid rgba(167,139,250,0.06);
  }
  .footer-copy { font-size: 12px; color: #6B7280; }
  .footer-legal { display: flex; gap: 20px; }
  .footer-lang-pill {
    display: flex; align-items: center; gap: 8px; font-size: 12px; color: #6B7280;
    cursor: pointer; padding: 5px 12px; border-radius: 999px;
    border: 1px solid rgba(167,139,250,0.15); transition: all 0.2s;
  }
  .footer-lang-pill:hover { border-color: rgba(139,92,246,0.4); color: #C4B5FD; }
  .footer-lang-active { color: #A78BFA; }
  .footer-lang-sep { color: rgba(167,139,250,0.25); }
  @media (max-width: 1024px) { .footer-top { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 600px) {
    .footer { padding: 48px 24px 24px; }
    .footer-top { grid-template-columns: 1fr; }
    .footer-bottom { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 480px) {
    .footer { padding: 40px 20px 20px; }
    .footer-logo { font-size: 17px; }
    .footer-tagline { font-size: 13px; }
    .footer-col-head { font-size: 11px; }
    .footer-link { font-size: 12px; }
    .footer-copy { font-size: 11px; }
  }
`;

export default function Footer() {
  const navigate = useNavigate();
  const go = (path) => { navigate(path); window.scrollTo(0,0); };

  return (
    <>
      <style>{footerStyles}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo" onClick={() => go("/")}>
                <div className="footer-logo-dot" />
                NexusNow<span style={{ color: "#A78BFA" }}>.ai</span>
              </div>
              <p className="footer-tagline">
                AI-driven transformation for the enterprise. ServiceNow, Agentic AI, SAP, Cyber Security, and strategic CIO leadership — delivered globally.
              </p>
              <div className="footer-socials">
                <div className="footer-social-btn">in</div>
                <div className="footer-social-btn">𝕏</div>
              </div>
            </div>

            <div>
              <div className="footer-col-head">Services</div>
              <div className="footer-link-list">
                {[
                  ["Agentic AI", "/services/agentic-ai"],
                  ["ServiceNow", "/services/servicenow"],
                  ["SAP", "/services/sap"],
                  ["Cyber Security", "/services/cyber-security"],
                  ["CIO as a Service", "/services/cio-as-a-service"],
                  ["Managed Services", "/services/managed-services"],
                  ["Advisory Services", "/services/advisory"],
                ].map(([label, path]) => (
                  <button key={label} className="footer-link" onClick={() => go(path)}>{label}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="footer-col-head">Company</div>
              <div className="footer-link-list">
                {[
                  ["About Us", "/about"],
                  ["Why Choose Us", "/why-choose-us"],
                  ["Our Leaders", "/leaders"],
                  ["Careers", "/careers"],
                  ["Learning", "/learning"],
                  ["Contact Us", "/contact"],
                ].map(([label, path]) => (
                  <button key={label} className="footer-link" onClick={() => go(path)}>{label}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="footer-col-head">Industries</div>
              <div className="footer-link-list">
                {[
                  ["Banking", "/industries/banking"],
                  ["Insurance", "/industries/insurance"],
                  ["Telecom & Media", "/industries/telecom-media"],
                  ["Manufacturing", "/industries/manufacturing"],
                  ["Retail & Supply Chain", "/industries/retail-supply-chain"],
                ].map(([label, path]) => (
                  <button key={label} className="footer-link" onClick={() => go(path)}>{label}</button>
                ))}
              </div>
              <div className="footer-col-head" style={{ marginTop: 28 }}>Contact</div>
              <div className="footer-link-list">
                <span className="footer-link accent">info@nexusnow.ai</span>
                <span className="footer-link">+91 98453 92147</span>
                <span className="footer-link" style={{ fontSize: 12, marginTop: 4 }}>160 Robinson Road, #10-01<br />Singapore 068914</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2026 NexusNow.ai. All rights reserved.</div>
            <div className="footer-legal">
              <button className="footer-link" style={{ fontSize: 12 }}>Privacy Policy</button>
              <button className="footer-link" style={{ fontSize: 12 }}>Terms of Use</button>
            </div>
            <div className="footer-lang-pill">
              <span className="footer-lang-active">EN</span>
              <span className="footer-lang-sep">|</span>
              <span>NL</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}