# 📄 PRD — garden-for-her

> A personal animated flower garden website, built with pure HTML/CSS/JS,
> deployed via GitHub Pages. A gift for a close friend who loves flowers.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Repo name** | `garden-for-her` |
| **Deploy URL** | `https://<your-username>.github.io/garden-for-her` |
| **Tech stack** | HTML, CSS, JavaScript — no frameworks, no build tools |
| **Hosting** | GitHub Pages |

---

## 2. Goals

- Give a close friend a beautiful, personal online flower garden she can visit anytime
- Keep everything configurable — nothing important is hardcoded
- Make it easy to add more flowers in the future without restructuring anything
- Feel warm, alive, and personal — not like a template
- Be effortless to use — especially for someone who isn't tech-savvy

---

## 3. File Structure

```
garden-for-her/
├── index.html                  ← Gallery / main navigation page
├── admin.html                  ← Admin dashboard (hidden, password protected)
├── style.css                   ← Shared base styles
├── config.js                   ← ⚙️ Central config file (name, messages, environment, password, etc.)
├── interaction.js              ← Repelling force effect logic (shared across all pages)
├── PASSWORDS.md                ← 🔑 Generated once — keep private, listed in .gitignore
├── .gitignore                  ← Includes PASSWORDS.md
├── flowers/
│   ├── rose.html
│   ├── sunflower.html
│   ├── cherry-blossom.html
│   ├── lavender.html
│   ├── tulip.html
│   ├── daisy.html
│   └── _template.html          ← Starter template for adding new flowers
└── assets/
    └── fonts/
```

> 💡 All personalisation lives in `config.js`. To update a name, message, environment,
> or any setting — only that file ever needs to change.

> 🔑 `PASSWORDS.md` is generated once at setup with a strong random password.
> It is listed in `.gitignore` and never pushed to the public repo.

---

## 4. config.js — Central Configuration

This file is the single source of truth. Nothing is hardcoded anywhere else.

```js
// config.js — edit this file to personalise the site
const GARDEN_CONFIG = {

  // Personal
  recipientName: "Sara",               // Displayed on the site — change freely
  siteTitle: "A Garden For You 🌸",
  welcomeMessage: "Every flower here was picked just for you.",

  // Gallery default layout: "grid" | "scatter" | "list"
  defaultGalleryLayout: "grid",

  // Environment defaults
  environment: {
    timeOfDay: "morning",              // "morning" | "sunset" | "night"
    weather: "sunny",                  // "sunny" | "rainy" | "foggy"
    season: "spring",                  // "spring" | "summer" | "autumn" | "winter"
  },

  // Repelling force effect
  repulsion: {
    enabled: true,
    intensity: 80,                     // 1–100. Low = subtle. High = dramatic.
    radius: 120,                       // px — how close before repelling kicks in
    returnSpeed: 1.5,                  // seconds — how slowly elements drift back
  },

  // Admin — copy password from PASSWORDS.md
  adminPassword: "CHANGE_ME",

  // Flowers — add new entries here to register a new flower
  flowers: [
    {
      id: "rose",
      name: "Rose",
      file: "flowers/rose.html",
      funFact: "Roses have been symbols of love for over 5,000 years.",
      personalNote: "Just like you — classic, beautiful, and full of depth.",
      color: "#e8a0b0"
    },
    {
      id: "sunflower",
      name: "Sunflower",
      file: "flowers/sunflower.html",
      funFact: "Sunflowers always face the sun — a behaviour called heliotropism.",
      personalNote: "You brighten every room you walk into.",
      color: "#f5c842"
    },
    {
      id: "cherry-blossom",
      name: "Cherry Blossom",
      file: "flowers/cherry-blossom.html",
      funFact: "In Japan, cherry blossoms represent the beauty of fleeting moments.",
      personalNote: "Some things are precious because they don't last forever.",
      color: "#f2b5c8"
    },
    {
      id: "lavender",
      name: "Lavender",
      file: "flowers/lavender.html",
      funFact: "Lavender has been used for over 2,500 years to calm and heal.",
      personalNote: "You have that rare gift of making people feel at ease.",
      color: "#b89fd4"
    },
    {
      id: "tulip",
      name: "Tulip",
      file: "flowers/tulip.html",
      funFact: "Tulips were once more valuable than gold in 17th century Holland.",
      personalNote: "Elegant, bold, and quietly stunning.",
      color: "#e05a7a"
    },
    {
      id: "daisy",
      name: "Daisy",
      file: "flowers/daisy.html",
      funFact: "A daisy is actually two flowers in one — the centre and the petals.",
      personalNote: "Simple and joyful — the best kind of beautiful.",
      color: "#f9f9c5"
    }
    // 🌱 Add future flowers here — no other file needs to change
  ]
};
```

---

## 5. Pages

### 5.1 index.html — The Garden Gallery

The main landing page. Reads entirely from `config.js`.

**Features:**
- Displays `recipientName` and `welcomeMessage` from config
- Renders all flowers from the `flowers[]` array — no manual HTML per flower
- Layout switcher: visitor can toggle between **Grid**, **Scatter**, and **List** views
- Default layout from `defaultGalleryLayout` in config
- Environment affects background mood (sky colour, ambient particles, lighting)
- Each flower card shows name, colour accent, and responds to hover or tap
- Tapping or clicking a card goes to that flower's page
- Repelling force active on all floating ambient elements

