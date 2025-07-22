<script>
	import {menuOpen} from "$lib/stores/menu.js";
	import {base} from '$app/paths';

	function toggleMenu() {
		const menu = document.getElementById("hamburger-menu");
		const container = document.getElementById("container");


		const menuIsActive = menu.classList.contains("active");
		const containerIsActive = container.classList.contains("active_menu");

		if (menuIsActive && !containerIsActive) {
			container.classList.toggle("active_menu");
		} else if (!menuIsActive && containerIsActive) {
			menu.classList.toggle("active");
		} else {
			menu.classList.toggle("active");
			container.classList.toggle("active_menu");
		}
		if (menu.classList.contains("active")) {
			menuOpen.set(true);
		} else if (!menu.classList.contains("active")) {
			menuOpen.set(false);
			if (container.classList.contains("active_menu")) {
				container.classList.toggle("active_menu");
			}
		}
	}
</script>

<button id="hamburger-toggle" on:click={toggleMenu}>☰</button>

<!-- 🍔 Slide-in Menu -->
<div id="hamburger-menu">
	<nav>
		<a href="{base}/">Home</a>
	</nav>
</div>

<style>
	#hamburger-toggle {
		color: orange;
		background-color: rgba(0, 0, 0, 0.7); /* black with 70% opacity */
		display: inline-block; /* shrink to fit text width */
		padding: 0.5em 0.5em;
		border-radius: 0.5em; /* optional: rounded corners */
	}
</style>