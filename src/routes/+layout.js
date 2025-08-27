import { fetchProjects, loadProjectsClicked } from "$lib/projects.svelte.js";

export const load = async () => {
	try {
		await fetchProjects();
		if (typeof window !== undefined && localStorage !== undefined) {
			await loadProjectsClicked();
		}
	} catch (error) {
		console.error("Failed to load projects in layout:", error);
		// Continue loading the page even if projects fail to fetch
	}
	return {};
};

export const prerender = true;
