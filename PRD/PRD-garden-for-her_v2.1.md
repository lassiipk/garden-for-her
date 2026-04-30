# 📄 PRD v2.1 — garden-for-her

> Overhaul of v2. Removes password system, clarifies admin access model,
> fixes repelling behaviour on main flower, and fully specifies the bouquet
> and co-op garden pages to implementation-ready detail.

---

## 1. What Changed From v2

| Area | v2 | v2.1 |
|---|---|---|
| Admin access | Password prompt on load — password stored in `config.js` (public file) | No password. Hidden by URL only. Not linked anywhere on the public site |
| Admin security framing | Treated as real security | Accurately documented as obscurity-only |
| Repelling — main flower | Applied at full intensity (same as field) | Subtle repel only (`repelMode: "soft"`). Field repels at full intensity |
| Bouquet spec | One-line description — not buildable | Full layout algorithm, positioning logic, mobile behaviour |
| Co-op garden spec | Vague — "natural-looking," "clustered naturally" | Full scatter algorithm, cluster logic, mobile density rules |
| `assets/sounds/` | Listed as "ready" but audio is out of scope | Removed from file structure. Added back only when audio is in scope |
| `config.js` — admin section | `adminPassword` field | Removed entirely |

---

## 2. Project Identity

| Field | Value |
|---|---|
| **Repo name** | `garden-for-her` |
| **Deploy URL** | `https://<your-username>.github.io/garden-for-her` |
| **Tech stack** | HTML, CSS, JavaScript — no frameworks, no build tools |
| **Hosting** | GitHub Pages |

---

## 3. File Structure (v2.1)

```
garden-for-her/
├── v1/                         ← archived v1 files (untouched)
├── index.html                  ← Gallery / main navigation page
├── garden.html                 ← Co-op garden — all flowers together
├── bouquet.html                ← Bouquet page — all 4 bouquet modes
├── admin.html                  ← Admin dashboard — no password, hidden by URL
├── style.css                   ← Shared base styles
├── config.js                   ← Central config (adminPassword removed)
├── interaction.js              ← Repelling force effect (fixed)
├── .gitignore                  ← Dot prefix confirmed
├── PASSWORDS.md                ← Removed — no longer needed
├── scripts/
│   └── generate-password.js   ← Removed — no longer needed
├── README.md                   ← Git security warning updated for v2.1
├── flowers/
│   ├── rose.html
│   ├── sunflower.html
│   ├── cherry-blossom.html
│   ├── lavender.html
│   ├── tulip.html
│   ├── daisy.html
│   └── _template.html
└── assets/
    ├── fonts/
    ├── images/
    └── icons/
```

> 🔒 `admin.html` is not linked anywhere on the public site. Access is by direct
> URL only. This is obscurity, not security — anyone who finds the URL can use it.
> Acceptable because the admin panel only writes to `localStorage`, not to the
> source files. The site resets to `config.js` defaults in any new browser session.

---

## 4. config.js — Central Configuration (v2.1)

`adminPassword` removed. All other v1/v2 config unchanged.

```js
const GARDEN_CONFIG = {

  // Personal
  recipientName: "Sara",
  siteTitle: "A Garden For You 🌸",
  welcomeMessage: "Every flower here was picked just for you.",

  // Gallery default layout: "grid" | "scatter" | "list" | "bouquet"
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
    intensity: 80,                     // 1–100. Applies to field elements.
    radius: 120,                       // px — proximity threshold
    returnSpeed: 1.5,                  // seconds — drift-back duration
    mainFlowerIntensity: 20,           // 1–100. Separate intensity for main flower only.
  },

  // Garden page
  garden: {
    enabled: true,
    clusterSize: 4,                    // instances of each flower per cluster
    showLabels: true,                  // show flower name on hover/tap
  },

  // Bouquet
  bouquet: {
    defaultMode: "curated",            // "all" | "curated" | "random" | "choice"
    curatedFlowers: ["rose", "cherry-blossom", "lavender", "tulip"],
    randomCount: 4,
  },

  // Flowers
  flowers: [
    {
      id: "rose",
      name: "Rose",
      file: "flowers/rose.html",
      funFact: "Roses have been symbols of love for over 5,000 years.",
      personalNote: "Just like you — classic, beautiful, and full of depth.",
      color: "#e8a0b0",
      fieldSize: 15                    // background instances on flower page
    },
    {
      id: "sunflower",
      name: "Sunflower",
      file: "flowers/sunflower.html",
      funFact: "Sunflowers always face the sun — a behaviour called heliotropism.",
      personalNote: "You brighten every room you walk into.",
      color: "#f5c842",
      fieldSize: 15
    },
    {
      id: "cherry-blossom",
      name: "Cherry Blossom",
      file: "flowers/cherry-blossom.html",
      funFact: "In Japan, cherry blossoms represent the beauty of fleeting moments.",
      personalNote: "Some things are precious because they don't last forever.",
      color: "#f2b5c8",
      fieldSize: 15
    },
    {
      id: "lavender",
      name: "Lavender",
      file: "flowers/lavender.html",
      funFact: "Lavender has been used for over 2,500 years to calm and heal.",
      personalNote: "You have that rare gift of making people feel at ease.",
      color: "#b89fd4",
      fieldSize: 15
    },
    {
      id: "tulip",
      name: "Tulip",
      file: "flowers/tulip.html",
      funFact: "Tulips were once more valuable than gold in 17th century Holland.",
      personalNote: "Elegant, bold, and quietly stunning.",
      color: "#e05a7a",
      fieldSize: 15
    },
    {
      id: "daisy",
      name: "Daisy",
      file: "flowers/daisy.html",
      funFact: "A daisy is actually two flowers in one — the centre and the petals.",
      personalNote: "Simple and joyful — the best kind of beautiful.",
      color: "#f9f9c5",
      fieldSize: 15
    }
  ]
};
```

