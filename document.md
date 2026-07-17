# उड़ान 🕊️ — सफ़ेद पंखों की कविता

एक स्क्रॉल-आधारित एनिमेटेड कविता अनुभव — जिसमें एक चमकती सफ़ेद चिड़िया पूरे पेज पर उड़ान भरती है, सूरज उगता-डूबता है, और हर स्क्रॉल पर एक नई हिंदी कविता खुलती है।

**Created by Saurav Leekha**

## ✨ Features

- Scroll-linked flying bird animation (wings flap, glow pulses, sine-wave flight path)
- Sun rises and sets across the full scroll journey; sky crossfades night → dawn → day → dusk → night
- Pure-CSS tree silhouettes, no external images needed
- Poetry sections fade in on scroll using `IntersectionObserver`
- Scroll progress bar
- Custom themed 404 page
- Fully responsive, respects `prefers-reduced-motion`, visible keyboard focus states

## 📁 Files

| File | Purpose |
|---|---|
| `index.html` | Main page markup |
| `style.css` | All styling, colours, animations |
| `script.js` | Poem data + scroll-linked animation logic |
| `favicon.svg` | Site icon (glowing bird) |
| `site.webmanifest` | PWA-style manifest so the site can be "installed" |
| `404.html` | Themed not-found page |

## ✍️ नई कविता कैसे जोड़ें (Adding a new poem)

`script.js` खोलो और `poems` array में नीचे की तरह एक नया object जोड़ दो:

```js
{
  title: "नया शीर्षक",
  lines: ["पहली पंक्ति", "दूसरी पंक्ति", "..."]
},
```

Design, layout, aur animation apne aap ban jayenge — koi aur file chhedne ki zaroorat nahi.

## 🚀 GitHub Pages पर live करना

1. सारी files एक repo में push करो (root में, या `/docs` folder में)
2. Repo → **Settings → Pages**
3. Source: `main` branch (root या `/docs`, jo bhi use kiya ho)
4. Save karo — kuch minute mein site live ho jayegi: `https://<username>.github.io/<repo-name>/`

## 🛠️ Local पर चलाना

Kisi bhi static server se khol sakte ho, jaise:

```bash
npx serve .
```

ya seedha `index.html` ko browser mein double-click karke bhi khol sakte ho.
