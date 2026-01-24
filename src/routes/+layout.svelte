<script>
	import "../app.css";
	import { Navbar } from "$lib";
	import { onMount } from "svelte";
	import { loadProjectsClicked } from "$lib/projects.svelte.js";

	let { data, children } = $props();

	onMount(async () => {
		try {
			loadProjectsClicked(localStorage);
		} catch (error) {
			console.error("Failed to load projects in layout:", error);
		}
	});
</script>

<div id="national-park">
	<Navbar {data} />
	{@render children()}
</div>

<style>
	@font-face {
		font-family: "National Park";
		font-style: normal;
		font-weight: 600;
		src: url("$lib/fonts/NationalPark-ExtraBold.woff2") format("woff2");
		font-display: swap;
	}

	#national-park {
		font-family: "National Park", sans-serif;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: normal;
	}
</style>
