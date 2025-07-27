import { fetchProjects } from "$lib/projects.svelte.js";

export const load = async () => {
	await fetchProjects();
	return {};
};

export const prerender = true;
