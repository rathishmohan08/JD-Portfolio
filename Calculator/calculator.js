const display = document.getElementById('display');

function press(key) {
  display.value += key;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
}

function clearDisplay() {
  display.value = '';
}
