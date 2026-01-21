"use strict";

const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("calc-theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  toggle.setAttribute("data-position", savedTheme);
}

toggle.addEventListener("click", () => {
  const currentPos = parseInt(toggle.getAttribute("data-position"));
  const nextPos = (currentPos % 3) + 1;

  toggle.setAttribute("data-position", nextPos);
  root.setAttribute("data-theme", nextPos);

  localStorage.setItem("calc-theme", nextPos);
});