---

## 5. Bug Fixes (carried from v2, unchanged)

### 5.1 Mobile Viewport Lock

```css
html, body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
}
```

- Flower pages: `overflow: hidden` on body
- Gallery page: `overflow-y: auto`
- `touch-action: pan-y` on interactive elements
- `overscroll-behavior: none` on body

### 5.2 Repelling Effect Fix

- Recalculate element origins relative to fixed viewport, not document
- Remove `window.scrollX/Y` offset from coordinate math
- `pointer-events: none` on all repel targets
- Throttle handler with `requestAnimationFrame`
- Re-init on `resize` and `orientationchange`

### 5.3 .gitignore Fix

Filename confirmed as `.gitignore` with dot prefix. Entries:

```
PASSWORDS.md
.DS_Store
Thumbs.db
```

`generate-password.js` removed from project entirely — no longer needed.

---

## 6. Repelling Effect — Revised Behaviour

### 6.1 Two repel classes

| Class | Applied to | Intensity source |
|---|---|---|
| `repel-full` | Field instances, ambient particles | `repulsion.intensity` from config |
| `repel-soft` | Main flower only | `repulsion.mainFlowerIntensity` from config |

### 6.2 Main flower behaviour

- Default `mainFlowerIntensity`: 20 (out of 100)
- Displacement is capped at **30px** in any direction regardless of intensity setting
- Return speed is the same as field elements (`returnSpeed` from config)
- Effect feels like the flower sways slightly when you approach — not that it runs away
- On mobile: `mainFlowerIntensity` is halved automatically (cap becomes 15px)

### 6.3 Field element behaviour

- Full `repulsion.intensity` applies
- No displacement cap — elements can move freely within viewport bounds
- Elements that would be pushed off-screen are clamped to a 10px inset boundary

### 6.4 Implementation in `interaction.js`

- `initRepel(selector, mode)` — `mode` is `"full"` or `"soft"`
- Each flower page calls:
  - `initRepel('.field-instance', 'full')`
  - `initRepel('.main-flower', 'soft')`
- Gallery page calls:
  - `initRepel('.ambient-particle', 'full')`

---

## 7. Admin Page (v2.1)

### 7.1 Access model

- Direct URL: `/admin.html`
- No password prompt
- Not linked anywhere on the public site — not in nav, not in footer, not in source comments
- Accurately documented in the README as obscurity-only access

### 7.2 What it can do

All controls write to `localStorage` and override `config.js` defaults at runtime.
Clearing browser storage resets to `config.js` defaults.

**Controls:**
- Edit `recipientName` and `welcomeMessage`
- Set default environment (time of day, weather, season)
- Set default gallery layout
- Edit `funFact` and `personalNote` per flower
- Adjust `intensity`, `radius`, `returnSpeed`, and `mainFlowerIntensity`
- Set bouquet default mode and curated flower selection
- Toggle garden page on/off

### 7.3 What it cannot do

- It cannot edit `config.js` — this is a static site
- Changes do not persist across devices or browsers
- Changes made here affect only the browser session where they were made

> ⚠️ For permanent changes that affect all visitors, edit `config.js` directly.

---

## 8. Flower Fields (carried from v2, unchanged)

- Each flower page renders `fieldSize` background instances of its own flower
- Instances positioned across the lower 60% of the viewport
- Instances use `repel-full` class
- Field density halved automatically on screens under 480px
- Generated by JS from a single SVG definition per flower — no extra HTML files

---

