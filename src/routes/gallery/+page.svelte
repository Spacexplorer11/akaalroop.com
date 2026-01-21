<script>
	import { projects, projectsClicked, saveProjectsClicked } from "$lib/projects.svelte.js";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => {
		if (projects.length < 1) {
			alert("No projects could be loaded to display in the gallery. Redirecting to home page. :(");
			goto("/");
		}
	});
</script>

{#if projects.length > 0}
	<div class="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each projects as project (project.name)}
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
						await saveProjectsClicked();
					}}>View on GitHub</a
				>
				{#if project.homepage !== null && project.homepage !== ""}
					<button
						class="inline-block transform cursor-pointer rounded-lg bg-purple-500 p-2 transition-transform select-none hover:scale-110"
						onclick={async () => {
							projectsClicked.add(project.name);
							await saveProjectsClicked();
							window.open(project.homepage, "_blank", "nopener noreferrer");
						}}
						title="Open {project.homepage} in a new tab"
					>
						Visit website!
					</button>
				{/if}
			</div>
		{/each}
	</div>
{/if}
