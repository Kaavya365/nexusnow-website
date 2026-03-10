import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../styles/tokens";
import {
  Bot, Zap, Diamond, Shield, Briefcase, Lightbulb, BarChart2, Rocket,
  RefreshCw, Package, Wrench, Globe, PiggyBank, RadioTower, Factory,
  ShoppingBag, Target, FlaskConical
} from "lucide-react";

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const styles = `
  ${tokens}

  /* ── HERO ─────────────────────────────────────────────────────────────── */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 120px 48px 100px; overflow: hidden; text-align: center;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 90% 60% at 50% -5%, rgba(109,40,217,0.2) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 85% 65%, rgba(139,92,246,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 40% 35% at 15% 85%, rgba(45,27,105,0.12) 0%, transparent 60%),
      var(--bg);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(167,139,250,0.035) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(167,139,250,0.035) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 90% 75% at 50% 25%, black 20%, transparent 100%);
  }
  .hero-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }

  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border-radius: 999px;
    background: rgba(109,40,217,0.12); border: 1px solid rgba(139,92,246,0.22);
    font-size: 11px; font-weight: 700; color: var(--purple-soft);
    letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 32px;
  }
  .hero-pulse {
    width: 6px; height: 6px; border-radius: 50%; background: var(--purple-soft);
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.5)} }

  .hero-title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(40px, 6.5vw, 88px);
    font-weight: 800; line-height: 1.05; letter-spacing: -3px;
    color: var(--white); margin-bottom: 28px; position: relative; z-index: 1;
  }
  .hero-title .grad {
    background: linear-gradient(135deg, #A78BFA 0%, #C4B5FD 45%, #E9D5FF 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-title .shimmer {
    background: linear-gradient(90deg, #C4B5FD, #fff, #A78BFA, #C4B5FD);
    background-size: 300% 100%;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: shimmer-anim 4s ease-in-out infinite;
  }
  @keyframes shimmer-anim { 0%,100%{background-position:0%} 50%{background-position:100%} }

  .hero-sub {
    font-size: 18px; color: var(--grey-500); line-height: 1.7;
    max-width: 600px; margin: 0 auto 48px; position: relative; z-index: 1;
  }
  .hero-sub strong { color: var(--grey-200); font-weight: 500; }

  .hero-ctas {
    display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 72px; position: relative; z-index: 1;
  }

  .hero-stats { display: flex; align-items: center; position: relative; z-index: 1; }
  .hero-stat { text-align: center; padding: 0 40px; }
  .hero-stat-num {
    font-family: 'Space Mono', monospace; font-size: 34px; font-weight: 700;
    color: var(--white); letter-spacing: -1px;
  }
  .hero-stat-label { font-size: 12px; color: var(--grey-500); margin-top: 5px; font-weight: 500; }
  .hero-stat-divider { width: 1px; height: 48px; background: rgba(167,139,250,0.12); flex-shrink: 0; }

  /* ── TRUST BAR ─────────────────────────────────────────────────────────── */
  .trust-bar {
    padding: 36px 0;
    border-top: 1px solid rgba(167,139,250,0.06);
    border-bottom: 1px solid rgba(167,139,250,0.06);
    background: var(--surface); overflow: hidden; position: relative;
  }
  .trust-label {
    text-align: center; font-size: 10px; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--grey-500); margin-bottom: 20px; font-weight: 600;
  }
  .trust-track {
    display: flex; animation: scroll-left 35s linear infinite; width: max-content; align-items: center;
  }
  @keyframes scroll-left { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .trust-bar::before, .trust-bar::after {
    content: ''; position: absolute; top: 0; bottom: 0; width: 100px; z-index: 2;
  }
  .trust-bar::before { left: 0; background: linear-gradient(90deg, var(--surface), transparent); }
  .trust-bar::after  { right: 0; background: linear-gradient(-90deg, var(--surface), transparent); }
  .trust-item {
    padding: 0 40px; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 14px;
    color: rgba(167,139,250,0.22); white-space: nowrap; transition: color 0.3s;
  }
  .trust-item:hover { color: rgba(167,139,250,0.55); }

  /* ── SECTION LAYOUT ────────────────────────────────────────────────────── */
  .section { padding: 104px 48px; }
  .section-inner { max-width: 1280px; margin: 0 auto; }
  .surface-bg { background: var(--surface); }

  /* ── ABOUT ─────────────────────────────────────────────────────────────── */
  .about-strip { padding: 80px 48px; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-text-block p { font-size: 16px; color: var(--grey-500); line-height: 1.75; margin-bottom: 18px; }
  .about-text-block p strong { color: var(--grey-200); font-weight: 500; }
  .about-card-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .about-card {
    padding: 24px; border-radius: 12px;
    background: rgba(255,255,255,0.02); border: 1px solid rgba(167,139,250,0.09);
    transition: all 0.3s;
  }
  .about-card:hover { background: rgba(109,40,217,0.07); border-color: rgba(139,92,246,0.2); }
  .about-card-icon { margin-bottom: 12px; display: flex; }
  .about-card-title { font-family:'Outfit',sans-serif; font-size:15px; font-weight:700; color:var(--white); margin-bottom:6px; }
  .about-card-text  { font-size:13px; color:var(--grey-500); line-height:1.55; }

  /* ── SERVICES ──────────────────────────────────────────────────────────── */
  .services-header {
    margin-bottom: 56px; display: flex; justify-content: space-between;
    align-items: flex-end; flex-wrap: wrap; gap: 24px;
  }
  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; background: rgba(167,139,250,0.05);
    border: 1px solid rgba(167,139,250,0.05); border-radius: 16px; overflow: hidden;
  }
  .svc-card {
    background: var(--surface); padding: 36px 30px 32px;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    position: relative; overflow: hidden;
  }
  .svc-card::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 10% 90%, rgba(109,40,217,0.1), transparent 60%);
    opacity: 0; transition: opacity 0.35s;
  }
  .svc-card:hover { background: var(--elevated); }
  .svc-card:hover::before { opacity: 1; }
  .svc-top-line {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--purple-core), transparent);
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left;
  }
  .svc-card:hover .svc-top-line { transform: scaleX(1); }
  .svc-badge {
    display: inline-block; font-size: 9px; font-weight: 800; letter-spacing: 1.2px;
    text-transform: uppercase; color: var(--purple-soft);
    background: rgba(109,40,217,0.18); border: 1px solid rgba(139,92,246,0.28);
    padding: 2px 8px; border-radius: 999px; margin-bottom: 14px;
  }
  .svc-icon {
    width: 46px; height: 46px; border-radius: 11px;
    background: rgba(109,40,217,0.12); border: 1px solid rgba(139,92,246,0.18);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 22px; transition: all 0.3s;
  }
  .svc-card:hover .svc-icon {
    background: rgba(109,40,217,0.22); border-color: rgba(139,92,246,0.38);
    box-shadow: 0 0 18px rgba(109,40,217,0.28);
  }
  .svc-name { font-family:'Outfit',sans-serif; font-size:17px; font-weight:700; color:var(--white); margin-bottom:10px; letter-spacing:-0.2px; }
  .svc-desc { font-size:13px; color:var(--grey-500); line-height:1.65; }
  .svc-arrow {
    position: absolute; bottom: 28px; right: 28px; color: var(--purple-light);
    opacity: 0; transform: translate(-6px,6px); transition: all 0.3s; font-size: 16px;
  }
  .svc-card:hover .svc-arrow { opacity: 1; transform: translate(0,0); }

  /* ── DIFFERENTIATORS ───────────────────────────────────────────────────── */
  .diff-layout { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .diff-list { display:flex; flex-direction:column; margin-top:44px; }
  .diff-item {
    display:flex; gap:22px; align-items:flex-start; padding:26px 0;
    border-bottom:1px solid rgba(167,139,250,0.07); cursor:pointer; transition:all 0.2s;
  }
  .diff-item:first-child { border-top:1px solid rgba(167,139,250,0.07); }
  .diff-num { font-family:'Space Mono',monospace; font-size:11px; font-weight:700; color:var(--purple-core); margin-top:3px; flex-shrink:0; min-width:20px; }
  .diff-name { font-family:'Outfit',sans-serif; font-size:17px; font-weight:700; color:var(--white); margin-bottom:7px; letter-spacing:-0.2px; transition:color 0.2s; }
  .diff-item:hover .diff-name { color:var(--purple-mist); }
  .diff-body { font-size:13px; color:var(--grey-500); line-height:1.65; }
  .diff-visual-wrap { position:relative; display:flex; align-items:center; justify-content:center; height:400px; }
  .diff-ring { position:absolute; border-radius:50%; border:1px solid rgba(139,92,246,0.1); animation:spin 30s linear infinite; }
  .diff-ring:nth-child(2) { animation-duration:45s; animation-direction:reverse; border-color:rgba(139,92,246,0.06); }
  .diff-ring:nth-child(3) { animation-duration:60s; border-color:rgba(139,92,246,0.04); }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .diff-core {
    width:200px; height:200px; border-radius:50%;
    background:radial-gradient(circle at 38% 38%, rgba(139,92,246,0.25), rgba(109,40,217,0.12) 50%, transparent 75%);
    border:1px solid rgba(139,92,246,0.18);
    box-shadow:0 0 50px rgba(109,40,217,0.18), inset 0 0 30px rgba(109,40,217,0.08);
    position:relative; display:flex; align-items:center; justify-content:center;
  }
  .diff-center-text { font-family:'Outfit',sans-serif; font-size:13px; font-weight:700; color:rgba(167,139,250,0.5); letter-spacing:2px; text-transform:uppercase; text-align:center; line-height:1.5; }
  .orbit-dot { position:absolute; width:8px; height:8px; border-radius:50%; background:var(--purple-soft); box-shadow:0 0 10px var(--purple-soft); }

  /* ── STATS ─────────────────────────────────────────────────────────────── */
  .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; background:rgba(167,139,250,0.06); border-radius:14px; overflow:hidden; border:1px solid rgba(167,139,250,0.06); }
  .stat-box { background:var(--surface); padding:40px 32px; text-align:center; transition:background 0.3s; }
  .stat-box:hover { background:var(--elevated); }
  .stat-num { font-family:'Space Mono',monospace; font-size:42px; font-weight:700; color:var(--white); letter-spacing:-2px; margin-bottom:8px; }
  .stat-num .stat-suffix { font-size:28px; color:var(--purple-soft); }
  .stat-label { font-size:13px; color:var(--grey-500); line-height:1.5; font-weight:500; }

  /* ── INDUSTRIES ────────────────────────────────────────────────────────── */
  .ind-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin-top:52px; }
  .ind-card { padding:30px 20px; border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(167,139,250,0.07); text-align:center; cursor:pointer; transition:all 0.3s; position:relative; overflow:hidden; }
  .ind-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--purple-mid),transparent); transform:scaleX(0); transition:transform 0.3s; }
  .ind-card:hover { background:rgba(109,40,217,0.08); border-color:rgba(139,92,246,0.22); transform:translateY(-4px); }
  .ind-card:hover::after { transform:scaleX(1); }
  .ind-icon-wrap { width:54px; height:54px; border-radius:13px; background:rgba(109,40,217,0.1); border:1px solid rgba(139,92,246,0.14); display:flex; align-items:center; justify-content:center; margin:0 auto 14px; transition:all 0.3s; }
  .ind-card:hover .ind-icon-wrap { background:rgba(109,40,217,0.2); box-shadow:0 0 20px rgba(109,40,217,0.22); }
  .ind-name { font-family:'Outfit',sans-serif; font-size:14px; font-weight:700; color:var(--white); margin-bottom:7px; }
  .ind-desc { font-size:11px; color:var(--grey-500); line-height:1.55; }

  /* ── PROCESS ───────────────────────────────────────────────────────────── */
  .process-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; margin-top:56px; position:relative; }
  .process-steps::before { content:''; position:absolute; top:32px; left:10%; right:10%; height:1px; background:linear-gradient(90deg, transparent, rgba(139,92,246,0.3), rgba(139,92,246,0.3), transparent); }
  .process-step { text-align:center; padding:32px 20px; border-radius:14px; background:rgba(255,255,255,0.02); border:1px solid rgba(167,139,250,0.08); transition:all 0.3s; position:relative; }
  .process-step:hover { background:rgba(109,40,217,0.07); border-color:rgba(139,92,246,0.2); transform:translateY(-4px); }
  .step-num { width:56px; height:56px; border-radius:50%; background:rgba(109,40,217,0.15); border:1px solid rgba(139,92,246,0.25); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; font-family:'Space Mono',monospace; font-size:14px; font-weight:700; color:var(--purple-soft); }
  .step-title { font-family:'Outfit',sans-serif; font-size:16px; font-weight:700; color:var(--white); margin-bottom:10px; }
  .step-desc { font-size:13px; color:var(--grey-500); line-height:1.6; }

  /* ── OFFICES ───────────────────────────────────────────────────────────── */
  .offices-layout { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
  .office-cards { display:flex; flex-direction:column; gap:14px; margin-top:44px; }
  .office-card { display:flex; gap:18px; align-items:flex-start; padding:22px; border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(167,139,250,0.08); cursor:pointer; transition:all 0.3s; }
  .office-card:hover { background:rgba(109,40,217,0.07); border-color:rgba(139,92,246,0.22); }
  .office-flag { width:38px; height:38px; border-radius:50%; background:rgba(109,40,217,0.15); border:1px solid rgba(139,92,246,0.2); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
  .office-role-tag { font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--purple-soft); margin-bottom:3px; }
  .office-city { font-family:'Outfit',sans-serif; font-size:15px; font-weight:700; color:var(--white); margin-bottom:4px; }
  .office-addr { font-size:12px; color:var(--grey-500); line-height:1.55; }
  .map-box { height:380px; border-radius:16px; background:var(--elevated); border:1px solid rgba(167,139,250,0.08); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; }
  .map-gridlines { position:absolute; inset:0; background-image:linear-gradient(rgba(167,139,250,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,0.04) 1px,transparent 1px); background-size:36px 36px; }
  .map-glow-orb { position:absolute; border-radius:50%; filter:blur(48px); }
  .pin-wrap { position:absolute; }
  .pin-dot { width:10px; height:10px; border-radius:50%; background:var(--purple-soft); box-shadow:0 0 12px var(--purple-soft); }
  .pin-label { position:absolute; white-space:nowrap; font-size:10px; font-weight:600; color:var(--purple-mist); left:16px; top:-2px; }
  .ping-ring { position:absolute; border-radius:50%; border:1px solid var(--purple-soft); animation:ping 2.8s ease-out infinite; opacity:0; }
  @keyframes ping { 0%{transform:scale(0.6);opacity:0.5} 100%{transform:scale(2.4);opacity:0} }
  .map-label { position:absolute; bottom:16px; right:16px; font-family:'Space Mono',monospace; font-size:10px; color:rgba(167,139,250,0.25); }

  /* ── CTA ───────────────────────────────────────────────────────────────── */
  .cta-wrap { position:relative; overflow:hidden; }
  .cta-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(109,40,217,0.18) 0%,rgba(139,92,246,0.09) 50%,rgba(45,27,105,0.14) 100%); }
  .cta-lines { position:absolute; inset:0; background-image:linear-gradient(rgba(167,139,250,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,0.05) 1px,transparent 1px); background-size:56px 56px; }
  .cta-content { position:relative; z-index:1; text-align:center; max-width:720px; margin:0 auto; }
  .cta-title { font-family:'Outfit',sans-serif; font-size:clamp(28px,4vw,60px); font-weight:800; color:var(--white); line-height:1.08; letter-spacing:-2px; margin-bottom:18px; }
  .cta-sub { font-size:16px; color:rgba(229,231,235,0.65); margin-bottom:40px; line-height:1.7; max-width:560px; margin-left:auto; margin-right:auto; }
  .cta-trust { font-size:12px; color:var(--grey-500); margin-top:16px; letter-spacing:0.3px; }

  /* ═══════════════════════════════════════════════════════════════════════
     RESPONSIVE — tablet 1024px
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .services-grid      { grid-template-columns: repeat(2,1fr); }
    .diff-layout        { grid-template-columns: 1fr; }
    .diff-visual-wrap   { display: none; }
    .stats-row          { grid-template-columns: repeat(2,1fr); }
    .ind-grid           { grid-template-columns: repeat(3,1fr); }
    .process-steps      { grid-template-columns: repeat(2,1fr); }
    .process-steps::before { display: none; }
    .offices-layout     { grid-template-columns: 1fr; }
    .about-grid         { grid-template-columns: 1fr; gap: 40px; }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     RESPONSIVE — small tablet / large phone 768px
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 768px) {
    .hero               { padding: 100px 24px 80px; }
    .hero-stat          { padding: 0 20px; }
    .hero-stat-num      { font-size: 26px; }
    .section            { padding: 72px 24px; }
    .about-strip        { padding: 64px 24px; }
    .services-grid      { grid-template-columns: 1fr; }
    .stats-row          { grid-template-columns: 1fr 1fr; }
    .ind-grid           { grid-template-columns: repeat(2,1fr); }
    .process-steps      { grid-template-columns: 1fr; }
    .about-card-row     { grid-template-columns: 1fr 1fr; }
    .services-header    { flex-direction: column; align-items: flex-start; }
    .map-box            { height: 260px; }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     RESPONSIVE — phone 480px
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 480px) {
    /* Hero */
    .hero               { padding: 88px 20px 64px; min-height: auto; }
    .hero-eyebrow       { font-size: 9px; letter-spacing: 1px; padding: 5px 12px; margin-bottom: 20px; }
    .hero-title         { font-size: clamp(32px, 9vw, 48px); letter-spacing: -1.5px; margin-bottom: 18px; }
    .hero-sub           { font-size: 14px; margin-bottom: 32px; }
    .hero-ctas          { flex-direction: column; align-items: center; gap: 10px; margin-bottom: 44px; }
    .hero-ctas .btn-primary,
    .hero-ctas .btn-ghost   { width: 100%; max-width: 300px; justify-content: center; font-size: 14px !important; padding: 13px 20px !important; }
    .hero-stats             { width: 100%; justify-content: center; }
    .hero-stat              { padding: 0 10px; }
    .hero-stat-num          { font-size: 19px; letter-spacing: -0.5px; }
    .hero-stat-label        { font-size: 9px; }
    .hero-stat-divider      { height: 32px; }

    /* Trust bar */
    .trust-bar          { padding: 24px 0; }
    .trust-label        { font-size: 9px; margin-bottom: 14px; }
    .trust-item         { font-size: 12px; padding: 0 24px; }

    /* Sections */
    .section            { padding: 52px 20px; }
    .about-strip        { padding: 48px 20px; }
    .section-title      { font-size: clamp(24px, 7vw, 34px); letter-spacing: -1px; }
    .section-sub        { font-size: 14px; }
    .section-tag        { font-size: 10px; }

    /* About cards — keep 2 col on phone, just tighter */
    .about-card-row     { grid-template-columns: 1fr 1fr; gap: 10px; }
    .about-card         { padding: 16px; }
    .about-card-title   { font-size: 13px; }
    .about-card-text    { font-size: 11px; }

    /* Services */
    .services-grid      { grid-template-columns: 1fr; }
    .svc-card           { padding: 26px 20px 24px; }
    .svc-name           { font-size: 15px; }
    .svc-desc           { font-size: 12px; }
    .svc-arrow          { display: none; }

    /* Differentiators */
    .diff-list          { margin-top: 24px; }
    .diff-item          { padding: 18px 0; gap: 14px; }
    .diff-name          { font-size: 15px; }
    .diff-body          { font-size: 12px; }

    /* Stats */
    .stats-row          { grid-template-columns: 1fr 1fr; gap: 2px; }
    .stat-box           { padding: 26px 14px; }
    .stat-num           { font-size: 30px; }
    .stat-num .stat-suffix { font-size: 22px; }
    .stat-label         { font-size: 11px; }

    /* Industries */
    .ind-grid           { grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 32px; }
    .ind-card           { padding: 20px 12px; }
    .ind-icon-wrap      { width: 44px; height: 44px; border-radius: 10px; margin-bottom: 10px; }
    .ind-name           { font-size: 12px; }
    .ind-desc           { font-size: 10px; }

    /* Process steps */
    .process-steps      { gap: 10px; margin-top: 32px; }
    .process-step       { padding: 22px 14px; }
    .step-num           { width: 44px; height: 44px; font-size: 12px; margin-bottom: 14px; }
    .step-title         { font-size: 14px; }
    .step-desc          { font-size: 12px; }

    /* Offices */
    .office-cards       { gap: 10px; margin-top: 28px; }
    .office-card        { padding: 14px; gap: 12px; }
    .office-flag        { width: 34px; height: 34px; font-size: 16px; flex-shrink: 0; }
    .office-role-tag    { font-size: 9px; }
    .office-city        { font-size: 14px; }
    .office-addr        { font-size: 11px; }
    .map-box            { height: 200px; }
    .pin-label          { font-size: 9px; }

    /* CTA */
    .cta-title          { letter-spacing: -1.5px; }
    .cta-sub            { font-size: 13px; }
    .cta-wrap .btn-primary,
    .cta-wrap .btn-ghost    { font-size: 14px !important; padding: 12px 20px !important; }
    .cta-trust          { font-size: 11px; }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     RESPONSIVE — very small phone 360px
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 360px) {
    .hero-title         { font-size: 30px; }
    .hero-stat-num      { font-size: 17px; }
    .hero-stat-label    { font-size: 8px; }
    .hero-stat          { padding: 0 6px; }
    .about-card-row     { grid-template-columns: 1fr; }
    .ind-grid           { grid-template-columns: 1fr 1fr; }
    .section-title      { font-size: 24px; }
  }

  /* Shared fade-in animation */
  .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .fade-delay-1 { transition-delay: 0.08s; }
  .fade-delay-2 { transition-delay: 0.16s; }
  .fade-delay-3 { transition-delay: 0.24s; }
  .fade-delay-4 { transition-delay: 0.32s; }
`;

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const services = [
  { Icon: Bot,        name: "Agentic AI",               path: "/services/agentic-ai",              badge: "NEW", desc: "Deploy autonomous AI agents that act, decide, and deliver results without manual intervention — built for enterprise-scale workflows." },
  { Icon: Zap,        name: "ServiceNow",                path: "/services/servicenow",              badge: "NEW", desc: "Premier ServiceNow implementation, optimisation, and AI integration. ITSM, HRSD, CSM, App Engine — delivered end-to-end." },
  { Icon: Diamond,    name: "SAP",                       path: "/services/sap",                     badge: "NEW", desc: "AI-augmented SAP services including S/4HANA migration, SAP BTP, and seamless ServiceNow integration for unified operations." },
  { Icon: Shield,     name: "Cyber Security",            path: "/services/cyber-security",          badge: "NEW", desc: "Proactive, AI-powered cyber defence with threat intelligence, zero trust architecture, and full compliance readiness." },
  { Icon: Briefcase,  name: "CIO as a Service",          path: "/services/cio-as-a-service",        badge: "NEW", desc: "Fractional CIO leadership that delivers strategic IT direction, vendor oversight, and board-level tech governance — without the full-time cost." },
  { Icon: Lightbulb,  name: "Advisory Services",         path: "/services/advisory",                badge: null,  desc: "Collaborate with our expert consultants to navigate digital transformation and maximise the value of your technology investments." },
  { Icon: BarChart2,  name: "AI-Powered Insights",       path: "/services/ai-insights",             badge: null,  desc: "AI-driven managed IT services that enable proactive decision-making, predictive maintenance, and seamless IT operations." },
  { Icon: Rocket,     name: "Value Accelerators",        path: "/services/value-accelerators",      badge: null,  desc: "Unlock the full potential of ServiceNow Intelligence and reduce implementation risks — delivering rapid, scalable outcomes." },
  { Icon: RefreshCw,  name: "Workflow Automation",       path: "/services/workflow-automation",     badge: null,  desc: "Automate manual processes, eliminate spreadsheets, and reduce inbox overload with ServiceNow workflow applications." },
  { Icon: Package,    name: "Migration & Implementation",path: "/services/migration-implementation",badge: null,  desc: "Seamless ServiceNow delivery — whether you're new, re-implementing, or building custom applications." },
  { Icon: Wrench,     name: "Managed Services",          path: "/services/managed-services",        badge: null,  desc: "A dedicated team to manage and continuously develop your ServiceNow platform, proactively automating across your business." },
];

