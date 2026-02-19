const username = "Shahulshibin";
const projectsGrid = document.querySelector(".projects-grid");

// Your highlighted projects (priority display)
const featuredProjects = [
    "house-price",
    "customer-segmentation",
    "churn"
];

async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();

        // Clear existing static cards (optional)
        // Comment this line if you want to keep manual featured cards
        // projectsGrid.innerHTML = "";

        const sortedRepos = repos
            .filter(repo => !repo.fork && repo.description !== null)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        sortedRepos.forEach(repo => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            // Detect category based on repo name/description
            let category = "Data Science";
            const name = repo.name.toLowerCase();

            if (name.includes("churn")) category = "Machine Learning";
            else if (name.includes("price")) category = "Regression ML";
            else if (name.includes("segmentation")) category = "Clustering";
            else if (name.includes("ml")) category = "Machine Learning";

            projectCard.innerHTML = `
                <h3>📊 ${formatRepoName(repo.name)}</h3>
                <p>${repo.description || "Machine Learning / Data Science Project using Python and real-world datasets."}</p>
                <p><strong>Category:</strong> ${category}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
            `;

            projectsGrid.appendChild(projectCard);
        });

    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
    }
}

// Format repo name nicely
function formatRepoName(name) {
    return name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}

// Load projects when page loads
document.addEventListener("DOMContentLoaded", fetchGitHubRepos);
