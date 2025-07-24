<script>
	import Typewriter from 'svelte-typewriter'
	import {onMount, tick} from 'svelte';
	import {writable} from 'svelte/store';

	export const projectRepos = writable(["akaalroop.com", "meow_meals", "space_dodge", "word_ban", "trafalgar-to-trenches", "cloudcat", "supercalculator"]);

	let projects = [];
	let starText = false;
	let afterStarTextClick = false;
	let showModal = false;

	let interval;
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
		return () => {
			document.removeEventListener("visibilitychange", handler);
			clearInterval(interval);
		};
	});
</script>
<div class="flex flex-col p-20px min-h-screen text-center text-orange-500">
	<h1 class="text-5xl"><span class="typing-text">Hi! Welcome to Akaalroop.com</span></h1>
	<p class="text-3xl"><span class="typing-text" style="animation-delay: 1.3s;">This is my website!</span></p>
	<p class="text-3xl"><span class="typing-text" style="animation-delay: 2.2s;">It was my dream to own this domain, and now I do &lt;3!</span>
	</p>
	<div id="project-carousel">
		<p class="text-3xl"><span class="typing-text" style="animation-delay: 3.5s;">I've done quite a few projects! Here they are! ↓</span>
		</p>
		{#if projects.length}
			<div class="scroll-container">
				<div class="scrolling-carousel">
					{#each [...projects, ...projects] as project}
						<div class="project">
							<h2>{project.name}</h2>
							<p>{project.description}</p>
							<p>⭐ {project.stars}</p>
							<a href={project.html_url} target="_blank" on:click={() => {
								if (starText) {
									afterStarTextClick = true;
								}
							}}>View on GitHub</a>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<Typewriter delay="4500" interval="30" mode="cascade" on:done={() => starText=true}>
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

	.project {
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 0.5em;
		padding: 1em;
		color: white;
		max-width: 300px;
		text-align: center;
		flex: 0 0 auto;
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

	.scroll-container {
		width: 100%;
		overflow: hidden;
	}

	.scrolling-carousel {
		display: flex;
		gap: 2rem;
		min-width: max-content;
		animation: scroll-left 30s linear infinite;
	}

	@keyframes scroll-left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>