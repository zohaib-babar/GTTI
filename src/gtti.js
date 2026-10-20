// gtti.js - GTTI (Government Technical Training Institute) landing page
// Plain React + GSAP, single file, no Tailwind needed (styles are inside).
// Setup:  npm install gsap
// Use:    import GTTI from "./gtti"; then render <GTTI />


import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ------------------------------------------------------------------ */
/* CONTENT: edit everything here                                       */
/* ------------------------------------------------------------------ */

const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const SITE = {
  intro:
    "Practical, workshop-first training in drafting, vehicles, surveying and professional cooking, built to get you working.",
  // TODO: replace with real institute details
  address: "GTTI 465 Campus Samundri, Faislabad, Pakistan",
  phone: "+92 324 8604353",
  email: "info@gtti.edu.pk",
  hours: "Mon to Sat, 8:00 am to 12:00 pm",
};

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Gallery", href: "#gallery" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

const IMG = {
  hero1: u("photo-1503387762-592deb58ef4e", 1200),
  hero2: u("photo-1486262715619-67b85e0b08d3", 900),
  hero3: u("photo-1556910103-1c02745aae4d", 900),
  about: u("photo-1523240795612-9a054b0db644", 1200),
};

// Durations and levels are placeholders: update from your prospectus.
const COURSES = [
  { id: "bs-autocad", title: "AutoCAD", level: "Advanced", duration: "6 months",
    summary: "Advanced drafting and design practice for engineering and architectural drawings.",
    image: u("photo-1581092160562-40aa08e78837"),
    points: ["2D and 3D drafting", "Plan and elevation drawings", "Project portfolio"] },
  { id: "cca", title: "CCA", level: "Certificate", duration: "6 months",
    summary: "Certificate in computer applications: the office and digital skills every employer asks for.",
    image: u("photo-1498050108023-c5249f4df085"),
    points: ["MS Office suite", "Internet and email", "Typing and data entry"] },
  { id: "auto-diesel", title: "Auto Diesel", level: "Diploma", duration: "1 year",
    summary: "Diagnose, service and repair diesel engines and vehicle systems in a live workshop.",
    image: u("photo-1486262715619-67b85e0b08d3"),
    points: ["Engine overhaul", "Fuel injection systems", "Fault diagnosis"] },
  { id: "civil-surveyor", title: "Civil Surveyor", level: "Diploma", duration: "1 year",
    summary: "Learn site measurement, levelling and plotting with the instruments used on real projects.",
    image: u("photo-1504917595217-d4dc5ebe6122"),
    points: ["Total station and level", "Contour and site plans", "Field practice"] },
  { id: "professional-cooking", title: "Professional Cooking", level: "Certificate", duration: "6 months",
    summary: "From knife skills to full service: train in a working kitchen with hygiene and safety first.",
    image: u("photo-1556910103-1c02745aae4d"),
    points: ["Kitchen hygiene", "Local and continental menus", "Plating and service"] },
  { id: "autocad", title: "AutoCAD", level: "Short course", duration: "3 months",
    summary: "A focused short course in drafting fundamentals for students and working technicians.",
    image: u("photo-1581091226825-a6a2a5aee158"),
    points: ["Drawing tools and layers", "Dimensioning", "Printing and plotting"] },
];

const PILLARS = [
  { title: "Workshop-first learning", text: "Most of your time is spent with tools, machines and real tasks, not slides." },
  { title: "Skills employers look for", text: "Every course is built around the work you will be asked to do on day one." },
  { title: "Guidance from instructors", text: "Small practical batches mean you get shown, corrected and shown again." },
];

const GALLERY = [
  { src: u("photo-1581092160562-40aa08e78837", 1000), alt: "Students working on engineering drawings", caption: "Drafting lab", cls: "wide tall" },
  { src: u("photo-1486262715619-67b85e0b08d3", 800), alt: "Technician repairing a vehicle engine", caption: "Auto workshop", cls: "" },
  { src: u("photo-1556910103-1c02745aae4d", 800), alt: "Chef cooking in a professional kitchen", caption: "Training kitchen", cls: "" },
  { src: u("photo-1504917595217-d4dc5ebe6122", 800), alt: "Surveyors reviewing plans on site", caption: "Field survey", cls: "" },
  { src: u("photo-1522202176988-66273c2fd55f", 800), alt: "Students studying together", caption: "Classroom sessions", cls: "" },
  { src: u("photo-1498050108023-c5249f4df085", 1000), alt: "Computer lab", caption: "Computer lab", cls: "wide" },
];

