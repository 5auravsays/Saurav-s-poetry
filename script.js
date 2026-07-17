/* ============================================================
   उड़ान — script.js
   Saurav Leekha ke liye: aage poetry ke naye page jodne ke liye
   bas neeche diye "poems" array mein ek naya object add karo —
   baaki sab (design, animation, layout) khud-ba-khud ban jayega.
   ============================================================ */

const poems = [
  {
    title: "उड़ान",
    lines: [
      "सफ़ेद पंख, चमकती डोर,",
      "आसमान की हर एक छोर,",
      "बादलों को चीरती जाए,",
      "चिड़िया मन को मोहती जाए।"
    ]
  },
  {
    title: "सूरज की गोद",
    lines: [
      "सुनहरी किरण, सुबह का गीत,",
      "पेड़ों पर बिखरा है मीत,",
      "चिड़िया उड़े सूरज की ओर,",
      "जैसे बंधी हो प्रेम की डोर।"
    ]
  },
  {
    title: "हरियाली",
    lines: [
      "पत्तों की सरसराहट सुन,",
      "डाली-डाली नाचे मन,",
      "चिड़िया वहाँ विश्राम करे,",
      "फिर आसमान को नाम करे।"
    ]
  },
  {
    title: "स्वतंत्रता",
    lines: [
      "कोई सीमा नहीं इसकी उड़ान में,",
      "कोई बंधन नहीं इस जहान में,",
      "सफ़ेद चमक हर पल बताए,",
      "आज़ादी का मतलब समझाए।"
    ]
  },
  {
    title: "अनंत यात्रा",
    lines: [
      "जहाँ खत्म हो नज़र का किनारा,",
      "वहीं से शुरू हो सफर हमारा,",
      "चिड़िया चलती जाए बिन थके,",
      "कहानी लिखे नए हर पल में।"
    ]
  }



  // 👇 Naya page jodna ho to bas yahan ek naya object daalo:
  // {
  //   title: "नया शीर्षक",
  //   lines: ["पहली पंक्ति", "दूसरी पंक्ति", "..."]
  // },
];

/* ---------- Build poem sections from the array above ---------- */
const poemContainer = document.getElementById('poemContainer');

poems.forEach((poem, i) => {
  const section = document.createElement('section');
  section.className = 'poem-section';

  const number = String(i + 1).padStart(2, '0');
  section.innerHTML = `
    <p class="poem-number">पृष्ठ ${number} / ${String(poems.length).padStart(2, '0')}</p>
    <h2 class="poem-title">${poem.title}</h2>
    <div class="poem-lines">
      ${poem.lines.map(line => `<p>${line}</p>`).join('')}
    </div>
  `;
  poemContainer.appendChild(section);
});

/* ---------- Reveal poem sections as they enter viewport ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.poem-section').forEach(el => revealObserver.observe(el));

/* ---------- Scroll-linked flight animation ---------- */
const sky = document.getElementById('sky');
const stars = document.getElementById('stars');
const sun = document.getElementById('sun');
const birdWrap = document.getElementById('birdWrap');
const progressFill = document.getElementById('progressFill');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Colour keyframes across the full scroll journey (night -> day -> night)
const skyKeyframes = [
  { p: 0.00, c: [11, 12, 42] },    // night
  { p: 0.18, c: [43, 40, 96] },    // twilight
  { p: 0.36, c: [232, 180, 188] }, // dawn
  { p: 0.55, c: [191, 227, 236] }, // day
  { p: 0.75, c: [43, 40, 96] },    // dusk
  { p: 1.00, c: [11, 12, 42] }     // night
];

function lerp(a, b, t) { return a + (b - a) * t; }

function colorAt(progress) {
  for (let i = 0; i < skyKeyframes.length - 1; i++) {
    const a = skyKeyframes[i];
    const b = skyKeyframes[i + 1];
    if (progress >= a.p && progress <= b.p) {
      const t = (progress - a.p) / (b.p - a.p);
      return [
        Math.round(lerp(a.c[0], b.c[0], t)),
        Math.round(lerp(a.c[1], b.c[1], t)),
        Math.round(lerp(a.c[2], b.c[2], t))
      ];
    }
  }
  return skyKeyframes[skyKeyframes.length - 1].c;
}

let ticking = false;

function updateScene() {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const scrollHeight = doc.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;

  // Progress bar
  progressFill.style.width = (progress * 100) + '%';

  // Sky colour crossfade
  const top = colorAt(Math.max(progress - 0.12, 0));
  const bottom = colorAt(progress);
  sky.style.background = `linear-gradient(180deg, rgb(${top[0]},${top[1]},${top[2]}), rgb(${bottom[0]},${bottom[1]},${bottom[2]}))`;
  stars.style.opacity = Math.max(0.85 - progress * 1.6, 0);

  // Sun arc: rises from bottom-left, peaks mid-journey, sets bottom-right
  const sunX = 10 + progress * 80; // vw
  const sunArc = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
  const sunY = 82 - sunArc * 55; // vh
  sun.style.left = sunX + 'vw';
  sun.style.top = sunY + 'vh';
  sun.style.opacity = 0.35 + sunArc * 0.65;

  if (!prefersReducedMotion) {
    // Bird flight path: weaving sine wave across the sky, tied to scroll
    const t = progress * Math.PI * 6; // number of weaves across full page
    const birdX = 6 + (progress * 82) + Math.sin(t * 0.6) * 4; // vw
    const birdY = 34 + Math.sin(t) * 14; // vh
    const bank = Math.cos(t) * 12; // deg, wing-bank feel

    birdWrap.style.left = birdX + 'vw';
    birdWrap.style.top = birdY + 'vh';
    birdWrap.style.transform = `rotate(${bank * 0.4}deg)`;
  }

  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateScene);
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
window.addEventListener('load', updateScene);
updateScene();
