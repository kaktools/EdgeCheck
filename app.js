import { gateways, problems } from './data/gateways.js';
import x200 from './data/x200.js';
import x300 from './data/x300.js';
import x500 from './data/x500.js';

const runbooks = { x200, x300, x500 };

const state = {
  gatewayId: null,
  problemId: null,
  checks: new Set(),
};

const gatewayList = document.getElementById('gatewayList');
const problemList = document.getElementById('problemList');
const contentArea = document.getElementById('contentArea');
const progressDevice = document.getElementById('progressDevice');
const progressProblem = document.getElementById('progressProblem');
const progressFlow = document.getElementById('progressFlow');
const resetBtn = document.getElementById('resetBtn');
const backBtn = document.getElementById('backBtn');
const clearChecksBtn = document.getElementById('clearChecksBtn');

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (typeof text === 'string') element.textContent = text;
  return element;
}

function setProgress() {
  progressDevice.classList.add('is-active');
  progressProblem.classList.toggle('is-active', Boolean(state.gatewayId));
  progressFlow.classList.toggle('is-active', Boolean(state.gatewayId && state.problemId));
}

function renderGatewayList() {
  gatewayList.innerHTML = '';

  gateways.forEach((gateway) => {
    const button = makeElement('button', `select-card${state.gatewayId === gateway.id ? ' is-selected' : ''}`);
    button.type = 'button';
    button.innerHTML = `
      <div class="select-head">
        <strong>${gateway.title}</strong>
        <span>${gateway.state}</span>
      </div>
      <p>${gateway.description}</p>
    `;

    button.addEventListener('click', () => {
      state.gatewayId = gateway.id;
      state.problemId = null;
      state.checks.clear();
      renderApp();
    });

    gatewayList.appendChild(button);
  });
}

function renderProblemList() {
  problemList.innerHTML = '';

  problems.forEach((problem) => {
    const isDisabled = !state.gatewayId;
    const button = makeElement('button', `select-card${state.problemId === problem.id ? ' is-selected' : ''}`);
    button.type = 'button';
    button.disabled = isDisabled;
    button.innerHTML = `
      <div class="select-head">
        <strong>${problem.title}</strong>
      </div>
      <p>${problem.description}</p>
    `;

    button.addEventListener('click', () => {
      if (!state.gatewayId) return;
      state.problemId = problem.id;
      state.checks.clear();
      renderApp();
    });

    problemList.appendChild(button);
  });
}

function renderStartView() {
  const selectedGateway = gateways.find((item) => item.id === state.gatewayId);

  contentArea.innerHTML = `
    <div class="empty-state">
      <h2>Fehlerdiagnose starten</h2>
      <p>1) Gateway wählen, 2) Problem wählen, 3) Schritte nacheinander abarbeiten.</p>
      ${selectedGateway ? `<p><strong>Ausgewähltes Gerät:</strong> ${selectedGateway.title}</p>` : ''}
    </div>
  `;
}

function buildStepList(title, items, kind) {
  if (!items || items.length === 0) return '';

  return `
    <div class="step-block">
      <h4>${title}</h4>
      <ul class="${kind}">
        ${items.map((entry) => `<li>${entry}</li>`).join('')}
      </ul>
    </div>
  `;
}

function renderRunbook() {
  const runbook = runbooks[state.gatewayId]?.[state.problemId];

  if (!runbook) {
    renderStartView();
    return;
  }

  const checklistIdPrefix = `${state.gatewayId}-${state.problemId}`;
  const checkedCount = runbook.checklist.filter((_, index) => state.checks.has(`${checklistIdPrefix}-${index}`)).length;

  const stepsHtml = runbook.steps
    .map(
      (step, index) => `
        <article class="step-card">
          <header>
            <span class="step-index">${index + 1}</span>
            <h3>${step.title}</h3>
          </header>
          ${buildStepList('Information', step.info, 'list-info')}
          ${buildStepList('Prüfschritt', step.check, 'list-check')}
          ${buildStepList('Nächste Handlung', step.action, 'list-action')}
          ${step.warning ? `<p class="alert">${step.warning}</p>` : ''}
          ${step.outcome ? `<p class="outcome">Ziel: ${step.outcome}</p>` : ''}
        </article>
      `,
    )
    .join('');

  const checklistHtml = runbook.checklist
    .map((item, index) => {
      const id = `${checklistIdPrefix}-${index}`;
      const checked = state.checks.has(id) ? 'checked' : '';
      return `
        <label class="check-item">
          <input data-check-id="${id}" type="checkbox" ${checked} />
          <span>${item}</span>
        </label>
      `;
    })
    .join('');

  contentArea.innerHTML = `
    <section class="runbook-header">
      <p class="kicker">${state.gatewayId.toUpperCase()} · ${runbook.problemLabel}</p>
      <h2>${runbook.title}</h2>
      <p>${runbook.objective}</p>
    </section>

    <div class="runbook-layout">
      <section class="steps">${stepsHtml}</section>
      <aside class="checklist-panel">
        <div class="panel-sticky">
          <h3>Checkliste</h3>
          <p>${checkedCount} / ${runbook.checklist.length} erledigt</p>
          <div class="checklist">${checklistHtml}</div>
        </div>
      </aside>
    </div>
  `;

  contentArea.querySelectorAll('input[data-check-id]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const checkId = event.target.getAttribute('data-check-id');
      if (!checkId) return;
      if (event.target.checked) state.checks.add(checkId);
      else state.checks.delete(checkId);
      renderRunbook();
    });
  });
}

function renderApp() {
  renderGatewayList();
  renderProblemList();
  setProgress();

  if (!state.gatewayId || !state.problemId) {
    renderStartView();
    return;
  }

  renderRunbook();
}

resetBtn.addEventListener('click', () => {
  state.gatewayId = null;
  state.problemId = null;
  state.checks.clear();
  renderApp();
});

backBtn.addEventListener('click', () => {
  state.gatewayId = null;
  state.problemId = null;
  state.checks.clear();
  renderApp();
});

clearChecksBtn.addEventListener('click', () => {
  state.checks.clear();
  if (state.gatewayId && state.problemId) {
    renderRunbook();
    return;
  }
  renderApp();
});

renderApp();