const STEPS = [
  { title: "Choose your course", text: "Pick the program that matches your goal from the six on offer." },
  { title: "Send your enquiry", text: "Use the contact form or visit the campus office to register your interest." },
  { title: "Submit documents", text: "Bring copies of the documents listed here to confirm eligibility." },
  { title: "Confirm your seat", text: "Pay the admission dues and receive your class schedule." },
];

const REQUIREMENTS = [
  "CNIC or B-Form copy",
  "Copy of last academic certificate",
  "Recent passport-size photographs",
  "Guardian CNIC copy",
];

/* ------------------------------------------------------------------ */
/* STYLES                                                              */
/* ------------------------------------------------------------------ */

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap");

.gtti{--n950:#061230;--n900:#0A1E4A;--n800:#0F2A63;--n700:#16398A;--brand:#2F5BEA;--mist:#EEF3FC;--amber:#F5B335;--amber2:#E9A21A;--text:#475569;
  font-family:Figtree,system-ui,sans-serif;color:var(--text);background:#fff;line-height:1.6;-webkit-font-smoothing:antialiased}
.gtti *,.gtti *::before,.gtti *::after{box-sizing:border-box}
.gtti h1,.gtti h2,.gtti h3{font-family:"Bricolage Grotesque",system-ui,sans-serif;color:var(--n900);margin:0;line-height:1.15}
.gtti p{margin:0}.gtti ul,.gtti ol,.gtti dl,.gtti dd{margin:0;padding:0;list-style:none}
.gtti a{color:inherit;text-decoration:none}
.gtti img{display:block;max-width:100%}
.gtti button{font:inherit;cursor:pointer}
.gtti :focus-visible{outline:3px solid var(--brand);outline-offset:3px;border-radius:6px}
.gtti section[id]{scroll-margin-top:72px}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.gtti *{transition-duration:.01ms!important}}

.g-wrap{width:100%;max-width:1200px;margin:0 auto;padding:0 20px}
@media(min-width:640px){.g-wrap{padding:0 32px}}
.g-sec{padding:80px 0}@media(min-width:640px){.g-sec{padding:112px 0}}
.g-img{object-fit:cover;width:100%;height:100%}
.g-fallback{background-color:var(--n800);background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:28px 28px;width:100%;height:100%}

