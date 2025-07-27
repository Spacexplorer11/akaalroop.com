<script>
	import Typewriter from "svelte-typewriter";
	import {projectsClicked, projects} from "$lib/projects.svelte.js";

	let yes = $state(false);
	let no = $state(false);
	let fakeYes = $state(false);
	let fakeNo = $state(false);

	const anyProjectClicked = projectsClicked.size > 0;

	let randomProject = $state(rerollRandomProject());

	function rerollRandomProject() {
		const unclicked = projects.filter((p) => !projectsClicked.has(p.name));
		if (unclicked.length > 0) {
			return unclicked[Math.floor(Math.random() * unclicked.length)];
		} else {
			return {
				name: "You checked out all my projects!",
				html_url: "https://github.com/spacexplorer11",
				description: "You've clicked all the projects!"
			};
		}
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
		<div class="@container/button-wrapper mb-5 flex flex-row items-center justify-center space-x-15">
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
		<p class="flex flex-row items-center justify-center space-x-15">
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
			>Here, I have a suggestion for you! You should check out:</span
			>
			<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal">
				<a
						href={randomProject.html_url}
						aria-label="{randomProject.name} link"
						title="Link to {randomProject.name}"
						class="break-words hover:text-orange-600 hover:underline"
						onclick={() => {projectsClicked.add(randomProject.name)}}
						target="_blank">{randomProject.name}</a
				></span
			>
			<button
					class="inline-block transform cursor-pointer rounded-lg bg-purple-500 p-2 transition-transform select-none hover:scale-110"
					onclick={() => {
					randomProject = rerollRandomProject();
				}}
			>
				Reroll
			</button>
		</p>
	{:else if fakeYes}
		<Typewriter mode="cascade"
		            on:done={window.location="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c343b32231a35d56f5afa1588264b5de3f37f13e_malware.txt"}>
			<p>
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>Liar liar. That's not true! You clicked no links!</span
				>
			</p>
			<p>
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal">
					Since you've been caught lying, I am gonna hack you!
				</span>
			</p>
		</Typewriter>
	{/if}
</div>
