import "./style.css";

const display = document.querySelector(".result-text") as HTMLSpanElement;
const keypad = document.querySelector(".keypad-container") as HTMLDivElement;
let expression = "";

function handleKey(key: HTMLButtonElement) {
  const action = key.dataset.action;
  const value = key.value;

  if (action === "reset") return handleReset();
  if (action === "delete") return handleDelete();
  if (action === "calculate") return handleCalculate();

  handleInput(value);
}

keypad.addEventListener("click", (e) => {
  if (!e.target) return;
  const key = (e.target as Element).closest(".key") as HTMLButtonElement;
  if (!key) return;
  handleKey(key);
});

function handleInput(value: string) {
  if (value === ".") {
    const parts = expression.split(/[\+\-\*\/]/);
    if (parts.at(-1)?.includes(".")) return;
  }

  expression += value;
  display.textContent = expression;
}

function handleCalculate() {
  if (!expression) return;

  try {
    const result = eval(expression);
    display.textContent = String(result);
    expression = String(result);
  } catch {
    display.textContent = "Error";
    expression = "";
  }
}

function handleDelete() {
  expression = expression.slice(0, -1);
  display.textContent = expression || "0";
}

function handleReset() {
  expression = "";
  display.textContent = "0";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    return handleCalculate();
  }
  if (/^[0-9\+\-\*\/\.]$/.test(e.key)) return handleInput(e.key);
  if (e.key === "Backspace") return handleDelete();
  if (e.key === "Escape") return handleReset();
});

const root = document.documentElement;
const toggle = document.getElementById("theme-toggle") as HTMLButtonElement;
const savedTheme = localStorage.getItem("calc-theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  toggle.setAttribute("data-position", savedTheme);
}

toggle.addEventListener("click", () => {
  const currentPos = parseInt(toggle.getAttribute("data-position") ?? "1");
  const nextPos = (currentPos % 3) + 1;

  toggle.setAttribute("data-position", String(nextPos));
  root.setAttribute("data-theme", String(nextPos));

  localStorage.setItem("calc-theme", String(nextPos));
});
