<script>
	import Typewriter from 'svelte-typewriter'
	import {onMount, tick} from 'svelte';
	import {writable} from 'svelte/store';

	export const projectRepos = writable(["akaalroop.com", "meow_meals", "space_dodge", "word_ban", "trafalgar-to-trenches", "cloudcat", "supercalculator"]);

	let projects = [];
	let currentIndex = 0;
	let starText = false;
	let afterStarTextClick = false;
	let showModal = false;

	onMount(async () => {
		const $repos = await new Promise(resolve => projectRepos.subscribe(resolve)) || [];
		const res = await fetch(`https://api.akaalroop.com/projects?repos=${$repos.join(",")}`);
		projects = await res.json();

		const handler = async () => {
			if (document.visibilityState === "visible" && afterStarTextClick) {
				showModal = true;
				afterStarTextClick = false;
				await tick();
				document.getElementById("modal-content")?.focus();
			}
		};

		document.addEventListener("visibilitychange", handler);
		return () => document.removeEventListener("visibilitychange", handler);
	});
</script>
<div id="content">
	<Typewriter interval="30" mode="cascade">
		<h1><span class="text">Hi! Welcome to Akaalroop.com</span></h1>
		<p><span class="text">This is my website!</span></p>
		<p><span class="text">It was my dream to own this domain, and now I do &lt;3!</span></p>
	</Typewriter>
	<div id="project-carousel">
		<Typewriter delay="5500" interval="30">
			<p><span class="text">I've done quite a few projects! Here they are! ↓</span></p>
		</Typewriter>
		{#if projects.length}
			<div class="carousel">
				<button on:click={() => currentIndex = (currentIndex - 1 + projects.length) % projects.length}>⟨
				</button>

				<div class="project" role="button" tabindex="0"
				     on:keydown={(e) => (e.key === "Enter" || e.key === " ") && e.target.click()}>
					<h2>{projects[currentIndex].name}</h2>
					<p>{projects[currentIndex].description}</p>
					<p>⭐ {projects[currentIndex].stars}</p>
					<a href={projects[currentIndex].html_url} target="_blank" on:click={() => {
		if (starText) {
			afterStarTextClick = true;
		}
		}}>View on GitHub</a>
				</div>

				<button on:click={() => currentIndex = (currentIndex + 1) % projects.length}>⟩</button>
			</div>
		{/if}
	</div>
	<Typewriter delay="6500" interval="30" mode="cascade" on:done={starText=true}>
		<p><span class="text">I hope you like them!</span></p>
		<p><span class="text">These projects are actually updated straight from Github! Go give them a star and see them update here!</span>
		</p>
	</Typewriter>
	{#if showModal}
		<div
				class="modal-overlay"
				role="button"
				tabindex="0"
				on:click={() => showModal = false}
				on:keydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}>
			<div
					id="modal-content"
					class="modal-content"
					role="dialog"
					aria-modal="true"
					aria-label="Modal dialog"
					tabindex="0"
					on:click|stopPropagation
					on:keydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}>
				<h2>Thanks!</h2>
				<p>The stats will only update every hour, so you will see the update but later!</p>
				<button on:click={() => showModal = false}
				        on:keydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}>
					<span class="text">Thanks for the star!</span></button>
			</div>
		</div>
	{/if}
</div>
<style>
	#content {
		display: flex;
		flex-direction: column;
		padding: 20px;
		color: rgb(223, 99, 0);
		min-height: 100vh;
		text-align: center;
		font-size: x-large;
	}

	.text {
		background-color: rgba(0, 0, 0, 0.7); /* black with 70% opacity */
		display: inline-block; /* shrink to fit text width */
		padding: 0.5em 0.5em;
		border-radius: 0.5em; /* optional: rounded corners */
	}

	.carousel {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-top: 1rem;
	}

	.project {
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 0.5em;
		padding: 1em;
		color: white;
		width: 250px;
		text-align: center;
	}

	button {
		background: none;
		border: none;
		color: rgb(223, 99, 0);
		font-size: 2rem;
		cursor: pointer;
		user-select: none;
		transition: transform 0.2s ease;
	}

	button:hover {
		transform: scale(1.2);
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}

	.modal-content {
		background: rgba(0, 0, 0, 0.8);
		color: orange;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
		max-width: 90%;
		width: 300px;
		text-align: center;
	}
</style>