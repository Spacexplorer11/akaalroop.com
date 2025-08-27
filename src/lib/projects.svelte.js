export let projectsClicked = $state(new Set());

export async function loadProjectsClicked() {
	const saved = localStorage.getItem("projectsClicked");
	if (saved) JSON.parse(saved).forEach((item) => projectsClicked.add(item));
}

export async function saveProjectsClicked() {
	localStorage.setItem("projectsClicked", JSON.stringify(Array.from(projectsClicked)));
}
export const projectRepos = [
	"akaalroop.com",
	"meow_meals",
	"space_dodge",
	"word_ban",
	"trafalgar-to-trenches",
	"cloudcat",
	"supercalculator",
	"lets-do-it",
	"rust-is-the-best",
	"justcount",
	"winter-of-making-minecraft-mod",
	"colourin"
];
export let projects = [];

export async function fetchProjects() {
	try {
		const res = await fetch(`https://api.akaalroop.com/projects?repos=${projectRepos.join(",")}`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		projects = await res.json();
		return projects;
	} catch (error) {
		console.error("Failed to fetch projects:", error);
		projects = [];
		return projects;
	}
}
