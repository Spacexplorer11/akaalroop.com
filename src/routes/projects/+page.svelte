<script>
	import Typewriter from "svelte-typewriter";
	import {projectRepos, projectsClicked, projects} from "$lib/stores/projects.js";

	let yes = $state(false);
	let no = $state(false);
	let fakeYes = $state(false);
	let fakeNo = $state(false);

	const projectsNotClicked = $projectRepos.filter((p) => !$projectsClicked.has(p));
	const anyProjectClicked = $projectsClicked.size > 0;

	let randomProject = $state($projects[Math.floor(Math.random() * $projectRepos.length)]);

	function rerollRandomProject() {
		randomProject = $projects[Math.floor(Math.random() * $projectRepos.length)];
		console.log("Rerolled project", randomProject);
	}
</script>

<div class="@container mt-10 mb-10 flex min-h-screen flex-col p-5 text-center text-orange-500">
	<Typewriter mode="cascade">
		<h1>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
			>Projects!</span
			>
		</h1>
		<p>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
			>You've probably already seen some of my projects, right?</span
			>
		</p>
		<div class="@container/button-wrapper flex mb-5 flex-row items-center justify-center space-x-15">
			<button
					class="inline-block transform cursor-pointer rounded-lg bg-black/70 p-2 text-2xl transition-transform select-none hover:scale-110"
					aria-label="Yes"
					onclick={() => {
					if (anyProjectClicked) {
						yes = true;
					} else {
						fakeYes = true;
					}
				}}
			>Yes!
			</button>
			<button
					class="inline-block transform cursor-pointer rounded-lg bg-black/70 p-2 text-2xl transition-transform select-none hover:scale-110"
					aria-label="No"
					onclick={() => {
					if (!anyProjectClicked) {
						no = true;
					} else {
						fakeNo = true;
					}
				}}
			>No?
			</button>
		</div>
	</Typewriter>
	{#if yes}
		<Typewriter>
			<p>
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>Great! Did you star any?</span
				>
			</p>
		</Typewriter>
	{:else if no}
		<Typewriter mode="cascade">
			<p>
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>Oh, well, you should check them out!</span
				>
			</p>
		</Typewriter>
		<p class="flex-row items-center justify-center space-x-15 flex">
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>Here, I have a suggestion for you! You should check out:</span>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal">
					<a
							href={randomProject.html_url}
							aria-label="{randomProject.name} link"
							title="Link to {randomProject.name}"
							class="hover:text-orange-600 hover:underline break-words">{randomProject.name}</a
					></span
			>
			<button class="inline-block transform cursor-pointer rounded-lg bg-purple-500 p-2 transition-transform select-none hover:scale-110"
			        onclick={() => {randomProject = $projects[Math.floor(Math.random() * $projectRepos.length)]}}>Reroll
			</button>
			</p>
	{/if}
</div>
