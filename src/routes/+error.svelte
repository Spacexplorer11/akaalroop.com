<script>
	import { page } from "$app/state";
</script>

<svelte:head>
	<title>Error {page.status} - Akaalroop</title>
</svelte:head>

<div class="@container mt-10 mb-10 flex min-h-screen flex-col p-5 text-center text-orange-500">
	<h1>
		<span class="text-bg">You hit a <em>{page.status} {page.error.message}</em> error</span>
	</h1>
	{#if page.status === 404}
		<p>
			<span class="text-bg"
				>My best detective failed to find your page. Maybe give him some help and type a better URL next time</span
			>
		</p>
	{:else if page.status === 403}
		<p>
			<span class="text-bg">Oi where do you think you're going huh? You're not allowed so GET OUT naughty.</span>
		</p>
	{:else if page.status === 500}
		<p>
			<span class="text-bg">Looks like a cat is in the server! Not much you can do sorry!</span>
		</p>
	{/if}
	<img src="https://http.cat/{page.status}.jpg" alt="HTTP {page.status} error cat image" class="mx-auto mt-8" />
</div>
