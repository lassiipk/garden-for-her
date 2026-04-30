// config.js — edit this file to personalise the site
const GARDEN_CONFIG = {

  // Personal
  recipientName: "Sara",
  siteTitle: "A Garden For You 🌸",
  welcomeMessage: "Every flower here was picked just for you.",

  // Gallery default layout: "grid" | "scatter" | "list"
  defaultGalleryLayout: "grid",

  // Environment defaults
  environment: {
    timeOfDay: "morning",   // "morning" | "sunset" | "night"
    weather: "sunny",       // "sunny" | "rainy" | "foggy"
    season: "spring",       // "spring" | "summer" | "autumn" | "winter"
  },

  // Repelling force effect
  repulsion: {
    enabled: true,
    intensity: 80,        // 1–100
    radius: 120,          // px
    returnSpeed: 1.5,     // seconds
  },

  // Admin password — copy from PASSWORDS.md
  adminPassword: SAIM,

  // Flowers registry
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
    // 🌱 Add future flowers here
  ]
};

// Runtime overrides from localStorage (admin changes)
(function applyAdminOverrides() {
  try {
    const overrides = localStorage.getItem('garden_admin_overrides');
    if (overrides) {
      const o = JSON.parse(overrides);
      if (o.recipientName) GARDEN_CONFIG.recipientName = o.recipientName;
      if (o.welcomeMessage) GARDEN_CONFIG.welcomeMessage = o.welcomeMessage;
      if (o.defaultGalleryLayout) GARDEN_CONFIG.defaultGalleryLayout = o.defaultGalleryLayout;
      if (o.environment) Object.assign(GARDEN_CONFIG.environment, o.environment);
      if (o.repulsion) Object.assign(GARDEN_CONFIG.repulsion, o.repulsion);
      if (o.flowers) {
        o.flowers.forEach(of => {
          const f = GARDEN_CONFIG.flowers.find(f => f.id === of.id);
          if (f) {
            if (of.funFact) f.funFact = of.funFact;
            if (of.personalNote) f.personalNote = of.personalNote;
          }
        });
      }
    }
    // Also apply visitor env preference
    const envPref = localStorage.getItem('garden_env');
    if (envPref) Object.assign(GARDEN_CONFIG.environment, JSON.parse(envPref));
  } catch(e) {}
})();
