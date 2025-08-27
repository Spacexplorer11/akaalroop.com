<script>
	import Typewriter from "svelte-typewriter";
	import {projectRepos, projects, projectsClicked, saveProjectsClicked} from "$lib/projects.svelte.js";

	let yes = $state(false);
	let no = $state(false);
	let fakeYes = $state(false);
	let fakeNo = $state(false);
	let sentEmail = $state(false);
	let sentEmailBefore = $state(false);
	if (typeof localStorage !== "undefined" && window !== undefined) {
		sentEmailBefore = localStorage.getItem("sentEmail") === "true";
	}
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

	let starredProjects = $state([]);
	let starChecking = $state(false);
	let checkingInProgress = $state(false);
	let noStars = $state(false);

	async function starCheck() {
		checkingInProgress = true;
		try {
			const initialProjects = projects;
			const res = await fetch(`https://api.akaalroop.com/projects?repos=${projectRepos.join(",")}`);
			const newlyFetchedProjects = await res.json();

			starredProjects = newlyFetchedProjects.filter((newProj) => {
				const oldProj = initialProjects.find((p) => p.name === newProj.name);
				if (oldProj === undefined) {
					console.log("undefined project:", newProj.name);
					return (noStars = true);
				}
				return oldProj && newProj.stars > oldProj.stars;
			});
		} catch (e) {
			console.error("Error:", e);
			noStars = true;
		} finally {
			noStars = starredProjects.length === 0;
			checkingInProgress = false;
		}
	}

	$effect(() => {
		if (starChecking) {
			starCheck();
		}
	});

	function customCode() {
		const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
		const timestampPart = Date.now().toString(36).toUpperCase();
		return `${randomPart}${timestampPart}`;
	}

	async function sendEmail() {
		if (!sentEmailBefore) {
			const code = customCode();
			await sendToDiscord(code, Date.now());
			window.location.href =
					"mailto:akaal@akaalroop.com?subject=Reward%20on%20your%20site&body=Hi%20Akaalroop%2C%0A%0AI%20really%20like%20your%20website!%0A%0AI%20starred%20your%20projects%20and%20I%20would%20like%20to%20claim%20my%20reward!%0A%0AThank%20you!%0A%0A%0A%0A%0AMy%20%20custom%20code%20for%20verification%20is%20" +
					code;
			sentEmail = true;
			if (typeof localStorage !== "undefined" && window !== undefined) {
				localStorage.setItem("sentEmail", "true");
			}
		}
	}

	async function sendToDiscord(code, timestamp) {
		try {
			await fetch(`https://api.akaalroop.com/discord?reward=${code}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ timestamp })
			});
		} catch (error) {
			console.error("Failed to send to Discord:", error);
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
				aria-label="Yes"
				class="inline-block transform cursor-pointer rounded-lg bg-black/70 p-2 text-2xl transition-transform select-none hover:scale-110"
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
				aria-label="No"
				class="inline-block transform cursor-pointer rounded-lg bg-black/70 p-2 text-2xl transition-transform select-none hover:scale-110"
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
		<Typewriter
			on:done={() => {
				starChecking = true;
			}}
		>
			<p>
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
					>Great! Let's find out if you starred any!</span
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
					onclick={async () => {
						projectsClicked.add(randomProject.name);
						await saveProjectsClicked();
					}}
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
		<Typewriter
			mode="cascade"
			on:done={() => {
				window.location =
					"https://hc-cdn.hel1.your-objectstorage.com/s/v3/c343b32231a35d56f5afa1588264b5de3f37f13e_malware.txt";
			}}
		>
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
	{:else if fakeNo}
		<Typewriter
			mode="cascade"
			on:done={() => {
				starChecking = true;
			}}
		>
			<p>
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal">
					You have clicked! You sound a bit humble. I admire it.
				</span>
			</p>
			<p>
				<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal">
					Now let's find out if you starred any!
				</span>
			</p>
		</Typewriter>
	{/if}
	{#if starChecking}
		{#if checkingInProgress}
			<p>
				<span
					class="inline-block max-w-fit animate-pulse overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
				>
					Checking for stars...
				</span>
			</p>
		{:else if !checkingInProgress}
			{#if !noStars}
				<p>
					<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal">
						You starred the following projects:
						{#each starredProjects as starredProject}
							<a
								href={starredProject.html_url}
								class="text-orange-500 hover:text-orange-600 hover:underline"
								target="_blank"
								onclick={async () => {
									projectsClicked.add(starredProject.name);
									await saveProjectsClicked();
								}}>{starredProject.name}</a
							>
						{/each}
					</span>
				</p>
				<p>
					<span
						class="mb-5 inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
					>
						Thank you for starring my projects! I really appreciate it! For doing so, I'd like to give you a special
						reward! Just hit the button below to get it! (Btw it sends an email, and I'll personally reply with your
						reward!) :D
					</span>
					{#if !sentEmail && !sentEmailBefore}
						<button
							class="inline-block transform cursor-pointer rounded-lg bg-purple-500 p-2 transition-transform select-none hover:scale-110"
							onclick={sendEmail}
							>Send Email!
						</button>
					{:else if sentEmail}
						<span
							class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
						>
							Email was opened in your client! Please send it then check your inbox & spam/junk folder and within 24hrs
							Akaalroop will have replied!! :D
						</span>
					{:else if sentEmailBefore}
						<span
								class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal"
						>
							Looks like you already sent an email before! Please wait for my reply! The reward is one time only! :D
						</span>
					{/if}
				</p>
			{:else}
				<p>
					<span class="inline-block max-w-fit overflow-hidden rounded-[0.5em] bg-black/70 p-[0.5em] whitespace-normal">
						You didn't star any of my projects! Please do! :3 I'd really appreciate it!
					</span>
				</p>
			{/if}
		{/if}
	{/if}
</div>
