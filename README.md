# CineTone — Film Score Composer Portfolio

A fully custom, production-ready HTML/CSS/JS portfolio website for **Marcus Hale**, film score composer. Cinematic-noir editorial aesthetic with dark/light mode, RTL support, animated waveforms, and a demo reel layout.

---

## File Structure

```
cinetone/
├── index.html            Homepage — hero, demo reel, projects, testimonials
├── home2.html            Alternate homepage — editorial centered layout
├── about.html            About Marcus Hale — credentials, awards, skills
├── services.html         Services — process, pricing note, collaboration CTA
├── blog.html             Journal listing — 6 scored articles
├── blog-single.html      Single post — adaptive game music essay
├── contact.html          Collaboration request form + contact details
├── 404.html              Custom 404 — waveform illustration + quick nav
├── coming-soon.html      Countdown timer + newsletter signup
├── assets/
│   ├── css/
│   │   ├── style.css     Full design system — all CSS variables + dark mode
│   │   └── rtl.css       RTL layout overrides only
│   └── js/
│       └── main.js       Nav, theme toggle, RTL, scroll reveal, accordion, forms
└── README.md             This file
```

---

## Design System

### Aesthetic Direction
**Cinematic-noir editorial** — dramatic, atmospheric, black & gold. Inspired by film titles, score manuscripts, and audio timelines.

### Color Palette

| Token | Light Mode | Dark Mode |
|---|---|---|
| Background | `#FFFFFF` | `#000000` |
| Foreground | `#0D0D0D` | `#F0EDE6` |
| Accent (Gold) | `#C8A96E` | `#C8A96E` |
| Surface | `#F7F5F2` | `#0F0F0F` |
| Border | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.08)` |

All tokens are CSS variables in `:root` and overridden in `[data-theme="dark"]`.

### Typography

| Role | Font | Weight |
|---|---|---|
| Display / Headings | Cormorant Garamond | 500–560 |
| Body / UI | DM Sans | 400–500 |

Loaded from Google Fonts. No system fonts used. All weights ≤ 580 (as per spec).

### Signature Element
Animated waveform bars (`<span>` stacks with `scaleY` keyframes) used as a visual motif in the hero, 404, and coming-soon pages. Score-line dividers (5-line staff) used as section backgrounds.

---

## Features

### Navigation
- Full horizontal navbar above 1024px
- Hamburger → slide-in drawer at 1024px and below
- Drawer slides from right (left in RTL mode)
- Theme toggle: desktop navbar + inside mobile drawer
- RTL toggle: `ph-arrows-left-right` icon, both locations
- Active link state via JS on page load

### Theme Toggle
- Detects `prefers-color-scheme` on first visit
- Persists via `localStorage` key `cinetone-theme`
- Smooth `transition: background 0.3s, color 0.3s`
- Sun/moon icon swap

### RTL Support
- `dir="rtl"` toggled on `<html>`
- Persists via `localStorage` key `cinetone-rtl`
- All layout uses logical CSS properties
- Drawer direction flips correctly in `rtl.css`

### Pages

**Homepage (index.html)**
- Typewriter effect on hero headline
- Animated score-line background
- Waveform player mock in hero
- Marquee film strip (scrolling genre tags)
- Demo reel — 6 cards with hover play button
- Projects accordion — 3 expandable case studies
- Testimonials 3-col grid
- CTA section with diagonal pattern

**Home 2 (home2.html)**
- Centered editorial layout (completely different)
- Ghost-text "SCORE" watermark
- 4-col stat strip
- Career timeline
- Tools grid
- Single large pull-quote testimonial

**404 (404.html)**
- Giant "4 〜〜〜 4" with animated waveform replacing the middle zero
- Score-line background
- 6-card quick navigation grid

**Coming Soon (coming-soon.html)**
- Live countdown timer (90-day target, configurable)
- Animated 20-bar waveform
- Email newsletter signup (Mailchimp placeholder)
- Ambient radial glow effect

---

## Integrations (Placeholders)

| Service | Location | What to replace |
|---|---|---|
| **Formspree** | `contact.html` form `action` | `https://formspree.io/f/YOUR_FORM_ID` |
| **Mailchimp** | `coming-soon.html` JS comment block | `fetch('https://yourdomain.us1.list-manage.com/...')` |
| **Google Maps** | `contact.html` map section | Replace placeholder div with `<iframe src="...">` |
| **Google Analytics** | All pages `<head>` | `<!-- GA_TAG -->` comment |

---

## Customisation

### Change the launch date (coming-soon.html)
```js
// In coming-soon.html inline <script>
const target = new Date();
target.setDate(target.getDate() + 90); // ← change 90 to desired days
```
Or set a specific date:
```js
const target = new Date('2027-01-01T00:00:00');
```

### Change accent color
```css
/* In assets/css/style.css :root */
--accent: #C8A96E; /* ← change to any hex */
```

### Add a new page
1. Copy `404.html` as a starting template (it has the full nav + footer structure).
2. Replace the `<main>` content.
3. Update `<title>` and `<meta name="description">`.
4. Add a link in the navbar `<ul class="nav-links">` and drawer `<nav class="drawer-nav">` across all pages.

---

## Content Reference (Marcus Hale)

| Field | Value |
|---|---|
| Full Name | Marcus Hale |
| Role | Film Score Composer |
| Email | marcus@cinetone.com |
| Phone | +44 20 7946 0831 |
| Location | London, UK / Berlin, DE |
| Education | Royal College of Music, 2016 |
| Certification | Wwise Certified Developer, 2018 |
| Stats | 47 Projects · 12 Film Credits · 4h Adaptive Game Music · 8+ Years |

**Notable Projects**
- *Dusk Protocol* — Feature film (2024)
- *Echoes of Veil* — Video game, 4h adaptive score (2023)
- *The Weight of Stars* — Documentary, Edinburgh Documentary Film Festival Best Sound (2022)

**Testimonials**
- Priya Anand — Director
- Lars Brandt — Thornwick Studios
- Celine Dumont — Documentary Director

---

## Browser Support
Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Dependencies
- [Phosphor Icons](https://phosphoricons.com/) — `@phosphor-icons/web@2.1.1` via CDN
- [Cormorant Garamond + DM Sans](https://fonts.google.com/) — via Google Fonts CDN
- No build tools. No frameworks. Pure HTML/CSS/ES6.

---

*Built for Marcus Hale / CineTone · © 2026*