## 9. Co-op Garden Page (`garden.html`) — Full Spec

### 9.1 Purpose

All registered flowers grow together in one scene. Auto-populates from `config.js`.

### 9.2 Layout algorithm

**Canvas:** Full viewport. No scroll. `overflow: hidden`.

**Zone split:**
- Bottom 35% of viewport height = planting zone
- Top 65% = sky / environment zone (no flowers placed here)

**Cluster placement:**

For each flower in `config.js`:

1. Assign a horizontal anchor point using deterministic spacing:
   ```
   anchorX = (flowerIndex / totalFlowers) * viewportWidth
            + (viewportWidth / totalFlowers / 2)
   ```
   This distributes anchors evenly across the width, one per flower type.

2. Place `clusterSize` instances around the anchor:
   - Each instance offset from anchor by a seeded random value:
     - `offsetX`: ±`(viewportWidth / totalFlowers / 3)` px
     - `offsetY`: random within the planting zone, biased toward the bottom
       (weighted so 70% of instances land in the bottom 15% of viewport)
   - Seed is derived from `flower.id` — same layout on every visit, not random

3. Instance sizing:
   - Base size: `clamp(40px, 6vw, 80px)`
   - Each instance within a cluster has a random scale variation of ±15%
   - Instances closer to the bottom are slightly larger (depth illusion)

**Overlap handling:**
- No collision detection — natural overlap is intentional and expected
- z-index is set by Y position: lower on screen = higher z-index (foreground)

### 9.3 Mobile layout (≤480px)

- `clusterSize` is halved (minimum 2)
- Anchor spacing recalculated for narrower viewport
- Instance size base reduced: `clamp(30px, 8vw, 55px)`

### 9.4 Interaction

- All instances use `repel-full` class
- Clicking/tapping any instance navigates to that flower's dedicated page
- `showLabels: true` → flower name appears on hover (desktop) or tap (mobile)
  - Label is a small pill tag, positioned above the tapped instance
  - Disappears after 2 seconds or on next tap
- "Back to gallery" button fixed top-left, always visible

### 9.5 Edge cases

| Condition | Behaviour |
|---|---|
| 1 flower in config | Single cluster centered horizontally |
| 10+ flowers in config | Anchor spacing compresses. Min anchor gap: 60px. Instances scale down further. |
| Very narrow viewport (<320px) | clusterSize forced to 2, instance size floored at 28px |

---

## 10. Bouquet Page (`bouquet.html`) — Full Spec

### 10.1 Purpose

A curated arrangement of multiple flowers presented as a single animated composition.

### 10.2 Layout algorithm — bouquet formation

**Canvas:** Full viewport. `overflow: hidden`. No scroll.

**Anchor point:** Bouquet base is fixed at `(50% viewport width, 85% viewport height)`.

**Stem layout:**

For N flowers in the bouquet:

1. Stems radiate upward from the base anchor in a fan.
2. Fan angle range: −40° to +40° (total 80° spread). 0° = straight up.
3. Each stem's angle:
   ```
   angle[i] = -40 + (i / (N - 1)) * 80        // degrees, for N > 1
   angle[0] = 0                                 // for N = 1
   ```
4. Stem length: `clamp(120px, 25vh, 220px)` — same for all stems.
5. Stem is a `<div>` rotated via `transform: rotate(angle)` from the base anchor.
   `transform-origin: bottom center`.

**Bloom placement:**

- Each bloom sits at the top end of its stem.
- Bloom size: `clamp(50px, 8vw, 90px)`.
- Blooms on outer stems (leftmost, rightmost) are slightly smaller: scale 0.85×.
- Blooms on inner stems are slightly larger: scale 1.0×.
- This creates a natural dome shape.

**Ribbon:**

- Pure CSS ribbon rendered at the base anchor point.
- Ribbon height: 40px. Width: `clamp(60px, 12vw, 100px)`.
- Colour: soft neutral (`#d4a8b0`) — does not conflict with flower colours.
- Ribbon is decorative only — not interactive.

**Animation:**

- Each stem sways independently on a sine wave:
  ```
  swayAngle = baseAngle + sin(time * frequency + phaseOffset) * amplitude
  ```
  - `frequency`: 0.4–0.7 Hz (slow sway)
  - `amplitude`: 2–4° (subtle)
  - `phaseOffset`: unique per stem, derived from stem index — prevents synchronised lockstep sway
- Blooms inherit stem sway and add a small secondary sway (amplitude: 1–2°, frequency offset +0.1 Hz)

### 10.3 Repelling effect in bouquet

- Stems and blooms use `repel-soft` — same cap as main flower (30px max displacement)
- Ribbon uses `repel-full` — it shifts more dramatically than the flowers
- After repel, all elements return to their calculated positions (not to origin — to their
  current sway position at the moment of return)

