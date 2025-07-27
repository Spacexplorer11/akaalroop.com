export let projectsClicked = $state(new Set());
export const projectRepos = [
	"akaalroop.com",
	"meow_meals",
	"space_dodge",
	"word_ban",
	"trafalgar-to-trenches",
	"cloudcat",
	"supercalculator"
];
export let projects = [];

export async function fetchProjects() {
	const res = await fetch(`https://api.akaalroop.com/projects?repos=${projectRepos.join(",")}`);
	projects = await res.json();
	return projects;
}