const differentiators = [
  { num: "01", title: "AI-First, Not AI-Added",           body: "We architect artificial intelligence into the foundation of every engagement. AI isn't a feature we bolt on — it's the operating model we build from." },
  { num: "02", title: "ServiceNow Elite Expertise",       body: "With 150+ certified practitioners and Premier Partner status, we deliver deeper ServiceNow outcomes than any generalist consultancy." },
  { num: "03", title: "Bridging the Global AI Talent Gap",body: "We don't just advise — we equip your teams with AI-driven capabilities, ensuring your organisation can sustain transformation long after our engagement ends." },
  { num: "04", title: "Global Delivery, Local Insight",   body: "With offices in Singapore, Mumbai, and Bengaluru, we combine global scale with genuine local market knowledge across the World." },
];

const stats = [
  { num: 50,  suffix: "+", label: "Enterprise Clients Served" },
  { num: 12,  suffix: "+", label: "Years of Deep Platform Experience" },
  { num: 200, suffix: "+", label: "Projects Successfully Delivered" },
  { num: 150, suffix: "+", label: "Certified AI & ServiceNow Experts" },
];

const industries = [
  { Icon: PiggyBank,   name: "Banking",              path: "/industries/banking",           desc: "AI-powered risk, operations & customer service" },
  { Icon: Shield,      name: "Insurance",             path: "/industries/insurance",         desc: "Claims automation & intelligent underwriting" },
  { Icon: RadioTower,  name: "Telecom & Media",       path: "/industries/telecom-media",     desc: "Network AI ops & CX transformation" },
  { Icon: Factory,     name: "Manufacturing",         path: "/industries/manufacturing",     desc: "Smart factory & predictive maintenance" },
  { Icon: ShoppingBag, name: "Retail & Supply Chain", path: "/industries/retail-supply-chain",desc: "Demand forecasting & intelligent fulfilment" },
];

