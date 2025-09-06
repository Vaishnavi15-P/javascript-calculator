const display = document.getElementById('display');
const keys = document.querySelector('.keys');

let expression = '';

// Update display
function updateDisplay(value) {
  display.value = value;
}

// Append value to expression
function append(value) {
  expression += value;
  updateDisplay(expression);
}

// Clear everything
function clearAll() {
  expression = '';
  updateDisplay('');
}

// Delete last character
function delOne() {
  expression = expression.slice(0, -1);
  updateDisplay(expression);
}

// Apply advanced functions immediately
function applyAdvanced(value) {
  try {
    // Evaluate current expression first
    let num = Function(`"use strict"; return (${expression || 0})`)();

    let result;
    if (value === '√') result = Math.sqrt(num);
    else if (value === 'x²') result = Math.pow(num, 2);
    else if (value === '1/x') result = 1 / num;
    else if (value === '%') result = num / 100;

    expression = String(result);
    updateDisplay(expression);
  } catch {
    updateDisplay('Error');
    expression = '';
  }
}

// Evaluate expression
function evaluateExpr() {
  try {
    let numericResult = Function(`"use strict"; return (${expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
    })`)();

    // Show numeric result immediately
    updateDisplay(numericResult);

    // Store result for further calculations
    expression = String(numericResult);

  } catch {
    updateDisplay('Error');
    expression = '';
  }
}

// Button click events
keys.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === 'clear') return clearAll();
  if (action === 'delete') return delOne();
  if (action === 'equals') return evaluateExpr();

  // Advanced functions handled immediately
  if (value === '√' || value === 'x²' || value === '1/x' || value === '%') {
    return applyAdvanced(value);
  }

  if (value != null) return append(value);
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const allowedKeys = '0123456789+-*/.%';
  if (allowedKeys.includes(e.key)) append(e.key);
  else if (e.key === 'Enter') evaluateExpr();
  else if (e.key === 'Backspace') delOne();
  else if (e.key === 'Escape') clearAll();
});

