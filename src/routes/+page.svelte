<script>
	import { onMount, tick } from "svelte";
	import { writable } from "svelte/store";
	import Typewriter from "svelte-typewriter";

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
	let carouselContainer;
	let scrollPosition = 0;
	const SCROLL_SPEED = 2;

	let animationFrameId; // Store animation frame ID for cleanup

	onMount(async () => {
		const $repos = (await new Promise((resolve) => projectRepos.subscribe(resolve))) || [];
		const res = await fetch(`https://api.akaalroop.com/projects?repos=${$repos.join(",")}`);
		projects = await res.json();

		// Start the smooth scroll animation
		if (projects.length > 0) {
			startSmoothScroll();
		}

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
			// Properly cleanup animation frame
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	});

	function startSmoothScroll() {
		const animate = () => {
			if (carouselContainer) {
				scrollPosition -= SCROLL_SPEED;

				// Get the width of one set of projects
				const singleSetWidth = carouselContainer.scrollWidth / 2;

				// Reset position when we've scrolled one full set
				if (Math.abs(scrollPosition) >= singleSetWidth) {
					scrollPosition = 0;
				}

				carouselContainer.style.transform = `translateX(${scrollPosition}px)`;
			}
			animationFrameId = requestAnimationFrame(animate);
		};
		animationFrameId = requestAnimationFrame(animate);
	}
</script>

<div class="@container mt-10 mb-10 flex min-h-screen flex-col p-5 text-center text-orange-500">
	<Typewriter mode="cascade">
		<h1>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>Hi! Welcome to Akaalroop.com</span
			>
		</h1>
		<p>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>This is my website!</span
			>
		</p>
		<p>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>It was my dream to own this domain, and now I do &lt;3!</span
			>
		</p>
	</Typewriter>
	<div class="@container/project-carousel">
		<Typewriter delay="3000">
			<p>
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal">
					I've done quite a few projects! Here they are! ↓</span
				>
			</p>
		</Typewriter>
		{#if projects.length}
			<div class="@container/scroll-container w-full overflow-hidden">
				<div bind:this={carouselContainer} class="@container/scrolling-carousel flex">
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
	<Typewriter mode="cascade" delay="4000">
		<p>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>I hope you like them!</span
			>
		</p>
		<p>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>These projects are actually updated straight from Github! Go give them a star and see them update here!</span
			>
		</p>
	</Typewriter>
	{#if showModal}
		<div
			class="@container/modal-overlay fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur-sm"
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
						class="inline-block transform cursor-pointer rounded-b-lg bg-black/70 p-2 transition-transform select-none hover:scale-110"
						>Thanks for the star!</span
					>
				</button>
			</div>
		</div>
	{/if}
</div>