const processSteps = [
  { num: "01", title: "Understand",    desc: "We immerse ourselves in your business, challenges, and goals — no templates, no assumptions." },
  { num: "02", title: "Strategise",    desc: "Our experts co-create a customised AI roadmap ensuring seamless adoption and maximum impact." },
  { num: "03", title: "Build & Deploy",desc: "We design and implement solutions that integrate AI into your workflows and business processes." },
  { num: "04", title: "Optimise",      desc: "Continuous monitoring, managed services, and enhancement roadmaps keep your transformation ahead of the curve." },
];

const offices = [
  { flag: "🇸🇬", role: "Asia-Pacific HQ",       city: "Singapore", addr: "160 Robinson Road, Suite #10-01 SBF Center, Singapore 068914" },
  { flag: "🇮🇳", role: "Corporate HQ",           city: "Mumbai",    addr: "ONE BKC, Plot C-66, G Block, 17th Floor, Bandra Kurla Complex, Mumbai 400051" },
  { flag: "🇮🇳", role: "Global Delivery Centre", city: "Bengaluru", addr: "Awfis Vajram Esteva, Marathahalli-Sarjapur Outer Ring Road, Bengaluru 560103" },
];

const trustItems = [
  "ServiceNow Premier Partner","SAP Recognised Partner","Microsoft Gold Partner",
  "AWS Advanced Tier","ISO 27001 Certified","Gartner-Recognised","AI-First Delivery",
  "ServiceNow Premier Partner","SAP Recognised Partner","Microsoft Gold Partner",
  "AWS Advanced Tier","ISO 27001 Certified","Gartner-Recognised","AI-First Delivery",
];

