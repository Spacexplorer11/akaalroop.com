<script>
	import "../app.css";
	import { Navbar } from "$lib";
	import { onMount, setContext } from "svelte";
	import { loadProjectsClicked } from "$lib/projects.svelte.js";

	let { data, children } = $props();
	const initialProjects = data.projects; // Initial state obvs so ignore the stupid warning
	setContext("initialProjects", initialProjects);

	onMount(async () => {
		try {
			loadProjectsClicked(localStorage);
		} catch (error) {
			console.error("Failed to load projects in layout:", error);
		}
	});
</script>

<div id="national-park">
	<enhanced:img src="$lib/images/home-background.png" alt="" id="home-background" sizes="100vw" />
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

	#home-background {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -1;
	}

	:global(html),
	:global(body) {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		margin: 0;
		box-sizing: border-box;
		overflow-x: hidden;
		padding: 0;
		height: 100%;
		width: 100%;
		overscroll-behavior: none;
	}
</style>
