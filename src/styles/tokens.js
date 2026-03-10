export const tokens = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #07060F;
    --surface: #0D0B1A;
    --elevated: #130F25;
    --purple-deep: #2D1B69;
    --purple-core: #6D28D9;
    --purple-mid: #7C3AED;
    --purple-light: #8B5CF6;
    --purple-soft: #A78BFA;
    --purple-mist: #C4B5FD;
    --white: #FFFFFF;
    --grey-100: #F3F4F6;
    --grey-200: #E5E7EB;
    --grey-500: #6B7280;
    --glow: rgba(139,92,246,0.35);
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--grey-200);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--purple-deep); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--purple-core); }

  .btn-primary {
    background: linear-gradient(135deg, var(--purple-core), var(--purple-light));
    color: white; border: none; padding: 13px 28px; border-radius: 9px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
    position: relative; overflow: hidden; display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(109,40,217,0.5); }
  .btn-primary:active { transform: scale(0.98); }

  .btn-ghost {
    background: transparent; color: var(--purple-mist);
    border: 1px solid rgba(167,139,250,0.3); padding: 13px 28px; border-radius: 9px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none;
  }
  .btn-ghost:hover { background: rgba(109,40,217,0.12); border-color: var(--purple-soft); color: white; }

  .section-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: var(--purple-soft); margin-bottom: 20px;
  }
  .section-tag::before { content: ''; width: 20px; height: 1px; background: var(--purple-soft); }

  .section-title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(30px, 3.5vw, 50px);
    font-weight: 800; line-height: 1.08;
    letter-spacing: -1.5px; color: var(--white); margin-bottom: 18px;
  }
  .section-sub {
    font-size: 16px; color: var(--grey-500); line-height: 1.7; max-width: 560px;
  }

  .fade-in {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1);
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .fade-delay-1 { transition-delay: 0.08s; }
  .fade-delay-2 { transition-delay: 0.16s; }
  .fade-delay-3 { transition-delay: 0.24s; }
  .fade-delay-4 { transition-delay: 0.32s; }
  .fade-delay-5 { transition-delay: 0.40s; }
`;