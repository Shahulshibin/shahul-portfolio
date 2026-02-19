const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.className = savedTheme;
    toggleBtn.textContent = savedTheme === "light" ? "🌙" : "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        body.classList.add("light");
        toggleBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
        toggleBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    }
});
