import { fetchProjects, loadProjectsClicked } from "$lib/projects.svelte.js";

export const load = async () => {
	try {
		await fetchProjects();
		if (window !== undefined && typeof localStorage !== undefined) {
			await loadProjectsClicked();
		}
	} catch (error) {
		console.error("Failed to load projects in layout:", error);
	}
	return {};
};

export const prerender = true;
