let currentInput = '0';
let previousInput = '';
let operator = null;

const resultElement = document.getElementById('result');
const historyElement = document.getElementById('history');

function updateDisplay() {
  resultElement.innerText = currentInput;
  if (operator != null) {
    historyElement.innerText = `${previousInput} ${operator}`;
  } else {
    historyElement.innerText = '';
  }
}

function appendNumber(number) {
  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '' && op !== '-') return;
  if (previousInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '0';
  updateDisplay();
}

function calculate() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  if (isNaN(prev) || isNaN(current)) return;
  
  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = current === 0 ? "Error" : prev / current;
      break;
    case '%':
      computation = prev % current;
      break;
    default:
      return;
  }
  
  currentInput = computation.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length === 1 || currentInput === "Error") {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

// Fitur Keyboard Support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/[0-9\.]/.test(key)) {
    appendNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === '%') {
    appendOperator('%');
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault(); 
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
