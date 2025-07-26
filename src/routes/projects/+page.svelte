<script>
	import Typewriter from "svelte-typewriter";

	let yes = false;
	let no = false;
</script>
<div class="@container mt-10 mb-10 flex min-h-screen flex-col p-5 text-center text-orange-500">
	<Typewriter mode="cascade">
<h1><span class="inline-block p-[0.5em] bg-black/70 rounded-[0.5em] overflow-hidden whitespace-normal max-w-fit">Projects!</span>
</h1>
		<p><span class="inline-block p-[0.5em] bg-black/70 rounded-[0.5em] overflow-hidden whitespace-normal max-w-fit">You've probably already seen some of my projects, right?</span>
		</p>
		<div class="@container/button-wrapper flex flex-row space-x-15 items-center justify-center">
			<button class="inline-block transform cursor-pointer rounded-lg bg-black/70 p-2 transition-transform select-none hover:scale-110 text-2xl"
			        aria-label="Yes" onclick="{yes = true}">Yes!
			</button>
			<button class="inline-block transform cursor-pointer rounded-lg bg-black/70 p-2 transition-transform select-none hover:scale-110 text-2xl"
			        aria-label="No" onclick="{no = true}">No?
			</button>
		</div>
	</Typewriter>
</div>