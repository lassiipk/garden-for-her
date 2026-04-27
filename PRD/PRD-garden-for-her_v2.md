# 📄 PRD v2 — garden-for-her

> Builds on v1. Fixes mobile viewport, repairs repelling effect, adds flower fields,
> a co-op garden, a bouquet page, and hardens the git security setup.

---

## 1. What Changed From v1

| Area | v1 | v2 |
|---|---|---|
| Mobile viewport | Body scrolls/shifts freely — breaks layout | Locked width, no horizontal shift. Vertical scroll allowed only where needed |
| Repelling effect | Broken on desktop, causes page shift on mobile | Fixed — works on both. Viewport lock prevents mobile shift |
| Flower pages | Single flower centered on screen | Flower + full field of same type behind it |
| Garden page | Gallery of cards only | + Standalone co-op garden with all flowers together |
| Bouquet | Not present | New page + gallery view. 4 modes: all, curated, random, visitor choice |
| .gitignore | Missing leading dot — file not recognised by Git | Fixed. `PASSWORDS.md` and `generate-password.js` confirmed gitignored. README warning added |

---

## 2. Project Identity

| Field | Value |
|---|---|
| **Repo name** | `garden-for-her` |
| **Deploy URL** | `https://<your-username>.github.io/garden-for-her` |
| **Tech stack** | HTML, CSS, JavaScript — no frameworks, no build tools |
| **Hosting** | GitHub Pages |

---

## 3. File Structure (v2)

```
garden-for-her/
├── v1/                         ← archived v1 files (untouched)
├── index.html                  ← Gallery / main navigation page
├── garden.html                 ← 🆕 Co-op garden — all flowers together
├── bouquet.html                ← 🆕 Bouquet page — all 4 bouquet modes
├── admin.html                  ← Admin dashboard (password protected)
├── style.css                   ← Shared base styles (updated)
├── config.js                   ← ⚙️ Central config (updated)
├── interaction.js              ← Repelling force effect (fixed)
├── .gitignore                  ← Fixed — dot prefix confirmed
├── PASSWORDS.md                ← 🔑 Gitignored — never committed
├── generate-password.js        ← Gitignored — never committed
├── README.md                   ← Updated with git security warning
├── flowers/
│   ├── rose.html               ← Updated — field of roses behind flower
│   ├── sunflower.html          ← Updated — field of sunflowers behind flower
│   ├── cherry-blossom.html     ← Updated — field behind flower
│   ├── lavender.html           ← Updated — field behind flower
│   ├── tulip.html              ← Updated — field behind flower
│   ├── daisy.html              ← Updated — field behind flower
│   └── _template.html          ← Updated — field scaffold included
└── assets/
    ├── fonts/
    ├── images/
    ├── icons/
    └── sounds/
```

---

## 4. Bug Fixes

### 4.1 Mobile Viewport Lock

**Problem:** On mobile, the page body shifts horizontally and vertically during
repelling interactions, causing the screen to feel unstable and broken.

**Fix:**
```css
html, body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;          /* never shift horizontally */
  position: relative;
}
```
- Applied globally in `style.css`
- Flower pages: `overflow: hidden` on body (full-screen, no scroll needed)
- Gallery page: vertical scroll allowed (`overflow-y: auto`) for long flower lists
- `touch-action: pan-y` set on interactive elements to allow natural vertical swipe only
- `overscroll-behavior: none` prevents rubber-band bounce that feels broken

### 4.2 Repelling Effect Fix

**Problem:** Repelling effect uses `getBoundingClientRect()` origin positions set at
`init()` time. On desktop, mouse coordinates were offset. On mobile, repelling
force was pushing `position: fixed` elements causing the viewport itself to shift.

**Fix in `interaction.js`:**
- Recalculate element origins relative to the fixed viewport, not the document
- Remove `window.scrollX/Y` offset — not needed for `position: fixed` elements
- Use `pointer-events: none` on all repel targets to prevent touch conflicts
- Throttle the `mousemove`/`touchmove` handler with `requestAnimationFrame`
- Re-init origins on `resize` and `orientationchange`

### 4.3 .gitignore Fix

**Problem:** `.gitignore` was saved or displayed without the leading dot, causing
Git to ignore the file entirely. `PASSWORDS.md` and `generate-password.js` were
committed to the public repo.

**Fix:**
- Confirm filename is exactly `.gitignore` (dot prefix, no extension)
- Entries confirmed:
  ```
  PASSWORDS.md
  generate-password.js
  .DS_Store
  Thumbs.db
  ```
- README updated with a prominent warning section (see Section 9)
- `generate-password.js` moved to a `scripts/` subfolder to keep root clean

---

## 5. Flower Fields

Every individual flower page now has a field of flowers filling the background,
making the repelling effect feel natural — you're walking through a garden, not
poking a single flower floating in space.

### 5.1 Per-flower field (same type)
- Each flower page renders 12–20 small instances of its own flower in the background
- Instances are positioned across the lower portion of the screen in a natural spread
- They sway gently in the ambient animation
- They all respond to the repelling effect — moving away from cursor/finger and
  drifting back slowly
- Density and spread configurable per flower in `config.js`

### 5.2 Field rendering
- Fields are generated by JavaScript from a single flower SVG definition
- No extra HTML files needed — each flower page builds its own field
- Field instances use `repel-soft` class — gentler push than the main flower
- On mobile, field density is reduced automatically (fewer elements = better performance)

