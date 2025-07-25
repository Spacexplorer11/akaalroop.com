<script>
	import { onMount, tick } from "svelte";
	import { writable } from "svelte/store";

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
	<div class="@container/project-carousel">
		<p>
			<span class="typing-text" style="animation-delay: 3.5s;">I've done quite a few projects! Here they are! ↓</span>
		</p>
		{#if projects.length}
			<div class="@container/scroll-container w-full overflow-hidden">
				<div class="@container/scrolling-carousel flex min-w-max animate-[scroll-left_10s_linear_infinite]">
					{#each [...projects, ...projects] as project}
						<div
							class="@container/project mx-5 w-[20rem] flex-shrink-0 rounded-2xl bg-black/70 p-4 text-center break-words text-white"
						>
							<h2>{project.name}</h2>
							<p>{project.description}</p>
							<p>⭐ {project.stars}</p>
							<a
								class="text-orange-500 hover:text-orange-600 hover:underline"
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
					<span
						class="inline-block transform cursor-pointer rounded-b-lg bg-black/70 p-2 select-none hover:transform-[scale(1.2)]"
						>Thanks for the star!</span
					>
				</button>
			</div>
		</div>
	{/if}
</div>
