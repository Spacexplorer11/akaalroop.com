import { projectRepos } from "$lib/projects.svelte.js";

export async function load() {
	try {
		const res = await fetch(`https://api.akaalroop.com/projects?repos=${projectRepos.join(",")}`);
		let projects = await res.json();
		if (!res.ok) {
			console.error(`HTTP error! status: ${res.status}`);
			return {
				projects: []
			};
		}
		console.log("Successfully fetched projects!");
		return { projects: projects };
	} catch (error) {
		console.error("Failed to load projects in layout:", error);
	}
	return {
		projects: []
	};
}