/* buttons */
.g-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:12px 24px;font-size:14px;font-weight:600;border:1px solid transparent;transition:background .2s,color .2s}
.g-btn.primary{background:var(--n900);color:#fff}.g-btn.primary:hover{background:var(--n700)}
.g-btn.accent{background:var(--amber);color:var(--n950)}.g-btn.accent:hover{background:var(--amber2)}
.g-btn.outline{border-color:rgba(255,255,255,.4);color:#fff}.g-btn.outline:hover{background:rgba(255,255,255,.1)}
.g-btn.block{width:100%}

/* heading */
.g-head{max-width:640px}.g-head.center{margin:0 auto;text-align:center}
.g-head h2{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-.02em}
.g-head p{margin-top:16px;font-size:18px;color:#475569}
.g-head.light h2{color:#fff}.g-head.light p{color:rgba(255,255,255,.75)}

/* logo */
.g-logo{display:flex;align-items:center;gap:12px}
.g-logo-mark{width:48px;height:48px;flex:none;border-radius:8px;background:#fff;object-fit:contain}
.g-logo b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:18px;font-weight:800;color:var(--n900);line-height:1.1}
.g-logo small{display:none;font-size:11px;font-weight:500;color:#64748b}
@media(min-width:420px){.g-logo small{display:block}}
.g-logo.light b{color:#fff}.g-logo.light small{color:rgba(255,255,255,.7);display:block}

/* navbar */
.g-nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-bottom:1px solid transparent;transition:box-shadow .2s,border-color .2s}
.g-nav.scrolled{border-color:#e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.g-nav-row{height:72px;display:flex;align-items:center;justify-content:space-between}
.g-links{display:none;gap:4px}
.g-links a{display:block;padding:8px 16px;border-radius:999px;font-size:14px;font-weight:500;color:#475569;transition:color .2s}
.g-links a:hover{color:var(--n900)}.g-links a.on{background:var(--mist);color:var(--n900)}
.g-nav-cta{display:none}
.g-burger{width:44px;height:44px;display:grid;place-items:center;border:0;background:none;color:var(--n900);border-radius:8px}
.g-burger svg{width:24px;height:24px}
.g-mobile{display:grid;grid-template-rows:0fr;overflow:hidden;background:#fff;transition:grid-template-rows .3s}
.g-mobile.open{grid-template-rows:1fr;border-top:1px solid #e2e8f0}
.g-mobile>div{min-height:0}
.g-mobile ul{padding:16px 20px;display:flex;flex-direction:column;gap:4px}
.g-mobile a.l{display:block;padding:12px 16px;border-radius:8px;font-weight:500;color:#334155}
.g-mobile a.l.on{background:var(--mist);color:var(--n900)}
.g-mobile li:last-child{padding-top:8px}
@media(min-width:1024px){.g-links{display:flex}.g-nav-cta{display:block}.g-burger,.g-mobile{display:none}}

/* hero */
.g-hero{position:relative;overflow:hidden;background:var(--n950);color:#fff}
.g-bp{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;color:rgba(255,255,255,.1)}
.g-bp line{stroke-dasharray:1;stroke-dashoffset:0}
.g-hero-in{position:relative;display:grid;gap:56px;align-items:center;padding:64px 0}
@media(min-width:640px){.g-hero-in{padding:96px 0}}
@media(min-width:1024px){.g-hero-in{grid-template-columns:1.05fr 1fr;padding:112px 0}}
.g-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);border-radius:999px;padding:6px 16px;font-size:14px;font-weight:500;margin-bottom:20px}
.g-pill i{width:8px;height:8px;border-radius:50%;background:var(--amber)}
.g-hero h1{color:#fff;font-size:clamp(44px,7vw,72px);font-weight:800;letter-spacing:-.02em;line-height:1.02}
.g-hero h1 .line{display:block}
.g-word{display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:.25em}
.g-word span{display:inline-block}
.g-hero-p{margin-top:24px;max-width:540px;font-size:18px;color:rgba(255,255,255,.75)}
.g-hero-cta{margin-top:36px;display:flex;flex-wrap:wrap;gap:12px}
.g-stats{margin-top:48px;max-width:420px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid rgba(255,255,255,.15);padding-top:24px}
.g-stats dt{font-size:14px;color:rgba(255,255,255,.6)}
.g-stats dd{font-family:"Bricolage Grotesque",sans-serif;font-size:24px;font-weight:700;color:#fff}
.g-collage{width:100%;max-width:560px;margin:0 auto;aspect-ratio:1/1;display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(6,1fr);gap:16px}
.g-collage>div{overflow:hidden;border-radius:16px}
.g-collage .a{grid-column:span 3;grid-row:span 6}
.g-collage .b,.g-collage .c{grid-column:span 2;grid-row:span 3}

/* about */
.g-about{display:grid;gap:64px;align-items:center}
@media(min-width:1024px){.g-about{grid-template-columns:1fr 1fr}}
.g-about-pic{position:relative}
.g-about-pic .photo{aspect-ratio:4/3;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px -18px rgba(10,30,74,.35)}
.g-badge{position:absolute;bottom:-24px;right:16px;max-width:240px;background:var(--n900);color:#fff;border-radius:12px;padding:20px;box-shadow:0 18px 40px -18px rgba(10,30,74,.5);font-family:"Bricolage Grotesque",sans-serif;font-size:18px;font-weight:700;line-height:1.3}
.g-pillars{margin-top:40px;display:flex;flex-direction:column;gap:24px}
.g-pillars li{display:flex;gap:16px}
.g-tick{flex:none;width:36px;height:36px;margin-top:4px;border-radius:50%;background:var(--mist);color:var(--n700);display:grid;place-items:center}
.g-tick svg{width:20px;height:20px}
.g-pillars h3{font-size:18px;font-weight:700}.g-pillars p{margin-top:4px;color:#475569}

/* courses */
.g-courses{background:var(--mist)}
.g-grid3{margin-top:56px;display:grid;gap:28px}
@media(min-width:640px){.g-grid3{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.g-grid3{grid-template-columns:repeat(3,1fr)}}
.g-card{display:flex;flex-direction:column;overflow:hidden;border-radius:16px;border:1px solid #e2e8f0;background:#fff;transition:box-shadow .3s}
.g-card:hover{box-shadow:0 18px 40px -18px rgba(10,30,74,.35)}
.g-card-img{position:relative;aspect-ratio:16/10;overflow:hidden}
.g-card-img .g-img{transition:transform .5s}.g-card:hover .g-card-img .g-img{transform:scale(1.05)}
.g-level{position:absolute;left:16px;top:16px;background:#fff;color:var(--n900);border-radius:999px;padding:4px 12px;font-size:12px;font-weight:600}
.g-card-body{display:flex;flex:1;flex-direction:column;padding:24px}
.g-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.g-card h3{font-size:20px;font-weight:700}
.g-dur{flex:none;background:var(--mist);color:var(--n700);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600}
.g-card-body>p{margin-top:12px;color:#475569}
.g-points{margin-top:20px;display:flex;flex-direction:column;gap:8px;font-size:14px;color:#334155}
.g-points li{display:flex;align-items:center;gap:8px}
.g-points li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--brand)}
.g-apply{margin-top:auto;padding-top:24px;display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:var(--n700)}
.g-apply:hover{color:var(--brand)}.g-apply svg{width:16px;height:16px}

/* gallery */
.g-gal{margin-top:56px;display:grid;grid-template-columns:repeat(2,1fr);grid-auto-rows:180px;gap:16px}
@media(min-width:640px){.g-gal{grid-template-columns:repeat(4,1fr);grid-auto-rows:220px}}
.g-tile{position:relative;overflow:hidden;border-radius:12px;border:0;padding:0;background:none;text-align:left}
.g-tile .g-img{transition:transform .5s}.g-tile:hover .g-img{transform:scale(1.05)}
.g-tile span{position:absolute;left:0;right:0;bottom:0;padding:32px 16px 14px;background:linear-gradient(to top,rgba(6,18,48,.85),transparent);color:#fff;font-size:14px;font-weight:600}
@media(min-width:640px){.g-tile.wide{grid-column:span 2}.g-tile.tall{grid-row:span 2}}
.g-lb{position:fixed;inset:0;z-index:60;display:grid;place-items:center;background:rgba(6,18,48,.95);padding:16px}
.g-lb figure{margin:0;max-width:900px;max-height:100%}
.g-lb img{max-height:78vh;width:100%;border-radius:12px;object-fit:contain}
.g-lb figcaption{margin-top:12px;text-align:center;color:rgba(255,255,255,.8)}
.g-lb button{position:absolute;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.1);color:#fff;display:grid;place-items:center}
.g-lb button:hover{background:rgba(255,255,255,.2)}
.g-lb button svg{width:24px;height:24px}
.g-lb .x{top:16px;right:16px}.g-lb .p{left:12px}.g-lb .n{right:12px}

/* admissions */
.g-adm{background-color:var(--n800);background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:28px 28px;color:#fff}
.g-adm-in{display:grid;gap:56px}
@media(min-width:1024px){.g-adm-in{grid-template-columns:1.1fr 1fr}}
.g-steps{margin-top:40px;display:flex;flex-direction:column;gap:28px}
.g-steps li{display:flex;gap:20px}
.g-step-n{flex:none;width:40px;height:40px;border-radius:50%;background:var(--amber);color:var(--n950);display:grid;place-items:center;font-family:"Bricolage Grotesque",sans-serif;font-size:18px;font-weight:700}
.g-steps h3{color:#fff;font-size:18px;font-weight:700}.g-steps p{margin-top:4px;color:rgba(255,255,255,.7)}
.g-docs{align-self:start;background:#fff;color:#334155;border-radius:16px;padding:32px;box-shadow:0 18px 40px -18px rgba(0,0,0,.5)}
.g-docs h3{font-size:20px;font-weight:700}
.g-docs ul{margin:20px 0 32px;display:flex;flex-direction:column;gap:12px}
.g-docs li{display:flex;align-items:center;gap:12px}
.g-docs li svg{width:20px;height:20px;flex:none;color:var(--brand)}

/* contact */
.g-contact{display:grid;gap:56px}
@media(min-width:1024px){.g-contact{grid-template-columns:.9fr 1.1fr}}
.g-info{margin-top:40px;display:flex;flex-direction:column;gap:24px}
.g-info dt{font-size:14px;font-weight:600;color:var(--n700)}
.g-info dd{margin-top:4px;font-size:18px;color:#1e293b}
.g-form{background:rgba(238,243,252,.6);border:1px solid #e2e8f0;border-radius:16px;padding:24px}
@media(min-width:640px){.g-form{padding:32px}}
.g-fields{display:grid;gap:20px}
@media(min-width:640px){.g-fields{grid-template-columns:1fr 1fr}.g-fields .full{grid-column:span 2}}
.g-field span.lbl{display:block;font-size:14px;font-weight:600;color:var(--n900)}
.g-field input,.g-field select,.g-field textarea{margin-top:8px;width:100%;border:1px solid #cbd5e1;border-radius:8px;background:#fff;padding:12px 16px;font:inherit;font-size:16px;color:#0f172a}
.g-field input:focus,.g-field select:focus,.g-field textarea:focus{outline:0;border-color:var(--brand);box-shadow:0 0 0 3px rgba(47,91,234,.25)}
.g-err{display:block;margin-top:4px;font-size:14px;color:#dc2626}
.g-submit{width:100%;border:0;border-radius:999px;background:var(--n900);color:#fff;padding:14px 24px;font-size:14px;font-weight:600;transition:background .2s}
.g-submit:hover{background:var(--n700)}.g-submit:disabled{opacity:.6}
.g-sent{text-align:center;padding:40px 0}
.g-sent h3{font-size:24px;font-weight:700}.g-sent p{margin-top:8px}
.g-link{margin-top:24px;background:none;border:0;color:var(--n700);font-size:14px;font-weight:600;text-decoration:underline}

/* footer */
.g-foot{background:var(--n950);color:rgba(255,255,255,.7)}
.g-foot-grid{display:grid;gap:40px;padding:64px 0}
@media(min-width:640px){.g-foot-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.g-foot-grid{grid-template-columns:repeat(4,1fr)}}
.g-foot-grid>div:first-child p{margin-top:20px;max-width:300px;font-size:14px}
.g-foot-grid>div{min-width:0}
.g-foot h3{color:#fff;font-size:16px;font-weight:700}
.g-foot ul{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-size:14px}
.g-foot a{overflow-wrap:anywhere}
.g-foot a:hover{color:#fff}
.g-copy{border-top:1px solid rgba(255,255,255,.1);padding:24px 0;font-size:14px}

@media(max-width:639px){
  .g-sec{padding:64px 0}
  .g-hero-in{gap:40px;padding:56px 0}
  .g-hero h1{font-size:clamp(38px,11vw,56px)}
  .g-hero-p{margin-top:18px;font-size:16px}
  .g-hero-cta{margin-top:24px}
  .g-hero-cta .g-btn{flex:1 1 100%}
  .g-stats{max-width:none;margin-top:32px;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding-top:20px}
  .g-stats dt{font-size:11px}
  .g-stats dd{font-size:clamp(16px,5vw,22px)}
  .g-collage{gap:10px}
  .g-collage>div{border-radius:12px}
  .g-about{gap:52px}
  .g-badge{right:12px;bottom:-18px;max-width:210px;padding:16px;font-size:16px}
  .g-head p{margin-top:12px;font-size:16px}
  .g-grid3,.g-gal{margin-top:32px}
  .g-grid3{gap:16px}
  .g-card-body{padding:20px}
  .g-card h3{font-size:18px}
  .g-gal{grid-auto-rows:150px;gap:10px}
  .g-tile span{padding:28px 12px 12px;font-size:12px}
  .g-adm-in,.g-contact{gap:36px}
  .g-steps{margin-top:28px;gap:20px}
  .g-steps li{gap:14px}
  .g-docs{padding:22px}
  .g-info{margin-top:28px;gap:20px}
  .g-info dd{font-size:16px;overflow-wrap:anywhere}
  .g-form{padding:20px}
  .g-fields{gap:16px}
  .g-foot-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:32px 20px;padding:48px 0}
  .g-foot-grid>div:first-child,.g-foot-grid>div:last-child{grid-column:1 / -1}
  .g-copy{padding:20px 0;text-align:center}
}

@media(max-width:380px){
  .g-wrap{padding:0 16px}
  .g-nav-row{height:64px}
  .g-logo{gap:8px}
  .g-logo-mark{width:40px;height:40px}
  .g-logo small{font-size:10px}
  .g-stats dd{font-size:16px}
  .g-card-top{flex-wrap:wrap}
  .g-card-top h3{min-width:0}
}
`;

/* ------------------------------------------------------------------ */
/* SMALL SHARED COMPONENTS                                             */
/* ------------------------------------------------------------------ */

// Image with a navy blueprint fallback so a missing photo never breaks the layout.
function Img({ src, alt, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className="g-fallback" />;
  return <img className="g-img" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} {...rest} />;
}

function Button({ href, variant = "primary", block, children, ...rest }) {
  return (
    <a href={href} className={`g-btn ${variant}${block ? " block" : ""}`} {...rest}>
      {children}
    </a>
  );
}

function SectionHeading({ title, text, light, center }) {
  return (
    <div data-reveal className={`g-head${light ? " light" : ""}${center ? " center" : ""}`}>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Logo({ light }) {
  return (
    <span className={`g-logo${light ? " light" : ""}`}>
      <img className="g-logo-mark" src="/gtti-logo.jpg" alt="" />
      <span>
        <b>GTTI</b>
        <small>Government Technical Training Institute</small>
      </span>
    </span>
  );
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* SECTIONS                                                            */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV.map((l) => document.querySelector(l.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`g-nav${scrolled ? " scrolled" : ""}`}>
      <nav className="g-wrap g-nav-row" aria-label="Main">
        <a href="#home" aria-label="GTTI home"><Logo /></a>

        <ul className="g-links">
          {NAV.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={active === l.href ? "on" : ""} aria-current={active === l.href ? "page" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="g-nav-cta"><Button href="#admissions">Apply now</Button></div>

        <button
          type="button"
          className="g-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="g-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      <div id="g-mobile" className={`g-mobile${open ? " open" : ""}`}>
        <div>
          <ul>
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`l${active === l.href ? " on" : ""}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Button href="#admissions" block tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Apply now</Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

const GRID = Array.from({ length: 9 }, (_, i) => (i + 1) * 10);

function Hero() {
  const root = useRef(null);

  // The one orchestrated moment: blueprint lines draw, headline rises, photos unveil.
  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".bp-line", { strokeDashoffset: 1, duration: 1.4, stagger: 0.05, ease: "power2.inOut" })
        .from(".g-word span", { yPercent: 115, duration: 0.8, stagger: 0.07 }, "-=1.1")
        .from(".hero-fade", { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".hero-photo", { clipPath: "inset(0 0 100% 0)", duration: 1, stagger: 0.15, ease: "power4.inOut" }, "-=1.4");
    });
    return () => mm.revert();
  }, []);

  const lines = ["Learn a trade.", "Build a career."];

  return (
    <section id="home" ref={root} className="g-hero">
      <svg className="g-bp" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {GRID.map((p) => (
          <g key={p}>
            <line className="bp-line" pathLength="1" x1={p} y1="0" x2={p} y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <line className="bp-line" pathLength="1" x1="0" y1={p} x2="100" y2={p} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>

      <div className="g-wrap g-hero-in">
        <div>
          <p className="g-pill hero-fade"><i /> Admissions open</p>
          <h1>
            {lines.map((line) => (
              <span key={line} className="line">
                {line.split(" ").map((w, i) => (
                  <span key={i} className="g-word"><span>{w}</span></span>
                ))}
              </span>
            ))}
          </h1>
          <p className="g-hero-p hero-fade">{SITE.intro}</p>
          <div className="g-hero-cta hero-fade">
            <Button href="#admissions" variant="accent">Apply for admission</Button>
            <Button href="#courses" variant="outline">Explore courses</Button>
          </div>
          <dl className="g-stats hero-fade">
            {[["6", "Programs"], ["100%", "Hands-on focus"], ["Mon–Sat", "Open campus"]].map(([v, l]) => (
              <div key={l}><dt>{l}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>

        <div className="g-collage">
          <div className="a hero-photo"><Img src={IMG.hero1} alt="Student drafting a technical drawing" loading="eager" /></div>
          <div className="b hero-photo"><Img src={IMG.hero2} alt="Technician working on an engine" loading="eager" /></div>
          <div className="c hero-photo"><Img src={IMG.hero3} alt="Chef preparing a dish" loading="eager" /></div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="g-sec">
      <div className="g-wrap g-about">
        <div data-reveal className="g-about-pic">
          <div className="photo"><Img src={IMG.about} alt="Students learning together at GTTI" /></div>
          <div className="g-badge">Training that ends with a job-ready skill.</div>
        </div>
        <div>
          <SectionHeading
            title="A government institute built around practical skills"
            text="GTTI trains students in trades that businesses and industry need. You learn by doing: in the drafting lab, the auto workshop, the survey field and the training kitchen."
          />
          <ul className="g-pillars">
            {PILLARS.map((p) => (
              <li key={p.title} data-reveal>
                <span className="g-tick"><Check /></span>
                <div><h3>{p.title}</h3><p>{p.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course }) {
  return (
    <article data-reveal className="g-card">
      <div className="g-card-img">
        <Img src={course.image} alt={`${course.title} training`} />
        <span className="g-level">{course.level}</span>
      </div>
      <div className="g-card-body">
        <div className="g-card-top">
          <h3>{course.title}</h3>
          <span className="g-dur">{course.duration}</span>
        </div>
        <p>{course.summary}</p>
        <ul className="g-points">{course.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        <a href="#admissions" className="g-apply">
          Apply for {course.title}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function Courses() {
  return (
    <section id="courses" className="g-sec g-courses">
      <div className="g-wrap">
        <SectionHeading
          title="Six programs, one goal: skills you can use"
          text="From drafting and computers to diesel engines, surveying and cooking, choose the course that fits where you want to work."
        />
        <div className="g-grid3">{COURSES.map((c) => <CourseCard key={c.id} course={c} />)}</div>
      </div>
    </section>
  );
}

function Gallery() {
  const [index, setIndex] = useState(null);
  const close = useCallback(() => setIndex(null), []);
  const move = useCallback((d) => setIndex((i) => (i + d + GALLERY.length) % GALLERY.length), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, move]);

  const icon = (d) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
  );

  return (
    <section id="gallery" className="g-sec">
      <div className="g-wrap">
        <SectionHeading title="Life at GTTI" text="Workshops, labs and classrooms where students spend their days." />
        <div className="g-gal">
          {GALLERY.map((g, i) => (
            <button key={g.src} type="button" data-reveal className={`g-tile ${g.cls}`} aria-label={`Open photo: ${g.caption}`} onClick={() => setIndex(i)}>
              <Img src={g.src} alt={g.alt} />
              <span>{g.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {index !== null && (
        <div className="g-lb" role="dialog" aria-modal="true" aria-label={GALLERY[index].caption} onClick={close}>
          <button type="button" className="x" aria-label="Close gallery" onClick={close}>{icon("M6 6l12 12M18 6L6 18")}</button>
          <button type="button" className="p" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); move(-1); }}>{icon("M15 6l-6 6 6 6")}</button>
          <button type="button" className="n" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); move(1); }}>{icon("M9 6l6 6-6 6")}</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={GALLERY[index].src} alt={GALLERY[index].alt} />
            <figcaption>{GALLERY[index].caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function Admissions() {
  return (
    <section id="admissions" className="g-sec g-adm">
      <div className="g-wrap g-adm-in">
        <div>
          <SectionHeading light title="Admissions are open" text="Getting started takes four steps. Our campus office will help you at every one." />
          <ol className="g-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} data-reveal>
                <span className="g-step-n">{i + 1}</span>
                <div><h3>{s.title}</h3><p>{s.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <aside data-reveal className="g-docs">
          <h3>Documents to bring</h3>
          <ul>{REQUIREMENTS.map((r) => <li key={r}><Check />{r}</li>)}</ul>
          <Button href="#contact" block>Send an admission enquiry</Button>
        </aside>
      </div>
    </section>
  );
}

const WHATSAPP_NUMBER = "923336661470";
const EMPTY = { name: "", phone: "", whatsapp: "", email: "", course: "", message: "" };

function Contact() {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | ready | blocked
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = "Enter your full name.";
    if (!/^[+\d][\d\s-]{6,}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
    const whatsappDigits = v.whatsapp.replace(/\D/g, "");
    if (whatsappDigits.length < 7 || whatsappDigits.length > 15) e.whatsapp = "Enter a valid WhatsApp number.";
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address.";
    if (!v.course) e.course = "Choose a course.";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const message = [
      "New GTTI enquiry",
      `Name: ${v.name.trim()}`,
      `Phone: ${v.phone.trim()}`,
      `WhatsApp: ${v.whatsapp.trim()}`,
      `Email: ${v.email.trim() || "Not provided"}`,
      `Course: ${v.course}`,
      `Message: ${v.message.trim() || "Not provided"}`,
    ].join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);

    const whatsappWindow = window.open(url, "_blank");
    if (!whatsappWindow) {
      setStatus("blocked");
      return;
    }
    whatsappWindow.opener = null;
    setStatus("ready");
  };

  const info = [["Address", SITE.address], ["Phone", SITE.phone], ["Email", SITE.email], ["Hours", SITE.hours]];

  return (
    <section id="contact" className="g-sec">
      <div className="g-wrap g-contact">
        <div>
          <SectionHeading title="Talk to our admissions office" text="Ask about a course, fees or dates. We reply within one working day." />
          <dl className="g-info">
            {info.map(([k, val]) => (
              <div key={k} data-reveal><dt>{k}</dt><dd>{val}</dd></div>
            ))}
          </dl>
        </div>

        <form data-reveal className="g-form" onSubmit={onSubmit} noValidate>
          {status === "ready" ? (
            <div className="g-sent" role="status">
              <h3>WhatsApp message prepared</h3>
              <p>Please press Send in WhatsApp to deliver your enquiry.</p>
              <a className="g-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
              <button type="button" className="g-link" onClick={() => { setStatus("idle"); setV(EMPTY); }}>Send another enquiry</button>
            </div>
          ) : (
            <div className="g-fields">
              <label className="g-field">
                <span className="lbl">Full name</span>
                <input value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
                {errors.name && <span className="g-err">{errors.name}</span>}
              </label>
              <label className="g-field">
                <span className="lbl">Phone</span>
                <input type="tel" value={v.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errors.phone} />
                {errors.phone && <span className="g-err">{errors.phone}</span>}
              </label>
              <label className="g-field">
                <span className="lbl">WhatsApp number</span>
                <input type="tel" value={v.whatsapp} onChange={set("whatsapp")} autoComplete="tel" placeholder="+92 3XX XXXXXXX" aria-invalid={!!errors.whatsapp} />
                {errors.whatsapp && <span className="g-err">{errors.whatsapp}</span>}
              </label>
              <label className="g-field">
                <span className="lbl">Email (optional)</span>
                <input type="email" value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
                {errors.email && <span className="g-err">{errors.email}</span>}
              </label>
              <label className="g-field">
                <span className="lbl">Course</span>
                <select value={v.course} onChange={set("course")} aria-invalid={!!errors.course}>
                  <option value="">Select a course</option>
                  {COURSES.map((c) => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
                {errors.course && <span className="g-err">{errors.course}</span>}
              </label>
              <label className="g-field full">
                <span className="lbl">Message (optional)</span>
                <textarea rows={4} value={v.message} onChange={set("message")} />
              </label>
              <div className="full">
                <button type="submit" className="g-submit">
                  Send enquiry on WhatsApp
                </button>
                {status === "blocked" && (
                  <p role="alert" className="g-err" style={{ marginTop: 12 }}>
                    Your browser blocked the WhatsApp window. <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp</a> to continue.
                  </p>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="g-foot">
      <div className="g-wrap g-foot-grid">
        <div><Logo light /><p>{SITE.intro}</p></div>
        <div>
          <h3>Quick links</h3>
          <ul>{NAV.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </div>
        <div>
          <h3>Courses</h3>
          <ul>{COURSES.map((c) => <li key={c.id}><a href="#courses">{c.title}</a></li>)}</ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>{SITE.address}</li>
            <li><a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="g-copy">
        <p className="g-wrap">© {new Date().getFullYear()} Government Technical Training Institute. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function GTTI() {
  // Scroll reveals: anything marked data-reveal fades up as it enters view.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set("[data-reveal]", { opacity: 0, y: 28 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", overwrite: true }),
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="gtti">
      <style>{CSS}</style>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <Gallery />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