### 5.2 flowers/[name].html — Individual Flower Pages

Each flower gets its own full-screen animated experience.

**Features:**
- Full-screen CSS/JS animation of the flower
- Renders `funFact` and `personalNote` from config — both shown on the page
- Environment applies (background, lighting, ambient effects)
- Visitor can change environment via a simple, visible toggle
- Repelling force active on petals, particles, and the flower itself
- Large clearly labelled "Back to Garden" button — always on screen

### 5.3 flowers/_template.html — New Flower Starter

A blank flower page with all scaffolding ready. To add a new flower:
1. Copy `_template.html` and rename it
2. Build the animation inside it
3. Add one entry to the `flowers[]` array in `config.js`
4. Done — it appears in the gallery automatically

### 5.4 admin.html — Admin Dashboard

Protected page for the creator. Not linked anywhere on the public site.

**Access:** Secret URL (`/admin.html`) + password prompt on load.

**Controls:**
- Edit `recipientName` and `welcomeMessage`
- Set default environment (time of day, weather, season)
- Set default gallery layout
- Edit `funFact` and `personalNote` per flower
- Adjust repulsion `intensity`, `radius`, and `returnSpeed`
- Changes saved to `localStorage` and override `config.js` defaults at runtime

> ⚠️ This is a static site — admin changes live in the browser via localStorage.
> For permanent changes, update `config.js` directly.

---

## 6. Environment System

Affects the visual mood of every page — sky, particles, lighting, colour tone.

| Dimension | Options |
|---|---|
| Time of day | Morning, Sunset, Night |
| Weather | Sunny, Rainy, Foggy |
| Season | Spring, Summer, Autumn, Winter |

- Default set in `config.js`
- Visitor can override via a small toggle on any page
- Preference remembered via `localStorage`
- All three dimensions combine — e.g. "Autumn + Rainy + Night" layers into its own mood

---

## 7. Repelling Force Effect

An interactive physics-like effect active on every page, reacting to cursor or finger movement.

| Property | Detail |
|---|---|
| **Trigger** | Mouse move (desktop) / touch move (mobile) |
| **What's repelled** | Floating petals, ambient particles, and the flower itself |
| **Pages** | Everywhere — gallery and all flower pages |
| **Return** | Elements drift slowly back to original position |
| **Config** | `intensity` (1–100), `radius` (px), `returnSpeed` (seconds) |

- Lives in a shared `interaction.js` included on every page
- On mobile uses `touchmove` — no conflict with taps or scroll
- Low intensity = gentle breeze feel. High intensity = dramatic push.
- Return drift is smooth — not a snap or jump

---

## 8. Mobile-First & Ease of Use

Designed so someone who isn't tech-savvy can use it without any friction.

**Layout:**
- Fully responsive across all screen sizes
- Large, readable text throughout
- Generous tap targets — nothing small or fiddly

**UX rules:**
- No popups or modals that need to be dismissed
- No multi-step interactions — everything is one tap
- Toggles are clearly visible — not buried in menus
- "Back to Garden" always visible on flower pages
- No splash screens or loading gates that block content
- No scroll hijacking

**Touch:**
- Repelling effect uses `touchmove` — works naturally with fingers
- Flower cards respond to tap identically to desktop click
- All gestures feel natural and expected

---

## 9. Password & Security

- A strong random password is generated once at project setup
- Recorded in `PASSWORDS.md` inside the project folder
- `PASSWORDS.md` is in `.gitignore` — never pushed to GitHub
- Password is copied into `config.js` under `adminPassword`
- Admin page prompts for the password on every visit
- The admin URL is not linked anywhere on the public site

**PASSWORDS.md format:**
```
# garden-for-her — Credentials
Generated: [date]

Admin Dashboard Password: Xk9#mP2!qLvR7$nT
Admin URL: https://<your-username>.github.io/garden-for-her/admin.html

⚠️ This file is in .gitignore. Never share or commit it.
```

---

## 10. Vibe & Visual Style

Mood shifts with the active environment:

| Mood | When it applies |
|---|---|
| Soft & romantic | Sunset or night |
| Cheerful & playful | Morning + sunny + spring or summer |
| Calm & peaceful | Foggy or rainy |
| Elegant & minimal | Night + any season |

- Soft pastel colour palette as a base
- Animations are gentle — no harsh or sudden movements
- Warm, human tone in all text — never clinical
- No external dependencies — pure HTML, CSS, JavaScript only

---

## 11. Flowers — Launch Set

| Flower | Status |
|---|---|
| Rose | v1 |
| Sunflower | v1 |
| Cherry Blossom | v1 |
| Lavender | v1 |
| Tulip | v1 |
| Daisy | v1 |
| *(future)* | Add via `config.js` — zero restructuring |

---

## 12. Future Considerations

- More flowers — just add to `config.js` and drop a new HTML file
- Ambient audio per environment (off by default)
- "Favourite" feature — she can bookmark her favourite flower
- Seasonal auto-detection — environment matches real-world date
- Upgrade admin persistence to a lightweight backend if needed

---

## 13. Out of Scope (for now)

- No backend or database
- No user accounts
- No canvas libraries — pure CSS/JS only
- No external APIs

---

*Last updated: April 2026 — v1.2*
