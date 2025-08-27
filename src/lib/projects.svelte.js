export let projectsClicked = $state(new Set());
export const projectRepos = [
	"akaalroop.com",
	"meow_meals",
	"space_dodge",
	"word_ban",
	"trafalgar-to-trenches",
	"cloudcat",
	"supercalculator",
	"lets-do-it"
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
