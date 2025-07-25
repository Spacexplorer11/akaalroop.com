<script>
	import {onMount, tick} from "svelte";
	import {writable} from "svelte/store";

	export const projectRepos = writable([
		"akaalroop.com",
		"meow_meals",
		"space_dodge",
		"word_ban",
		"trafalgar-to-trenches",
		"cloudcat",
		"supercalculator"
	]);

	let projects = [];
	let starText = false;
	let afterStarTextClick = false;
	let showModal = false;

	let interval;
	onMount(async () => {
		const $repos = (await new Promise((resolve) => projectRepos.subscribe(resolve))) || [];
		const res = await fetch(`https://api.akaalroop.com/projects?repos=${$repos.join(",")}`);
		projects = await res.json();
		setTimeout(() => {
			starText = true;
		}, 6000);
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

<div class="p-20px @container mt-10 mb-10 flex min-h-screen flex-col text-center text-orange-500">
	<h1><span class="typing-text">Hi! Welcome to Akaalroop.com</span></h1>
	<p>
		<span class="typing-text" style="animation-delay: 1.3s;">This is my website!</span>
	</p>
	<p>
		<span class="typing-text" style="animation-delay: 2.2s;"
		>It was my dream to own this domain, and now I do &lt;3!</span
		>
	</p>
	<div class="project-carousel">
		<p>
			<span class="typing-text"
			      style="animation-delay: 3.5s;">I've done quite a few projects! Here they are! ↓</span>
		</p>
		{#if projects.length}
			<div class="scroll-container">
				<div class="scrolling-carousel">
					{#each [...projects, ...projects] as project}
						<div class="project flex-initial">
							<h2>{project.name}</h2>
							<p>{project.description}</p>
							<p>⭐ {project.stars}</p>
							<a
									href={project.html_url}
									target="_blank"
									on:click={() => {
									if (starText) {
										afterStarTextClick = true;
									}
								}}>View on GitHub</a
							>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<p><span class="typing-text" style="animation-delay: 4.3s;">I hope you like them!</span></p>
	<p>
		<span class="typing-text" style="animation-delay: 4.6s;"
			>These projects are actually updated straight from Github! Go give them a star and see them update here!</span
		>
	</p>
	{#if showModal}
		<div
				class="@container/modal-overlay fixed inset-0 z-999 flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur-sm"
				role="button"
				tabindex="0"
				on:click={() => (showModal = false)}
				on:keydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}
		>
			<div
					id="modal-content"
					class="@container/modal-content mb-5 w-xs max-w-full rounded-b-lg bg-black/80 p-8 text-center text-orange-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
					role="dialog"
					aria-modal="true"
					aria-label="Modal dialog"
					tabindex="0"
					on:click|stopPropagation
					on:keydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}
			>
				<h2>Thanks!</h2>
				<p>The stats will only update every hour, so you will see the update but later!</p>
				<button
						class="mt-3 text-red-600"
						on:click={() => (showModal = false)}
						on:keydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}
				>
					<span class="text">Thanks for the star!</span></button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.text {
		background-color: rgba(0, 0, 0, 0.7); /* black with 70% opacity */
		display: inline-block; /* shrink to fit text width */
		padding: 0.5em 0.5em;
		border-radius: 0.5em; /* optional: rounded corners */
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
</style>
