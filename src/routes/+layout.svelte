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
	
	:global(html),
:global(body) {
	background-image: url("$lib/images/home-background.png");

	background-image: image-set(
		url("$lib/images/home-background.avif") type("image/avif"),
		url("$lib/images/home-background.webp") type("image/webp"),
		url("$lib/images/home-background.png") type("image/png")
	);
	@apply bg-cover bg-fixed bg-center bg-no-repeat;
	@apply m-0 box-border overflow-x-hidden p-0;
	height: 100%;
	width: 100%;
	overscroll-behavior: none;
}
</style>
