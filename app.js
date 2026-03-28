import { gateways, problems } from './data/gateways.js';
import x200 from './data/x200.js';
import x300 from './data/x300.js';
import x500 from './data/x500.js';

const dataByGateway = { x200, x300, x500 };

let selectedGateway = null;
let selectedProblem = null;

const gatewayList = document.getElementById('gatewayList');
const problemList = document.getElementById('problemList');
const contentArea = document.getElementById('contentArea');
const chips = document.getElementById('selectionChips');
const progress2 = document.getElementById('progress-2');
const progress3 = document.getElementById('progress-3');
const resetBtn = document.getElementById('resetBtn');
const backBtn = document.getElementById('backBtn');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderGateways() {
  gatewayList.innerHTML = '';
  gateways.forEach((gateway) => {
    const button = el('button', `option-card${selectedGateway === gateway.id ? ' active' : ''}`);
    const titleRow = el('div', 'option-title-row');
    const titleWrap = el('div');
    titleWrap.appendChild(el('div', 'option-title', gateway.title));
    titleWrap.appendChild(el('div', 'option-subtitle', gateway.subtitle));
    titleRow.appendChild(titleWrap);
    titleRow.appendChild(el('span', 'option-badge', gateway.badge));
    button.appendChild(titleRow);
    button.appendChild(el('div', 'option-description', gateway.description));
    button.addEventListener('click', () => {
      selectedGateway = gateway.id;
      selectedProblem = null;
      renderAll();
    });
    gatewayList.appendChild(button);
  });
}

function renderProblems() {
  problemList.innerHTML = '';
  problems.forEach((problem) => {
    const button = el('button', `option-card${selectedProblem === problem.id ? ' active' : ''}`);
    const titleRow = el('div', 'option-title-row');
    const titleWrap = el('div');
    titleWrap.appendChild(el('div', 'option-title', problem.title));
    titleRow.appendChild(titleWrap);
    button.appendChild(titleRow);
    button.appendChild(el('div', 'option-description', problem.description));
    if (!selectedGateway) button.disabled = true;
    if (!selectedGateway) button.style.opacity = '0.55';
    button.addEventListener('click', () => {
      if (!selectedGateway) return;
      selectedProblem = problem.id;
      renderAll();
    });
    problemList.appendChild(button);
  });
}

function renderChips() {
  chips.innerHTML = '';
  if (selectedGateway) {
    const chip = el('div', 'chip', `Gerät: ${selectedGateway.toUpperCase()}`);
    chips.appendChild(chip);
  }
  if (selectedProblem) {
    const p = problems.find((item) => item.id === selectedProblem);
    if (p) chips.appendChild(el('div', 'chip', `Problem: ${p.title}`));
  }
}

function renderProgress() {
  progress2.classList.toggle('active', !!selectedGateway);
  progress3.classList.toggle('active', !!selectedGateway && !!selectedProblem);
}

function renderPlaceholder() {
  contentArea.innerHTML = `
    <div class="placeholder">
      <div class="step-label">Schritt 3</div>
      <h2>Geführte Diagnose</h2>
      <p>
        Wähle links zuerst das Gateway und danach das Problem aus. Dann bekommst du eine saubere,
        mobile-freundliche Checkliste zur Störungsdiagnose.
      </p>
      <div class="feature-grid">
        <div class="feature-box">Modular pro Gerät aufgebaut</div>
        <div class="feature-box">Leicht erweiterbar für neue Fehlerbilder</div>
        <div class="feature-box">Checklisten-Ansicht für Techniker vor Ort</div>
        <div class="feature-box">Bleibt wie eine App auf einer Seite</div>
        <div class="feature-box">Desktop, Tablet und Smartphone optimiert</div>
        <div class="feature-box">X500 schon als Platzhalter vorbereitet</div>
      </div>
    </div>
  `;
}

function renderResult() {
  const entry = dataByGateway[selectedGateway]?.[selectedProblem];
  if (!entry) {
    renderPlaceholder();
    return;
  }

  const stepsHtml = entry.steps.map((step, index) => `
    <article class="step-card">
      <div class="step-top">
        <div class="step-number">${index + 1}</div>
        <div>
          <h3 class="step-title">${step.title}</h3>
          <ul class="step-list">
            ${step.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
          </ul>
          ${step.hint ? `<div class="step-hint"><strong>Hinweis:</strong> ${step.hint}</div>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  const checklistHtml = entry.checklist.map((item, index) => `
    <label class="check-item">
      <input type="checkbox" id="check-${index}" />
      <span>${item}</span>
    </label>
  `).join('');

  contentArea.innerHTML = `
    <div class="result-head">
      <div class="step-label">Diagnosepfad</div>
      <h2>${entry.title}</h2>
      <p class="result-summary">${entry.summary}</p>
    </div>
    <div class="result-grid">
      <div class="steps">${stepsHtml}</div>
      <aside class="side-panel">
        <div class="panel-box">
          <h3>Kurz-Checkliste</h3>
          <div class="checklist">${checklistHtml}</div>
        </div>
        <div class="panel-box">
          <h3>Erweiterung</h3>
          <p class="result-summary">
            Neue Pfade ergänzt du direkt in der jeweiligen Gerätedatei unter <strong>data/</strong>.
            Die Oberfläche baut sich automatisch daraus auf.
          </p>
        </div>
      </aside>
    </div>
  `;
}

function renderAll() {
  renderGateways();
  renderProblems();
  renderChips();
  renderProgress();
  if (selectedGateway && selectedProblem) renderResult();
  else renderPlaceholder();
}

resetBtn.addEventListener('click', () => {
  selectedGateway = null;
  selectedProblem = null;
  renderAll();
});

backBtn.addEventListener('click', () => {
  selectedGateway = null;
  selectedProblem = null;
  renderAll();
});

renderAll();
