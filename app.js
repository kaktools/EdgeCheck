import { gateways, problems } from './data/gateways.js';

const deviceModuleLoaders = {
  x200: () => import('./data/x200.js'),
  x300: () => import('./data/x300.js'),
  x500: () => import('./data/x500.js'),
};

const moduleCache = {};

const state = {
  gatewayId: null,
  problemId: null,
  runbook: null,
  checks: new Set(),
  loading: false,
  error: '',
};

let loadVersion = 0;

const gatewayList = document.getElementById('gatewayList');
const problemList = document.getElementById('problemList');
const contentArea = document.getElementById('contentArea');
const appGrid = document.getElementById('appGrid');
const gatewayPanel = document.getElementById('gatewayPanel');
const problemPanel = document.getElementById('problemPanel');
const contentPanel = document.getElementById('contentPanel');
const problemHint = document.getElementById('problemHint');
const progressDevice = document.getElementById('progressDevice');
const progressProblem = document.getElementById('progressProblem');
const progressFlow = document.getElementById('progressFlow');
const resetBtn = document.getElementById('resetBtn');
const backBtn = document.getElementById('backBtn');

function makeElement(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function resetRunbookState() {
  state.runbook = null;
  state.checks.clear();
  state.loading = false;
  state.error = '';
}

function updateProgress() {
  progressDevice.classList.add('is-active');
  progressDevice.classList.toggle('is-done', Boolean(state.gatewayId));

  progressProblem.classList.toggle('is-active', Boolean(state.gatewayId && !state.problemId));
  progressProblem.classList.toggle('is-done', Boolean(state.gatewayId && state.problemId));

  progressFlow.classList.toggle('is-active', Boolean(state.gatewayId && state.problemId));
}

function renderGatewayList() {
  gatewayList.innerHTML = '';

  gateways.forEach((gateway) => {
    const button = makeElement('button', `select-card gateway-card${gateway.id === state.gatewayId ? ' is-selected' : ''}`);
    button.type = 'button';
    button.innerHTML = `
      <div class="select-head">
        <div class="device-headline">
          <strong>${gateway.title}</strong>
          <span>${gateway.subtitle}</span>
        </div>
      </div>
      <p class="device-description">${gateway.description}</p>
    `;

    button.addEventListener('click', () => {
      if (state.gatewayId === gateway.id) return;
      state.gatewayId = gateway.id;
      state.problemId = null;
      resetRunbookState();
      renderApp();
    });

    gatewayList.appendChild(button);
  });
}

function renderProblemList() {
  problemList.innerHTML = '';
  const selectedGateway = gateways.find((gateway) => gateway.id === state.gatewayId);

  if (problemHint) {
    problemHint.textContent = selectedGateway
      ? `Ausgewähltes Gerät: ${selectedGateway.title}`
      : 'Wähle zuerst ein Gerät.';
  }

  problems.forEach((problem) => {
    const disabled = !state.gatewayId;
    const button = makeElement('button', `select-card${problem.id === state.problemId ? ' is-selected' : ''}`);
    button.type = 'button';
    button.disabled = disabled;
    button.innerHTML = `
      <div class="select-head">
        <strong>${problem.title}</strong>
      </div>
      <p>${problem.description}</p>
    `;

    button.addEventListener('click', async () => {
      if (!state.gatewayId) return;
      state.problemId = problem.id;
      resetRunbookState();
      state.loading = true;
      renderApp();
      await loadRunbookForSelection();
    });

    problemList.appendChild(button);
  });
}

function buildStepSection(title, items, cssClass) {
  if (!Array.isArray(items) || items.length === 0) return '';

  return `
    <div class="step-block">
      <h4>${title}</h4>
      <ul class="${cssClass}">
        ${items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

function renderWelcome() {
  if (!state.gatewayId) {
    contentArea.innerHTML = `
      <section class="empty-state">
        <h2>Gerät auswählen</h2>
        <p>Wähle zuerst das Gateway links aus.</p>
      </section>
    `;
    return;
  }

  if (!state.problemId) {
    const gateway = gateways.find((entry) => entry.id === state.gatewayId);
    contentArea.innerHTML = `
      <section class="empty-state">
        <h2>Problem auswählen</h2>
        <p>Gerät: <strong>${gateway?.title || state.gatewayId.toUpperCase()}</strong></p>
        <p>Wähle jetzt das konkrete Fehlerbild links aus.</p>
      </section>
    `;
    return;
  }

  contentArea.innerHTML = `
    <section class="empty-state">
      <h2>Keine Diagnose vorhanden</h2>
      <p>Für dieses Fehlerbild ist noch kein Ablauf gepflegt.</p>
    </section>
  `;
}

function renderRunbook() {
  if (!state.runbook) {
    renderWelcome();
    return;
  }

  const runbook = state.runbook;
  const checklistPrefix = `${state.gatewayId}-${state.problemId}`;
  const checkedCount = runbook.checklist.filter((_, index) => state.checks.has(`${checklistPrefix}-${index}`)).length;

  const stepsMarkup = runbook.steps
    .map((step, index) => {
      return `
        <article class="step-card">
          <header>
            <span class="step-index">${index + 1}</span>
            <h3>${step.title}</h3>
          </header>
          ${buildStepSection('Information', step.info, 'list-info')}
          ${buildStepSection('Prüfschritt', step.check, 'list-check')}
          ${buildStepSection('Nächste Handlung', step.action, 'list-action')}
          ${step.warning ? `<p class="alert">${step.warning}</p>` : ''}
          ${step.outcome ? `<p class="outcome">Ziel: ${step.outcome}</p>` : ''}
        </article>
      `;
    })
    .join('');

  const checklistMarkup = runbook.checklist
    .map((item, index) => {
      const id = `${checklistPrefix}-${index}`;
      const checked = state.checks.has(id) ? 'checked' : '';
      const doneClass = state.checks.has(id) ? ' is-done' : '';
      return `
        <label class="check-item${doneClass}">
          <input type="checkbox" data-check-id="${id}" ${checked} />
          <span>${item}</span>
        </label>
      `;
    })
    .join('');

  contentArea.innerHTML = `
    <section class="runbook-header">
      <p class="eyebrow">${state.gatewayId.toUpperCase()} · ${runbook.problemLabel}</p>
      <h2>${runbook.title}</h2>
      <p>${runbook.objective}</p>
    </section>

    <div class="runbook-layout">
      <section class="steps">${stepsMarkup}</section>
      <aside class="checklist-panel">
        <div class="panel-sticky">
          <div class="checklist-head">
            <h3>Checkliste</h3>
            <button id="clearChecksBtnInline" class="btn btn-ghost btn-inline" type="button">Leeren</button>
          </div>
          <p>${checkedCount} / ${runbook.checklist.length} erledigt</p>
          <div class="checklist">${checklistMarkup}</div>
        </div>
      </aside>
    </div>
  `;

  const clearChecksBtnInline = document.getElementById('clearChecksBtnInline');
  if (clearChecksBtnInline) {
    clearChecksBtnInline.addEventListener('click', () => {
      state.checks.clear();
      renderRunbook();
    });
  }

  contentArea.querySelectorAll('input[data-check-id]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const checkId = event.target.getAttribute('data-check-id');
      if (!checkId) return;

      if (event.target.checked) state.checks.add(checkId);
      else state.checks.delete(checkId);

      renderRunbook();
    });
  });
}

function renderStatusCard() {
  if (state.loading) {
    contentArea.innerHTML = `
      <section class="empty-state">
        <h2>Diagnose wird geladen</h2>
        <p>Ablaufdaten werden vorbereitet.</p>
      </section>
    `;
    return true;
  }

  if (state.error) {
    contentArea.innerHTML = `
      <section class="empty-state">
        <h2>Laden fehlgeschlagen</h2>
        <p>${state.error}</p>
      </section>
    `;
    return true;
  }

  return false;
}

function updateActionButtons() {
  backBtn.disabled = !state.gatewayId;
}

function updateStepVisibility() {
  const hasGateway = Boolean(state.gatewayId);
  const hasProblem = Boolean(state.gatewayId && state.problemId);

  gatewayPanel.classList.toggle('is-hidden', hasGateway);
  problemPanel.classList.toggle('is-hidden', !hasGateway || hasProblem);
  contentPanel.classList.toggle('is-hidden', !hasProblem);
  appGrid.classList.toggle('is-runbook-stage', hasProblem);
}

function renderApp() {
  renderGatewayList();
  renderProblemList();
  updateProgress();
  updateStepVisibility();
  updateActionButtons();

  if (renderStatusCard()) return;

  if (state.gatewayId && state.problemId && state.runbook) {
    renderRunbook();
    return;
  }

  renderWelcome();
}

async function loadDeviceModule(gatewayId) {
  if (moduleCache[gatewayId]) return moduleCache[gatewayId];

  const loader = deviceModuleLoaders[gatewayId];
  if (!loader) throw new Error('Kein Modul fuer dieses Geraet gefunden.');

  const module = await loader();
  moduleCache[gatewayId] = module.default;
  return module.default;
}

async function loadRunbookForSelection() {
  if (!state.gatewayId || !state.problemId) {
    state.loading = false;
    state.runbook = null;
    renderApp();
    return;
  }

  const currentVersion = ++loadVersion;

  try {
    const runbooksByProblem = await loadDeviceModule(state.gatewayId);
    if (currentVersion !== loadVersion) return;

    state.runbook = runbooksByProblem[state.problemId] || null;
    state.error = '';
  } catch (error) {
    if (currentVersion !== loadVersion) return;
    state.runbook = null;
    state.error = error instanceof Error ? error.message : 'Unbekannter Ladefehler';
  } finally {
    if (currentVersion !== loadVersion) return;
    state.loading = false;
    renderApp();
  }
}

resetBtn.addEventListener('click', () => {
  state.gatewayId = null;
  state.problemId = null;
  resetRunbookState();
  renderApp();
});

backBtn.addEventListener('click', () => {
  if (state.problemId) {
    state.problemId = null;
    resetRunbookState();
    renderApp();
    return;
  }

  if (state.gatewayId) {
    state.gatewayId = null;
    resetRunbookState();
    renderApp();
  }
});

renderApp();