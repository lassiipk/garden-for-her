// flower-base.js — helpers shared by every flower page
function getFlowerConfig(id) {
  return GARDEN_CONFIG.flowers.find(f => f.id === id) || {};
}

function renderFlowerMeta(id) {
  const f = getFlowerConfig(id);
  const nameEl = document.getElementById('flower-name');
  const factEl = document.getElementById('fun-fact');
  const noteEl = document.getElementById('personal-note');
  if (nameEl) nameEl.textContent = f.name || '';
  if (factEl) factEl.textContent = f.funFact || '';
  if (noteEl) noteEl.textContent = f.personalNote || '';
  document.title = (f.name || 'Flower') + ' — ' + GARDEN_CONFIG.siteTitle;
}

function applyEnvironmentToPage() {
  const env = GARDEN_CONFIG.environment;
  const body = document.body;
  ['morning','sunset','night','sunny','rainy','foggy','spring','summer','autumn','winter']
    .forEach(c => body.classList.remove('env-' + c));
  body.classList.add('env-' + env.timeOfDay, 'env-' + env.weather, 'env-' + env.season);

  // Update selects if present
  ['env-time','env-weather','env-season'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === 'env-time') el.value = env.timeOfDay;
    if (id === 'env-weather') el.value = env.weather;
    if (id === 'env-season') el.value = env.season;
  });
}

function initEnvToggle() {
  const env = GARDEN_CONFIG.environment;
  applyEnvironmentToPage();

  document.getElementById('env-time')?.addEventListener('change', e => {
    env.timeOfDay = e.target.value;
    localStorage.setItem('garden_env', JSON.stringify(env));
    applyEnvironmentToPage();
  });
  document.getElementById('env-weather')?.addEventListener('change', e => {
    env.weather = e.target.value;
    localStorage.setItem('garden_env', JSON.stringify(env));
    applyEnvironmentToPage();
  });
  document.getElementById('env-season')?.addEventListener('change', e => {
    env.season = e.target.value;
    localStorage.setItem('garden_env', JSON.stringify(env));
    applyEnvironmentToPage();
  });
}
