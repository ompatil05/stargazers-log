const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

function formatStars(stars) {
  return `${stars.toLocaleString()} stars`;
}

function renderRepositories(repositories) {
  repositoryCount.textContent = `${repositories.length} repositories`;
  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repository-card">
      <a class="repository-link" href="${repository.url}" target="_blank" rel="noreferrer">
        ${repository.name}
      </a>
      <p class="repository-full-name">${repository.full_name}</p>
      <p class="repository-description">${repository.description}</p>
      <p class="repository-meta">
        <span>${repository.language}</span>
        <span>${formatStars(repository.stars)}</span>
      </p>
    </li>
  `).join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    repositoryCount.textContent = "Unable to load";
    repositoryList.innerHTML = "<li class=\"status-message\">Could not load starred repositories.</li>";
    console.error("Could not load events.json", error);
  }
}

loadRepositories();