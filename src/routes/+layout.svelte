<script>
	import "../app.css";
	import { Navbar } from "$lib";
	import { onMount } from "svelte";
	import { loadProjectsClicked } from "$lib/projects.svelte.js";

	let { data, children } = $props();

	onMount(async () => {
		try {
			await loadProjectsClicked(localStorage);
		} catch (error) {
			console.error("Failed to load projects in layout:", error);
		}
	});
</script>

<Navbar {data} />
{@render children()}
