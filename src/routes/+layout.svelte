<script>
	import {Menu} from "$lib";
	import {onMount} from "svelte";
	import {menuOpen} from "$lib/stores/menu.js";
	import {afterNavigate} from "$app/navigation";

	// Set active marker based on current page
	function highlightActiveMenu() {
		const links = document.querySelectorAll("#menu a");
		const currentPage = window.location.pathname;

		links.forEach(link => {
			const page = link.getAttribute("href");
			if (page === currentPage) {
				link.classList.add("active-link");
			} else {
				link.classList.remove("active-link");
			}
		});
	}

	function updateLayout() {
		const container = document.getElementById('container');
		if (container) {
			container.classList.toggle('active_menu', $menuOpen);
		}
		highlightActiveMenu()
	}

	onMount(() => {
		// Run once on initial load
		updateLayout();

		// Then on every route change
		afterNavigate(() => {
			updateLayout();
		});
	});
</script>

<div id="container">
<div id="national-park">
	<Menu/>
	<slot/>
</div>
</div>
<style>
	@import url('https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&display=swap');

	#national-park {
		font-family: "National Park", sans-serif;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: normal;
	}

	#container.active_menu {
		margin-right: 23vw;
	}
</style>