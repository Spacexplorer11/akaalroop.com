<script>
	import { onMount, tick } from "svelte";
	import Typewriter from "svelte-typewriter";
	import { projects, projectsClicked, saveProjectsClicked } from "$lib/projects.svelte.js";

	let starText = false;
	let afterStarTextClick = false;
	let showModal = $state(false);
	let carouselContainer;
	let carouselContainerElement;
	let scrollPosition = 0;
	let SCROLL_SPEED = 2;

	let animationFrameId; // Store animation frame ID for cleanup

	onMount(async () => {
		carouselContainerElement = document.getElementById("carousel-container");
		if (carouselContainerElement) {
			carouselContainerElement.addEventListener("pointerdown", handlePointerDown);
		}
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", handlePointerUp);

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
			if (carouselContainerElement) {
				carouselContainerElement.removeEventListener("pointerdown", handlePointerDown);
			}
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
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
	let isDragging = false;
	let startX;
	let scrollStart;

	function handlePointerDown(e) {
		isDragging = true;
		startX = e.clientX;
		scrollStart = scrollPosition;
		SCROLL_SPEED = 0; // Pause automatic scrolling while dragging
	}

	function handlePointerMove(e) {
		if (!isDragging) return;
		const delta = e.clientX - startX;
		if (delta > 1 || delta < -1) {
			scrollPosition = scrollStart + delta;
			carouselContainer.style.transform = `translateX(${scrollPosition}px)`;
		}
	}

	function handlePointerUp() {
		isDragging = false;
		SCROLL_SPEED = 2; // Resume automatic scrolling
	}
</script>

<div class="@container mt-10 mb-10 flex min-h-screen flex-col p-5 text-center text-orange-500">
	<Typewriter mode="cascade">
		<h1>
			<span class="text-bg">Hi! Welcome to Akaalroop.com</span>
		</h1>
		<p>
			<span class="text-bg">This is my website!</span>
		</p>
		<p>
			<span class="text-bg">It was my dream to own this domain, and now I do &lt;3!</span>
		</p>
	</Typewriter>
	<div class="@container/project-carousel">
		<Typewriter delay="3000">
			<p>
				<span class="text-bg"> I've done quite a few projects! Here they are! ↓</span>
			</p>
		</Typewriter>
		{#if projects.length}
			<div id="scroll-container" class="@container/scroll-container w-full overflow-hidden">
				<div
					id="carousel-container"
					bind:this={carouselContainer}
					class="@container/scrolling-carousel mb-5 flex transform-gpu will-change-transform"
				>
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
								rel="noopener noreferrer"
								onclick={async () => {
									if (starText) {
										afterStarTextClick = true;
									}
									projectsClicked.add(project.name);
									await saveProjectsClicked();
								}}>View on GitHub</a
							>
							{#if project.homepage !== null && project.homepage !== ""}
								<button
									class="inline-block transform cursor-pointer rounded-lg bg-purple-500 p-2 transition-transform select-none hover:scale-110"
									onclick={async () => {
										projectsClicked.add(project.name);
										await saveProjectsClicked();
										window.open(project.homepage, "_blank");
									}}
									title="Open {project.homepage} in a new tab"
								>
									Visit website!
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<Typewriter delay="4000" mode="cascade">
		<p>
			<span class="text-bg">I hope you like them!</span>
		</p>
		<p>
			<span class="text-bg"
				>These projects are actually updated straight from Github! Go give them a star and see them update here!</span
			>
		</p>
	</Typewriter>
	{#if showModal}
		<div
			class="@container/modal-overlay fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur-sm"
			role="button"
			tabindex="0"
			onclick={() => (showModal = false)}
			onkeydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}
		>
			<div
				id="modal-content"
				class="@container/modal-content mb-5 w-xs max-w-full rounded-b-lg bg-black/80 p-8 text-center text-orange-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
				role="dialog"
				aria-modal="true"
				aria-label="Modal dialog"
				tabindex="0"
				onkeydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}
			>
				<h2>Thanks!</h2>
				<p>
					The stats update immediately! Just refresh to see the change! Btw, go to the <a href="/projects"
						>Projects page</a
					> for a bigger reward!
				</p>
				<button
					class="mt-3 text-red-600"
					onclick={() => (showModal = false)}
					onkeydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "esc") && (showModal = false)}
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
