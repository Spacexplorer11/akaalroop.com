<script>
	import {menuOpen} from "$lib/stores/menu.js";
	import {base} from '$app/paths';

	function toggleMenu() {
		const menu = document.getElementById("menu");
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

<button id="toggle" on:click={toggleMenu}>☰</button>

<!-- 🍔 Slide-in Menu -->
<div id="menu">
	<nav>
		<a href="{base}/">Home</a>
	</nav>
</div>

<style>
	#toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1001;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: orange;
		background-color: rgba(0, 0, 0, 0.7); /* black with 70% opacity */
		display: inline-block; /* shrink to fit text width */
		padding: 0.5em 0.5em;
		border-radius: 0.5em; /* optional: rounded corners */
	}

	/* 🍔 Slide-in menu */
	#menu {
		position: fixed;
		top: 0;
		right: -23vw;
		width: 20vw;
		height: 100%;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		z-index: 200;
		transition: right 0.3s ease-in-out;
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	#menu nav {
		display: flex;
		flex-direction: column;
	}

	/* ✅ Active state */
	#menu.active {
		right: 0;
	}

	/* 🔥 Highlight current page */
	#menu a {
		text-decoration: none;
		color: white;
		font-size: 1.1rem;
		transition: color 0.3s ease;
	}

	#menu a.active-link {
		font-weight: bold;
		color: #5865F2; /* Discord blurple 💜 */
	}

	#menu a.active-link::before {
		content: '| ';
		color: #5865F2;
	}
</style>