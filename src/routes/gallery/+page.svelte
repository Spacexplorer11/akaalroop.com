<script>
	import { projectsClicked, saveProjectsClicked } from "$lib/projects.svelte.js";
	import { onMount, tick } from "svelte";
	import { goto, invalidateAll } from "$app/navigation";

	let showModal = $state(false);
	let projectClicked = $state(false);

	let { data } = $props();

	onMount(() => {
		if (data.projects.length < 1) {
			alert("No projects could be loaded to display in the gallery. Redirecting to home page. :(");
			goto("/");
		}
		const handler = async () => {
			if (document.visibilityState === "visible" && projectClicked) {
				showModal = true;
				await invalidateAll();
				await tick();
				document.getElementById("modal-content")?.focus();
			}
		};
		document.addEventListener("visibilitychange", handler);
		return () => {
			document.removeEventListener("visibilitychange", handler);
		};
	});
</script>

{#if data.projects.length > 0}
	<div class="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.projects as project (project.name)}
			<div
				class="@container/project mx-5 my-5 w-[20rem] shrink-0 rounded-2xl bg-black/70 p-4 text-center wrap-break-word text-white hover:scale-[1.03]"
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
						projectsClicked.add(project.name);
						saveProjectsClicked(localStorage);
						projectClicked = true;
					}}>View on GitHub</a
				>
				{#if project.homepage !== null && project.homepage !== ""}
					<button
						class="inline-block transform cursor-pointer rounded-lg bg-purple-500 p-2 transition-transform select-none hover:scale-110"
						onclick={async () => {
							projectsClicked.add(project.name);
							saveProjectsClicked(localStorage);
							window.open(project.homepage, "_blank", "noopener noreferrer");
						}}
						title="Open {project.homepage} in a new tab"
					>
						Visit website!
					</button>
				{/if}
			</div>
		{/each}
	</div>
	{#if showModal}
		<div
			class="@container/modal-overlay fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur-sm"
			role="presentation"
			onclick={(showModal = false)}
		>
			<div
				id="modal-content"
				class="@container/modal-content mb-5 w-xs max-w-full rounded-b-lg bg-black/80 p-8 text-center text-orange-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
				role="dialog"
				aria-modal="true"
				aria-label="Modal dialog"
				tabindex="0"
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "Escape") && (showModal = false)}
			>
				<h2>Thanks!</h2>
				<p>
					Thanks for clicking! If you did give it a star, then go to the <a
						class="text-purple-500 hover:underline"
						href="/projects">projects page</a
					> for a bigger reward!
				</p>
				<button
					class="mt-3 text-red-600"
					onclick={() => (showModal = false)}
					onkeydown={(e) => (e.key === "Enter" || e.key === " " || e.key === "Escape") && (showModal = false)}
				>
					<span
						class="inline-block transform cursor-pointer rounded-b-lg bg-black/70 p-2 transition-transform select-none hover:scale-110"
						>Thanks for clicking!</span
					>
				</button>
			</div>
		</div>
	{/if}
{/if}