const aboutCards = [
  { Icon: Target,       title: "AI Strategy",      text: "Customised AI roadmaps built around your specific business objectives and industry context." },
  { Icon: Zap,          title: "ServiceNow Mastery",text: "Premier Partner with 150+ certified practitioners delivering ITSM, HRSD, CSM and beyond." },
  { Icon: Globe,        title: "Global Reach",      text: "3 offices across Singapore and India — delivering locally at global scale." },
  { Icon: FlaskConical, title: "Generative AI",     text: "Hands-on GenAI implementation from strategy through to production — not just proof-of-concepts." },
];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const els = Array.from(ref.current?.querySelectorAll(".fade-in") || []);
    const observers = els.map(el => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);
  return ref;
}

function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref  = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const run = (now) => {
          const p    = Math.min((now - start) / 1600, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(run); else setVal(to);
        };
        requestAnimationFrame(run);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, [to]);
  return <span ref={ref}>{val}<span className="stat-suffix">{suffix}</span></span>;
}

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
export default function Homepage() {
  const navigate = useNavigate();
  const sec1 = useFadeIn(), sec2 = useFadeIn(), sec3 = useFadeIn(),
        sec4 = useFadeIn(), sec5 = useFadeIn(), sec6 = useFadeIn(),
        sec7 = useFadeIn(), sec8 = useFadeIn();

  return (
    <div>
      <style>{styles}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb" style={{ width:520, height:520, background:"rgba(109,40,217,0.13)", top:-140, left:"50%", transform:"translateX(-55%)" }} />
        <div className="hero-orb" style={{ width:280, height:280, background:"rgba(139,92,246,0.08)", bottom:80, right:"8%" }} />
        <div className="hero-orb" style={{ width:180, height:180, background:"rgba(45,27,105,0.15)", top:"35%", left:"4%" }} />

        <div style={{ position:"relative", zIndex:1, width:"100%" }}>
          <div className="hero-eyebrow">
            <div className="hero-pulse" />
            AI-Driven Enterprise Transformation
          </div>

          <h1 className="hero-title">
            Driving business<br />
            transformation through<br />
            <span className="grad">AI-powered</span> <span className="shimmer">consulting</span>
          </h1>

          <p className="hero-sub">
            NexusNow.ai is a premier AI consulting firm dedicated to delivering{" "}
            <strong>cutting-edge AI solutions</strong> that transform businesses across industries.
            We specialise in <strong>AI strategy, ServiceNow platforms, data analytics</strong>, and intelligent automation.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" style={{ fontSize:15, padding:"14px 32px" }} onClick={() => navigate("/contact")}>
              Schedule a Consultation
            </button>
            <button className="btn-ghost" style={{ fontSize:15 }} onClick={() => navigate("/why-choose-us")}>
              Why Choose Us →
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((s, i) => (
              <div key={s.label} style={{ display:"contents" }}>
                <div className="hero-stat">
                  <div className="hero-stat-num"><Counter to={s.num} suffix={s.suffix} /></div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
                {i < stats.length - 1 && <div className="hero-stat-divider" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-bar">
        <div className="trust-label">Trusted partnerships & global certifications</div>
        <div style={{ overflow:"hidden" }}>
          <div className="trust-track">
            {trustItems.map((t, i) => <span key={i} className="trust-item">{t}</span>)}
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="about-strip surface-bg" ref={sec1}>
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-text-block">
              <div className="fade-in"><div className="section-tag">About NexusNow.ai</div></div>
              <h2 className="section-title fade-in">A premier AI consulting<br />& advisory firm</h2>
              <p className="fade-in fade-delay-1">
                We are dedicated to delivering <strong>cutting-edge AI-driven solutions</strong> that transform businesses across industries. Our expertise spans AI strategy, data analytics, machine learning solutions, and automation — driving innovation and operational excellence at enterprise scale.
              </p>
              <p className="fade-in fade-delay-2">
                We provide tailored AI consulting services that help organisations <strong>integrate artificial intelligence into their workflows</strong>, optimise business processes, and enhance decision-making capabilities — enabling enterprises to scale efficiently and stay competitive.
              </p>
              <p className="fade-in fade-delay-3">
                By leveraging advanced AI capabilities including <strong>Generative AI and Agentic AI</strong>, we design and implement solutions that empower organisations to unlock new growth opportunities, streamline operations, and enhance customer experiences with measurable impact.
              </p>
              <div className="fade-in fade-delay-4" style={{ marginTop:32 }}>
                <button className="btn-primary" onClick={() => navigate("/about")}>Learn More About Us →</button>
              </div>
            </div>

            <div className="about-card-row fade-in fade-delay-2">
              {aboutCards.map(c => (
                <div key={c.title} className="about-card">
                  <div className="about-card-icon">
                    <c.Icon size={22} color="#8B5CF6" strokeWidth={1.6} />
                  </div>
                  <div className="about-card-title">{c.title}</div>
                  <div className="about-card-text">{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="section" style={{ background:"var(--bg)" }} ref={sec2}>
        <div className="section-inner">
          <div className="services-header">
            <div>
              <div className="section-tag fade-in">What We Do</div>
              <h2 className="section-title fade-in">Capabilities built<br />for the AI era</h2>
              <p className="section-sub fade-in fade-delay-1">
                At NexusNow.ai, we specialise in delivering cutting-edge solutions to address the evolving needs of the global business landscape. Through our expertise in{" "}
                <strong style={{ color:"var(--grey-200)" }}>ServiceNow platforms and AI integration</strong>, we empower organisations to achieve operational excellence and digital transformation.
              </p>
            </div>
            <button className="btn-ghost fade-in fade-delay-2" onClick={() => navigate("/services")}>All Services →</button>
          </div>

          <div className="services-grid fade-in fade-delay-2">
            {services.map((s, i) => (
              <div key={i} className="svc-card" onClick={() => navigate(s.path)}>
                <div className="svc-top-line" />
                {s.badge && <div className="svc-badge">{s.badge}</div>}
                <div className="svc-icon">
                  <s.Icon size={20} color="#8B5CF6" strokeWidth={1.6} />
                </div>
                <div className="svc-name">{s.name}</div>
                <div className="svc-desc">{s.desc}</div>
                <div className="svc-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ── */}
      <section className="section surface-bg" ref={sec3}>
        <div className="section-inner">
          <div className="diff-layout">
            <div>
              <div className="section-tag fade-in">Why NexusNow.ai</div>
              <h2 className="section-title fade-in">Where AI strategy<br />meets execution</h2>
              <p className="section-sub fade-in fade-delay-1">
                We bridge the global AI talent gap and enable organisations to harness the full potential of artificial intelligence for enterprise-wide digital transformation.
              </p>
              <div className="diff-list">
                {differentiators.map((d, i) => (
                  <div key={i} className={`diff-item fade-in fade-delay-${i + 1}`} onClick={() => navigate("/why-choose-us")}>
                    <div className="diff-num">{d.num}</div>
                    <div>
                      <div className="diff-name">{d.title}</div>
                      <div className="diff-body">{d.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="diff-visual-wrap fade-in fade-delay-2">
              <div className="diff-ring" style={{ width:320, height:320 }} />
              <div className="diff-ring" style={{ width:420, height:420 }} />
              <div className="diff-ring" style={{ width:520, height:520 }} />
              <div className="diff-core">
                <div className="diff-center-text">AI<br />FIRST</div>
                {[{top:"4%",left:"46%"},{top:"50%",left:"94%"},{top:"90%",left:"55%"},{top:"60%",left:"2%"},{top:"18%",left:"8%"}]
                  .map((pos, i) => <div key={i} className="orbit-dot" style={pos} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section" style={{ background:"var(--bg)", paddingTop:0, paddingBottom:104 }} ref={sec4}>
        <div className="section-inner">
          <div className="stats-row fade-in">
            {stats.map(s => (
              <div key={s.label} className="stat-box">
                <div className="stat-num"><Counter to={s.num} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section surface-bg" ref={sec5}>
        <div className="section-inner">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:24 }}>
            <div>
              <div className="section-tag fade-in">Industries We Serve</div>
              <h2 className="section-title fade-in" style={{ marginBottom:0 }}>Domain expertise<br />across every sector</h2>
            </div>
            <button className="btn-ghost fade-in" onClick={() => navigate("/industries")}>All Industries →</button>
          </div>
          <div className="ind-grid">
            {industries.map((ind, i) => (
              <div key={i} className={`ind-card fade-in fade-delay-${i + 1}`} onClick={() => navigate(ind.path)}>
                <div className="ind-icon-wrap">
                  <ind.Icon size={22} color="#8B5CF6" strokeWidth={1.6} />
                </div>
                <div className="ind-name">{ind.name}</div>
                <div className="ind-desc">{ind.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="section" style={{ background:"var(--bg)" }} ref={sec6}>
        <div className="section-inner">
          <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto" }}>
            <div className="section-tag fade-in" style={{ justifyContent:"center" }}>Our Approach</div>
            <h2 className="section-title fade-in">How we deliver<br />transformation</h2>
            <p className="section-sub fade-in fade-delay-1" style={{ margin:"0 auto" }}>
              Our team of AI experts collaborates closely with clients to develop customised AI roadmaps, ensuring seamless adoption and maximum impact.
            </p>
          </div>
          <div className="process-steps">
            {processSteps.map((s, i) => (
              <div key={i} className={`process-step fade-in fade-delay-${i + 1}`}>
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ── */}
      <section className="section surface-bg" ref={sec7}>
        <div className="section-inner">
          <div className="offices-layout">
            <div>
              <div className="section-tag fade-in">Global Presence</div>
              <h2 className="section-title fade-in">Present where<br />your business is</h2>
              <p className="section-sub fade-in fade-delay-1">
                Three offices across Asia-Pacific — delivering genuine local expertise with the scale of a global firm.
              </p>
              <div className="office-cards">
                {offices.map((o, i) => (
                  <div key={i} className={`office-card fade-in fade-delay-${i}`}>
                    <div className="office-flag">{o.flag}</div>
                    <div>
                      <div className="office-role-tag">{o.role}</div>
                      <div className="office-city">{o.city}</div>
                      <div className="office-addr">{o.addr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="map-box">
                <div className="map-gridlines" />
                <div className="map-glow-orb" style={{ width:200, height:200, background:"rgba(109,40,217,0.08)", top:"25%", left:"55%" }} />
                <div className="map-glow-orb" style={{ width:150, height:150, background:"rgba(45,27,105,0.1)", bottom:"15%", left:"20%" }} />
                {[
                  { top:"60%", left:"72%", label:"Singapore", d1:"0s",  d2:"0.9s" },
                  { top:"47%", left:"57%", label:"Mumbai",    d1:"0.5s",d2:null   },
                  { top:"55%", left:"60%", label:"Bengaluru", d1:"1.2s",d2:null   },
                ].map(p => (
                  <div key={p.label} className="pin-wrap" style={{ top:p.top, left:p.left }}>
                    <div className="ping-ring" style={{ inset:-10, animationDelay:p.d1 }} />
                    {p.d2 && <div className="ping-ring" style={{ inset:-10, animationDelay:p.d2 }} />}
                    <div className="pin-dot" />
                    <div className="pin-label">{p.label}</div>
                  </div>
                ))}
                <div className="map-label">3 OFFICES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cta-wrap" ref={sec8}>
        <div className="cta-overlay" />
        <div className="cta-lines" />
        <div className="section-inner">
          <div className="cta-content">
            <div className="section-tag fade-in" style={{ justifyContent:"center" }}>Ready to Transform?</div>
            <h2 className="cta-title fade-in">
              Transform your business<br />
              with <span style={{ background:"linear-gradient(135deg,#A78BFA,#C4B5FD)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>ServiceNow and AI</span>
            </h2>
            <p className="cta-sub fade-in fade-delay-1">
              Take the first step towards unlocking the full potential of your business with NexusNow.ai. Whether you're looking to optimise workflows, integrate AI capabilities, or leverage ServiceNow's powerful platform — we provide the expertise and guidance to make it happen.
            </p>
            <div className="fade-in fade-delay-2" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="btn-primary" style={{ fontSize:15, padding:"15px 34px" }} onClick={() => navigate("/contact")}>
                Get Started Today
              </button>
              <button className="btn-ghost" style={{ fontSize:15 }} onClick={() => navigate("/why-choose-us")}>
                Explore Our Approach →
              </button>
            </div>
            <p className="cta-trust fade-in fade-delay-3">No commitment required · Response within 24 hours · Available across all timezones</p>
          </div>
        </div>
      </section>
    </div>
  );
}