<script>
	import { onMount } from "svelte";

	let { data } = $props();
	let sponsorButtons;

	onMount(() => {
		sponsorButtons = document.getElementById("sponsor-buttons");
		sponsorButtons.innerHTML = `<iframe
				src="https://github.com/sponsors/Spacexplorer11/button"
				title="Sponsor Spacexplorer11"
				height="32"
				width="114"
				style="border: 0; border-radius: 6px;"
		></iframe><a href="https://www.buymeacoffee.com/spacexplorer11" target="_blank" class="pointer"
		><img
				src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
				alt="Buy Me A Coffee"
				style="height: 60px !important;width: 217px !important;"
		/></a
		>`;
	});
</script>

<nav
	class="@container relative mr-0 ml-0 flex w-full items-center justify-between bg-black/70 p-3 text-white md:flex-row md:p-10"
>
	<div class="flex w-full flex-wrap items-center space-x-5 gap-y-4 md:space-x-16 lg:space-x-24">
		<a class="navbar-item" href="/">Home</a>
		<a class="navbar-item" href="/projects">Projects</a>
		{#if data.projects.length > 0}
			<a class="navbar-item" href="/gallery">Gallery</a>
		{/if}
		<a class="navbar-item" href="/sponsors">Sponsors</a>
		<!--	<a href="/about">About</a> -->
		<!--	<a href="/contact">Contact</a> -->
		<div id="sponsor-buttons" class="flex flex-row items-center space-x-2 lg:ml-auto"></div>
	</div>
</nav>
