import { fetchProjects } from "$lib/stores/projects.js";

export const load = async () => {
	await fetchProjects();
	return {};
};

export const prerender = true;