---

## 6. Co-op Garden Page (`garden.html`)

A new standalone page where all flowers grow together in one shared field.
Acts as a living garden — the more flowers added to `config.js`, the fuller it becomes.

**Features:**
- All registered flowers from `config.js` appear as animated instances in one scene
- Layout is a natural-looking field — flowers clustered at the bottom, scattered naturally
- Each flower type appears in a small cluster (3–5 instances)
- Full repelling effect — all elements respond to cursor/touch
- Environment toggle (same as all other pages)
- Clicking any flower navigates to its dedicated page
- "Back to gallery" button always visible
- Auto-populates — adding a new flower to `config.js` adds it to the garden automatically

**Config options (in `config.js`):**
```js
garden: {
  enabled: true,
  clusterSize: 4,       // how many of each flower per cluster
  showLabels: true,     // show flower name on hover/tap
},
```

---

## 7. Bouquet (`bouquet.html` + gallery view)

A bouquet is a curated arrangement of multiple flowers presented together as a
single animated composition.

### 7.1 Where it lives
- `bouquet.html` — dedicated full-screen page
- Gallery (`index.html`) — 4th layout option alongside grid/scatter/list

### 7.2 Four bouquet modes

| Mode | Description |
|---|---|
| **All** | Every flower in `config.js` arranged as a bouquet |
| **Curated** | Creator picks which flowers appear, set in `config.js` |
| **Random** | A different random selection on each visit |
| **Her choice** | Visitor sees a picker and selects which flowers to include |

All four modes available on `bouquet.html`. Mode switcher is a simple visible
toggle — large buttons, no menus, no multi-step interaction.

Default mode set in `config.js`:
```js
bouquet: {
  defaultMode: "curated",       // "all" | "curated" | "random" | "choice"
  curatedFlowers: ["rose", "cherry-blossom", "lavender", "tulip"],
  randomCount: 4,               // how many flowers in random mode
},
```

### 7.3 Bouquet animation
- Flowers are arranged in a classic bouquet formation — stems converging at the
  bottom, blooms fanning out at the top
- Each flower sways independently
- Repelling effect applies — flowers in the bouquet push away from cursor/touch
  and drift back
- Wrapped with a ribbon at the base (CSS only)
- Environment applies here too

### 7.4 Gallery bouquet view
- When bouquet layout is selected in `index.html`, the gallery cards rearrange
  into a bouquet-style fan layout instead of grid/scatter/list

---

## 8. config.js Updates (v2)

New sections added. All existing v1 config remains unchanged.

```js
// ── Garden page ──
garden: {
  enabled:     true,
  clusterSize: 4,
  showLabels:  true,
},

// ── Bouquet ──
bouquet: {
  defaultMode:     "curated",    // "all" | "curated" | "random" | "choice"
  curatedFlowers:  ["rose", "cherry-blossom", "lavender", "tulip"],
  randomCount:     4,
},

// ── Field settings per flower (optional override) ──
// By default all flowers get a field. Set fieldSize to 0 to disable.
// fieldSize: number of background instances
// Each flower entry in flowers[] can now include:
// fieldSize: 15   (optional, defaults to 15)
```

---

## 9. Git Security (README Warning)

The following section will be added prominently to `README.md`:

```
⚠️ BEFORE YOUR FIRST COMMIT — READ THIS

1. Make sure your .gitignore file starts with a dot: .gitignore
   (not gitignore, not .gitignore.txt)

2. Verify Git is respecting it:
   git status
   PASSWORDS.md and generate-password.js should NOT appear in the list.

3. If they were already committed by mistake, remove them:
   git rm --cached PASSWORDS.md
   git rm --cached scripts/generate-password.js
   git commit -m "remove sensitive files from tracking"

4. Change your admin password immediately if it was exposed:
   node scripts/generate-password.js
   Copy the new password into config.js → adminPassword
```

---

## 10. Mobile-First & Ease of Use (Updated)

All v1 rules remain. Additions for v2:

- `overflow-x: hidden` on `html` and `body` — no horizontal shift ever
- `overscroll-behavior: none` — no rubber-band bounce
- `touch-action: pan-y` on repel elements — vertical swipe works, horizontal does not trigger repel
- Repel effect recalculates correctly after `orientationchange`
- Field density halved automatically on screens under 480px width
- Bouquet picker (her choice mode) uses large tap targets — one tap per flower to toggle

---

## 11. Flowers — v2 Status

| Flower | Field | Garden | Status |
|---|---|---|---|
| Rose | ✅ | ✅ | Updated |
| Sunflower | ✅ | ✅ | Updated |
| Cherry Blossom | ✅ | ✅ | Updated |
| Lavender | ✅ | ✅ | Updated |
| Tulip | ✅ | ✅ | Updated |
| Daisy | ✅ | ✅ | Updated |
| *(future)* | Auto | Auto | Add via config |

---

## 12. Future Considerations (carried from v1, updated)

- Ambient audio per environment (off by default) — `assets/sounds/` ready
- Seasonal auto-detection — environment matches real-world date
- "Favourite" flower — she can bookmark her favourite
- Upgrade admin persistence to lightweight backend if needed
- Peony, Lotus, and more — just add to `config.js`

---

## 13. Out of Scope (v2)

- No backend or database
- No user accounts
- No canvas libraries — pure CSS/JS only
- No external APIs

---

*Last updated: April 2026 — v2.0 draft*
