const display = document.getElementById('display');
const keys = document.querySelector('.keys');

let expression = '';

function updateDisplay(value) {
  display.value = value;
}

function append(value) {
  expression += value;
  updateDisplay(expression);
}

function clearAll() {
  expression = '';
  updateDisplay('');
}

function delOne() {
  expression = expression.slice(0, -1);
  updateDisplay(expression);
}

function evaluateExpr() {
  try {
    // Replace pretty operators
    let safeExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
    const result = Function(`"use strict"; return (${safeExpr})`)();
    expression = String(result);
    updateDisplay(expression);
  } catch {
    updateDisplay('Error');
    expression = '';
  }
}

// Button clicks
keys.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  if (action === 'clear') return clearAll();
  if (action === 'delete') return delOne();
  if (action === 'equals') return evaluateExpr();
  if (value != null) return append(value);
});

// ✅ Keyboard support
document.addEventListener('keydown', (e) => {
  const allowedKeys = '0123456789+-*/.%';
  
  if (allowedKeys.includes(e.key)) {
    append(e.key);
  } else if (e.key === 'Enter') {
    evaluateExpr();
  } else if (e.key === 'Backspace') {
    delOne();
  } else if (e.key === 'Escape') {
    clearAll();
  }
});
