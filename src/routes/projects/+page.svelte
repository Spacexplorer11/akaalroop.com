<script>
	import Typewriter from "svelte-typewriter";
	import {projectRepos, projectsClicked} from "$lib/stores/projects.js";

	let yes = $state(false);
	let no = $state(false);
	let fakeYes = $state(false);
	let fakeNo = $state(false);

	const projectsNotClicked = $projectRepos.filter(p => !$projectsClicked.has(p));
	const anyProjectClicked = $projectsClicked.size > 0;

</script>
<div class="@container mt-10 mb-10 flex min-h-screen flex-col p-5 text-center text-orange-500">
	<Typewriter mode="cascade">
<h1><span class="inline-block p-[0.5em] bg-black/70 rounded-[0.5em] overflow-hidden whitespace-normal max-w-fit">Projects!</span>
</h1>
		<p><span class="inline-block p-[0.5em] bg-black/70 rounded-[0.5em] overflow-hidden whitespace-normal max-w-fit">You've probably already seen some of my projects, right?</span>
		</p>
		<div class="@container/button-wrapper flex flex-row space-x-15 items-center justify-center">
			<button class="inline-block transform cursor-pointer rounded-lg bg-black/70 p-2 transition-transform select-none hover:scale-110 text-2xl"
			        aria-label="Yes" onclick={() => {
					if (anyProjectClicked) {
						yes = true;
					}
					else {
						fakeYes = true;
					}
					}}>Yes!
			</button>
			<button class="inline-block transform cursor-pointer rounded-lg bg-black/70 p-2 transition-transform select-none hover:scale-110 text-2xl"
			        aria-label="No" onclick={() => {
						if (!anyProjectClicked) {
						no = true;
					}
					else {
						fakeNo = true;
					}}}>No?
			</button>
		</div>
	</Typewriter>
	{#if yes}
		<Typewriter>
			<p><span
					class="inline-block p-[0.5em] bg-black/70 rounded-[0.5em] overflow-hidden whitespace-normal max-w-fit">Great! Did you star any?</span>
			</p>
		</Typewriter>
	{:else if no}
		<Typewriter>
			<p><span
					class="inline-block p-[0.5em] bg-black/70 rounded-[0.5em] overflow-hidden whitespace-normal max-w-fit">Oh, well, you should check them out!</span>
			</p>
		</Typewriter>
	{/if}
</div>
