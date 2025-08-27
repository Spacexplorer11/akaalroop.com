export let projectsClicked = $state(new Set());

export async function loadProjectsClicked() {
	if (typeof localStorage === "undefined") return;
	if (window === undefined) return;
	const savedStr = localStorage.getItem("projectsClicked");
	if (!savedStr) return;

	try {
		const savedObj = JSON.parse(savedStr);
		const now = Date.now();
		if (savedObj.expiry && now < savedObj.expiry) {
			savedObj.value.forEach((item) => projectsClicked.add(item));
		} else {
			localStorage.removeItem("projectsClicked");
		}
	} catch {
		localStorage.removeItem("projectsClicked");
	}
}

export async function saveProjectsClicked() {
	if (typeof localStorage === "undefined") return;
	if (window === undefined) return;
	const expiry = Date.now() + 300_000;
	const obj = {
		value: Array.from(projectsClicked),
		expiry
	};
	localStorage.setItem("projectsClicked", JSON.stringify(obj));
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
	const res = await fetch(`https://api.akaalroop.com/projects?repos=${projectRepos.join(",")}`);
	projects = await res.json();
	if (!res.ok) {
		console.error(`HTTP error! status: ${res.status}`);
		projects = [];
		return projects;
	}
	return projects;
}