### 10.4 Four bouquet modes

| Mode | Flower selection | Re-renders on revisit? |
|---|---|---|
| **All** | Every flower in `config.js` | No — deterministic |
| **Curated** | `curatedFlowers` array from config | No — deterministic |
| **Random** | `randomCount` flowers, seeded from current date (YYYY-MM-DD) | Yes — new selection each day |
| **Her choice** | Visitor toggles flowers in/out via a picker | Yes — updates live as she picks |

**Her choice picker:**
- Displayed above the bouquet as a row of flower name pills
- Each pill is a large tap target (min 44×44px)
- Active flowers have a filled background using `flower.color` from config
- Inactive flowers have an outline style
- Bouquet re-renders immediately on each toggle — no confirm step
- Minimum 1 flower must remain selected — last active flower cannot be deactivated
- Selection saved to `localStorage` — remembered on next visit

**Mode switcher:**
- Four large clearly labelled buttons at the top of the page
- One always active (highlighted)
- Switching mode re-renders the bouquet immediately

### 10.5 Mobile layout (≤480px)

- Fan angle range compressed: −30° to +30° (60° total) — prevents blooms from hitting screen edges
- Stem length reduced: `clamp(90px, 20vh, 160px)`
- Bloom size reduced: `clamp(38px, 9vw, 65px)`
- Picker pills wrap to two rows if needed — no horizontal scroll

### 10.6 Edge cases

| Condition | Behaviour |
|---|---|
| 1 flower selected | Single centered stem, no fan. Bloom centered. Ribbon still shown. |
| 8+ flowers | Fan angle range expands to ±50° max. Stem length reduced by 15%. Bloom size reduced by 20%. Beyond 8, blooms start to overlap — intentional. |
| Very narrow viewport (<320px) | Fan compressed to ±25°. Stem length floored at 80px. Bloom size floored at 32px. |

### 10.7 Gallery bouquet view (`index.html`)

When "bouquet" is selected as the gallery layout:

- Flower cards rearrange into a fan layout mirroring the bouquet formation
- Cards replace blooms — same angle and spacing logic as Section 10.2
- Cards are not to scale — each card is uniform size
- Clicking a card navigates to that flower's page (same as grid/scatter/list)
- This is a visual layout only — not a full bouquet animation

---

## 11. Git Security (README — v2.1 update)

Password references removed. Updated README warning:

```
⚠️ BEFORE YOUR FIRST COMMIT — READ THIS

1. Confirm your .gitignore file starts with a dot: .gitignore
   Run: ls -la | grep gitignore
   It must appear as .gitignore — not gitignore or gitignore.txt

2. Verify Git is respecting it:
   git status
   PASSWORDS.md must NOT appear in the list.
   If it does, your .gitignore is not working.

3. If PASSWORDS.md was already committed by mistake:
   git rm --cached PASSWORDS.md
   git commit -m "remove sensitive file from tracking"

4. admin.html has no password in v2.1.
   Anyone who finds the URL can access it.
   Do not share the admin URL.
   Admin changes only affect localStorage in that browser — they do not
   modify config.js or affect other visitors.
```

---

## 12. Mobile-First & Ease of Use

All v1 and v2 rules apply. v2.1 additions:

- `mainFlowerIntensity` halved automatically on screens ≤480px
- Garden and bouquet pages have fully specified mobile layouts (Sections 9.3, 10.5)
- Bouquet picker uses minimum 44×44px tap targets throughout
- No horizontal scroll on any page under any condition

---

## 13. Flowers — v2.1 Status

| Flower | Field | Garden | Bouquet | Status |
|---|---|---|---|---|
| Rose | ✅ | ✅ | ✅ | Updated |
| Sunflower | ✅ | ✅ | ✅ | Updated |
| Cherry Blossom | ✅ | ✅ | ✅ | Updated |
| Lavender | ✅ | ✅ | ✅ | Updated |
| Tulip | ✅ | ✅ | ✅ | Updated |
| Daisy | ✅ | ✅ | ✅ | Updated |
| *(future)* | Auto | Auto | Auto | Add via config |

---

## 14. Out of Scope (v2.1)

- No backend or database
- No user accounts
- No canvas libraries — pure CSS/JS only
- No external APIs
- No ambient audio (folder removed until audio is in scope)

---

## 15. Future Considerations

- Ambient audio per environment — `assets/sounds/` added back when ready
- Seasonal auto-detection — environment matches real-world date
- "Favourite" flower — remembered via localStorage
- Peony, Lotus, Orchid — add via `config.js`

---

*Last updated: April 2026 — v2.1*
