<script>
import Typewriter from 'svelte-typewriter'
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export const projectRepos = writable(["akaalroop.com", "meow_meals"]);

let projects = [];
let currentIndex = 0;

onMount(async () => {
	const $repos = await new Promise(resolve => projectRepos.subscribe(resolve)) || [];
	const res = await fetch(`https://api.akaalroop.com/projects?repos=${$repos.join(",")}`);
	projects = await res.json();
});
</script>
<div id="content">
	<Typewriter mode="cascade" interval="30">
	<h1><span class="text">Hi! Welcome to Akaalroop.com</span></h1>
<p><span class="text">This is my website!</span></p>
		<p><span class="text">It was my dream to own this domain, and now I do &lt;3!</span></p>
	</Typewriter>
	<div id="project-carousel">
			<p><span class="text">I've done a few projects! Here are some!</span></p>
{#if projects.length}
<div class="carousel">
	<button on:click={() => currentIndex = (currentIndex - 1 + projects.length) % projects.length}>⟨</button>

	<div class="project">
		<h2>{projects[currentIndex].name}</h2>
		<p>{projects[currentIndex].description}</p>
		<p>⭐ {projects[currentIndex].stars}</p>
		<a href={projects[currentIndex].html_url} target="_blank">View on GitHub</a>
	</div>

	<button on:click={() => currentIndex = (currentIndex + 1) % projects.length}>⟩</button>
</div>
{/if}
	</div>

</div>
<style>
	#content {
		display: flex;
		flex-direction: column;
		padding: 20px;
		color: rgb(223, 99, 0);
		min-height: 100vh;
		text-align: center;
		font-size: larger;
	}

	.text {
		background-color: rgba(0, 0, 0, 0.7); /* black with 70% opacity */
		display: inline-block; /* shrink to fit text width */
		padding: 0.5em 0.5em;
		border-radius: 0.5em; /* optional: rounded corners */
	}

.carousel {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin-top: 1rem;
}

.project {
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 0.5em;
	padding: 1em;
	color: white;
	width: 250px;
	text-align: center;
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