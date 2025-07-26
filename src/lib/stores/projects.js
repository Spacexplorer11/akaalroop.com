import { writable, get } from "svelte/store";

export const projectsClicked = writable(new Set());
export const projectRepos = writable([
	"akaalroop.com",
	"meow_meals",
	"space_dodge",
	"word_ban",
	"trafalgar-to-trenches",
	"cloudcat",
	"supercalculator"
]);
export const projects = writable([]);

export async function fetchProjects() {
	const repos = get(projectRepos);
	const res = await fetch(`https://api.akaalroop.com/projects?repos=${repos.join(",")}`);
	projects.set(await res.json());
}
